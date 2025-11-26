const User = require("../models/User");

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity = 1 } = req.body;

    // Validation des données d'entrée
    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Item ID are required",
        error: "MISSING_REQUIRED_FIELDS"
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
        error: "INVALID_QUANTITY"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "USER_NOT_FOUND"
      });
    }

    // Initialiser le panier s'il n'existe pas
    if (!user.cart) {
      user.cart = {};
    }

    const currentQuantity = user.cart[itemId] || 0;
    user.cart[itemId] = currentQuantity + quantity;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Item successfully added to cart",
      data: {
        cart: user.cart,
        addedItem: {
          itemId: itemId,
          quantity: quantity,
          newTotalQuantity: user.cart[itemId]
        },
        cartSummary: {
          totalItems: Object.keys(user.cart).length,
          totalQuantity: Object.values(user.cart).reduce((sum, qty) => sum + qty, 0)
        }
      }
    });

  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while adding item to cart",
      error: "INTERNAL_SERVER_ERROR",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId, removeAll = false } = req.body;

    // Validation des données d'entrée
    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Item ID are required",
        error: "MISSING_REQUIRED_FIELDS"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "USER_NOT_FOUND"
      });
    }

    if (!user.cart || !user.cart[itemId]) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
        error: "ITEM_NOT_IN_CART"
      });
    }

    let message = "";
    const previousQuantity = user.cart[itemId];

    if (removeAll || user.cart[itemId] === 1) {
      // Supprimer complètement l'article
      delete user.cart[itemId];
      message = "Item completely removed from cart";
    } else {
      // Réduire la quantité de 1
      user.cart[itemId] -= 1;
      message = "Item quantity decreased in cart";
    }

    await user.save();

    const response = {
      success: true,
      message: message,
      data: {
        cart: user.cart,
        removedItem: {
          itemId: itemId,
          previousQuantity: previousQuantity,
          action: removeAll ? "removed" : "decreased"
        },
        cartSummary: {
          totalItems: Object.keys(user.cart).length,
          totalQuantity: Object.values(user.cart).reduce((sum, qty) => sum + qty, 0)
        }
      }
    };

    // Si l'article a été complètement supprimé, ajouter cette information
    if (!user.cart[itemId]) {
      response.data.removedItem.currentQuantity = 0;
      response.data.removedItem.completelyRemoved = true;
    }

    res.status(200).json(response);

  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while removing item from cart",
      error: "INTERNAL_SERVER_ERROR",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validation de l'ID utilisateur
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
        error: "MISSING_USER_ID"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "USER_NOT_FOUND"
      });
    }

    const cart = user.cart || {};

    res.status(200).json({
      success: true,
      message: Object.keys(cart).length > 0 
        ? "Cart retrieved successfully" 
        : "Cart is empty",
      data: {
        cart: cart,
        summary: {
          totalItems: Object.keys(cart).length,
          totalQuantity: Object.values(cart).reduce((sum, qty) => sum + qty, 0),
          isEmpty: Object.keys(cart).length === 0
        },
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while retrieving cart",
      error: "INTERNAL_SERVER_ERROR",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


module.exports = { addToCart, removeFromCart, getCart };