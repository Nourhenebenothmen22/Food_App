const User = require("../models/User");

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "User ID and Item ID are required" });
    }

    // Récupérer l'utilisateur
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialiser le panier si inexistant
    if (!userData.cart) userData.cart = {};

    // Ajouter ou incrémenter l'article
    if (!userData.cart[itemId]) {
      userData.cart[itemId] = 1;
    } else {
      userData.cart[itemId] += 1;
    }

    // Sauvegarder le panier
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cart: userData.cart },
      { new: true }
    );

    return res.json({ success: true, message: "Added To Cart", cart: updatedUser.cart });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

module.exports = { addToCart };
