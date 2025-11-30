import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // ---------------------------------------------------
  // 🔐 Récupérer l'utilisateur connecté
  // ---------------------------------------------------
  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      return null;
    }
  };

  const getUserId = () => {
    const user = getCurrentUser();
    return user?._id || user?.id || null;
  };

  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [userId, setUserId] = useState(getUserId());
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);
  const [orderInfo, setOrderInfo] = useState(
    JSON.parse(localStorage.getItem("orderInfo")) || {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------------------------------------------------
  // 1️⃣ Charger le panier initial
  // ---------------------------------------------------
  const getInitialCart = async (userId) => {
    if (!userId) return {};

    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/cart/get/${userId}`
      );
      if (response.data.success) {
        return response.data.cart;
      }
    } catch (err) {
      console.error("Erreur getInitialCart:", err);
    }
    return {};
  };

  // ---------------------------------------------------
  // 2️⃣ Charger les données au démarrage
  // ---------------------------------------------------
  useEffect(() => {
    const initializeData = async () => {
      const user = getCurrentUser();
      const newUserId = getUserId();
      
      setCurrentUser(user);
      setUserId(newUserId);

      if (newUserId) {
        const cart = await getInitialCart(newUserId);
        setCartItems(cart);
      }

      await fetchFoodList();
    };

    initializeData();
  }, []);

  // ---------------------------------------------------
  // 3️⃣ Synchronisation avec les changements d'utilisateur
  // ---------------------------------------------------
  useEffect(() => {
    const checkUserChange = async () => {
      const user = getCurrentUser();
      const newUserId = getUserId();

      // Si l'utilisateur a changé
      if (newUserId !== userId) {
        setCurrentUser(user);
        setUserId(newUserId);

        if (newUserId) {
          // Nouvel utilisateur connecté → charger son panier
          const cart = await getInitialCart(newUserId);
          setCartItems(cart);
        } else {
          // Utilisateur déconnecté → vider le panier visuel
          setCartItems({});
        }
      }
    };

    // Vérifier les changements toutes les 2 secondes
    const interval = setInterval(checkUserChange, 2000);

    return () => clearInterval(interval);
  }, [userId]);

  // ---------------------------------------------------
  // 4️⃣ Sauvegarder le panier dans localStorage
  // ---------------------------------------------------
  useEffect(() => {
    if (userId && Object.keys(cartItems).length > 0) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  // ---------------------------------------------------
  // 5️⃣ Sauvegarder les infos de commande
  // ---------------------------------------------------
  useEffect(() => {
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  }, [orderInfo]);

  // ---------------------------------------------------
  // 6️⃣ Récupérer les aliments
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

  // ---------------------------------------------------
  // 7️⃣ Fonctions du panier
  // ---------------------------------------------------
  const addToCart = async (itemId) => {
    if (!userId) {
      alert("Veuillez vous connecter pour ajouter des articles au panier");
      return false;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/cart/add",
        { userId, itemId },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setCartItems(response.data.cart);
        return true;
      }
    } catch (err) {
      console.error("Erreur addToCart:", err);
      return false;
    }
  };

  const removeFromCart = async (itemId) => {
    if (!userId) return false;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/cart/remove",
        { userId, itemId },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setCartItems(response.data.cart);
        return true;
      }
    } catch (err) {
      console.error("Erreur removeFromCart:", err);
      return false;
    }
  };

  const getTotalCartAmount = () => {
    if (!userId) return 0;

    let totalAmount = 0;
    foodList.forEach((item) => {
      if (cartItems[item._id] > 0) {
        totalAmount += item.price * cartItems[item._id];
      }
    });
    return totalAmount;
  };

  const getTotalCartItems = () => {
    if (!userId) return 0;

    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  // ---------------------------------------------------
  // 8️⃣ Gestion de la déconnexion
  // ---------------------------------------------------
  const handleUserLogout = () => {
    setCartItems({});
    setCurrentUser(null);
    setUserId(null);
  };

  // ---------------------------------------------------
  // 9️⃣ Vider le panier après commande
  // ---------------------------------------------------
  const clearCartAfterOrder = () => {
    setCartItems({});
    if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
    }
  };

  // ---------------------------------------------------
  // 🔟 Synchronisation manuelle
  // ---------------------------------------------------
  const syncCartWithUser = async () => {
    const user = getCurrentUser();
    const newUserId = getUserId();

    setCurrentUser(user);
    setUserId(newUserId);

    if (!user) {
      setCartItems({});
    } else {
      const cart = await getInitialCart(newUserId);
      setCartItems(cart);
    }
  };

  // ---------------------------------------------------
  // 🔟➕❶ Réinitialiser complètement le panier
  // ---------------------------------------------------
  const forceClearCart = () => {
    setCartItems({});
    if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
    }
  };

  // ---------------------------------------------------
  const contextValue = {
    // Données
    food_list: foodList,
    cartItems,
    orderInfo,
    loading,
    error,
    
    // Utilisateur
    currentUser,
    userId,
    
    // Fonctions panier
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    
    // Autres fonctions
    saveOrderInfo: (info) => setOrderInfo(info),
    clearCart: clearCartAfterOrder,
    handleUserLogout,
    syncCartWithUser,
    forceClearCart,
    refreshFoodList: fetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;