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

  // ---------------------------------------------------
  // 1️⃣ Charger le panier au démarrage
  // ---------------------------------------------------
  const getInitialCart = () => {
    const user = getCurrentUser();
    
    if (!user) {
      // Utilisateur déconnecté → panier vide
      return {};
    }

    // Utilisateur connecté → charger son panier spécifique
    const savedCart = localStorage.getItem(`cartItems_${user._id || user.id}`);
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
  // 2️⃣ Surveiller les changements de statut de connexion
  // ---------------------------------------------------
  useEffect(() => {
    const handleStorageChange = () => {
      const newUser = getCurrentUser();
      const newUserId = getUserId();

      const previousUserId = userId;

      setCurrentUser(newUser);
      setUserId(newUserId);

      if (!newUser) {
        // Utilisateur déconnecté → vider le panier VISUEL seulement
        // Mais NE PAS supprimer les données du localStorage
        setCartItems({});
      } else {
        // Utilisateur connecté → charger son panier
        const savedCart = localStorage.getItem(`cartItems_${newUserId}`);
        setCartItems(savedCart ? JSON.parse(savedCart) : {});
        
        // Si c'est le même utilisateur qui se reconnecte, restaurer son panier
        if (newUserId === previousUserId) {
          const previousCart = localStorage.getItem(`cartItems_${newUserId}`);
          if (previousCart) {
            setCartItems(JSON.parse(previousCart));
          }
        }
      }
    };

    // Écouter les changements de localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Vérifier périodiquement les changements
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [userId]);

  // ---------------------------------------------------
  // 3️⃣ Sauvegarder le panier → par utilisateur
  // ---------------------------------------------------
  useEffect(() => {
    if (userId && Object.keys(cartItems).length > 0) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  // ---------------------------------------------------
  // 4️⃣ Sauvegarder les infos de commande
  // ---------------------------------------------------
  useEffect(() => {
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  }, [orderInfo]);

  // ---------------------------------------------------
  // 5️⃣ Récupérer les aliments
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
  // 6️⃣ Fonctions du panier avec vérification de connexion
  // ---------------------------------------------------
  const addToCart = (itemId) => {
    // Vérifier si l'utilisateur est connecté
    if (!userId) {
      alert("Veuillez vous connecter pour ajouter des articles au panier");
      return false;
    }

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    return true;
  };

  const removeFromCart = (itemId) => {
    if (!userId) return false;

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
    return true;
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
  // 7️⃣ Gestion de la déconnexion - NE PAS VIDER LE PANIER
  // ---------------------------------------------------
  const handleUserLogout = () => {
    // IMPORTANT: Ne pas vider le panier du localStorage
    // Seulement vider l'état visuel
    setCartItems({});
    setCurrentUser(null);
    setUserId(null);
    
    // NE PAS supprimer les paniers sauvegardés
    // Le panier reste sauvegardé pour quand l'utilisateur se reconnectera
  };

  // ---------------------------------------------------
  // 8️⃣ Vider le panier seulement après une commande
  // ---------------------------------------------------
  const clearCartAfterOrder = () => {
    setCartItems({});
    if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
    }
  };

  // ---------------------------------------------------
  // 9️⃣ Synchronisation manuelle
  // ---------------------------------------------------
  const syncCartWithUser = () => {
    const user = getCurrentUser();
    const newUserId = getUserId();

    setCurrentUser(user);
    setUserId(newUserId);

    if (!user) {
      // Déconnecté → panier vide visuellement seulement
      setCartItems({});
    } else {
      // Connecté → charger le panier sauvegardé
      const savedCart = localStorage.getItem(`cartItems_${newUserId}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : {});
    }
  };

  // ---------------------------------------------------
  // 🔟 Réinitialiser complètement le panier (optionnel)
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
    clearCart: clearCartAfterOrder, // Seulement après commande
    handleUserLogout,
    syncCartWithUser,
    forceClearCart, // Pour vider manuellement si besoin
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;