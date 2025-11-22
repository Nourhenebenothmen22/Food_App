import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👉 Récupérer les aliments depuis l'API
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

  // 👉 Ajouter un item au panier
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // 👉 Retirer un item
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

  // 👉 Calculer le total du panier
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    foodList.forEach((item) => {
      if (cartItems[item._id] > 0) {
        totalAmount += item.price * cartItems[item._id];
      }
    });
    return totalAmount;
  };

  // Les valeurs à partager aux autres composants
  const contextValue = {
    food_list: foodList,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    loading,
    error,
    refetchFoodList: fetchFoodList // Pour rafraîchir les données si besoin
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;