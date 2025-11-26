import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // ---------------------------------------------------
  // 1️⃣ Charger le panier depuis localStorage au démarrage
  // ---------------------------------------------------
  const getInitialCart = () => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  };

  const [cartItems, setCartItems] = useState(getInitialCart());
  const [foodList, setFoodList] = useState([]);
  const [orderInfo, setOrderInfo] = useState(
    JSON.parse(localStorage.getItem("orderInfo")) || {}
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------------------------------------------------
  // 2️⃣ Sauvegarder le panier à chaque mise à jour
  // ---------------------------------------------------
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ---------------------------------------------------
  // 3️⃣ Sauvegarder les infos de commande
  // ---------------------------------------------------
  useEffect(() => {
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  }, [orderInfo]);

  // ---------------------------------------------------
  // 4️⃣ Récupérer les aliments depuis l'API
  // ---------------------------------------------------
  const fetchFoodList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/food"); 
      setFoodList(response.data);
      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement des aliments:", err);
      setError("Erreur lors du chargement des aliments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  // ---------------------------------------------------
  // 5️⃣ Ajouter un item au panier
  // ---------------------------------------------------
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // ---------------------------------------------------
  // 6️⃣ Retirer un item du panier
  // ---------------------------------------------------
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;

      if (prev[itemId] > 1) {
        return {
          ...prev,
          [itemId]: prev[itemId] - 1,
        };
      }

      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  // ---------------------------------------------------
  // 7️⃣ Total du panier
  // ---------------------------------------------------
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    foodList.forEach((item) => {
      if (cartItems[item._id] > 0) {
        totalAmount += item.price * cartItems[item._id];
      }
    });
    return totalAmount;
  };

  // ---------------------------------------------------
  // 8️⃣ Sauvegarder les infos de la commande
  // ---------------------------------------------------
  const saveOrderInfo = (info) => {
    setOrderInfo(info);
  };

  // ---------------------------------------------------
  // 9️⃣ Vider le panier après commande
  // ---------------------------------------------------
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  // ---------------------------------------------------
  const contextValue = {
    food_list: foodList,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    loading,
    error,
    orderInfo,
    saveOrderInfo,
    clearCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
