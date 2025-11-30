import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  // ---------------------------------------------------
  // 🔐 Get logged in user
  // ---------------------------------------------------
  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error retrieving user:", error);
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
  // 1️⃣ Load initial cart
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
      console.error("Error getInitialCart:", err);
    }
    return {};
  };

  // ---------------------------------------------------
  // 2️⃣ Load data on startup
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
  // 3️⃣ Sync with user changes
  // ---------------------------------------------------
  useEffect(() => {
    const checkUserChange = async () => {
      const user = getCurrentUser();
      const newUserId = getUserId();

      // If user changed
      if (newUserId !== userId) {
        setCurrentUser(user);
        setUserId(newUserId);

        if (newUserId) {
          // New user logged in → load their cart
          const cart = await getInitialCart(newUserId);
          setCartItems(cart);
        } else {
          // User logged out → clear visual cart
          setCartItems({});
        }
      }
    };

    // Check for changes every 2 seconds
    const interval = setInterval(checkUserChange, 2000);

    return () => clearInterval(interval);
  }, [userId]);

  // ---------------------------------------------------
  // 4️⃣ Save cart to localStorage
  // ---------------------------------------------------
  useEffect(() => {
    if (userId && Object.keys(cartItems).length > 0) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  // ---------------------------------------------------
  // 5️⃣ Save order info
  // ---------------------------------------------------
  useEffect(() => {
    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
  }, [orderInfo]);

  // ---------------------------------------------------
  // 6️⃣ Fetch food items
  // ---------------------------------------------------
  const fetchFoodList = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/food");
      setFoodList(response.data);
      setError(null);
    } catch (err) {
      console.error("Error loading food items:", err);
      setError("Error loading food items");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------
  // 7️⃣ Cart functions
  // ---------------------------------------------------
  const addToCart = async (itemId) => {
    if (!userId) {
      alert("Please log in to add items to cart");
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
      console.error("Error addToCart:", err);
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
      console.error("Error removeFromCart:", err);
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
  // 8️⃣ Logout handling
  // ---------------------------------------------------
  const handleUserLogout = () => {
    setCartItems({});
    setCurrentUser(null);
    setUserId(null);
  };

  // ---------------------------------------------------
  // 9️⃣ Clear cart after order
  // ---------------------------------------------------
  const clearCartAfterOrder = () => {
    setCartItems({});
    if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
    }
  };

  // ---------------------------------------------------
  // 🔟 Manual synchronization
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
  // 🔟➕❶ Force clear cart
  // ---------------------------------------------------
  const forceClearCart = () => {
    setCartItems({});
    if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
    }
  };

  // ---------------------------------------------------
  const contextValue = {
    // Data
    food_list: foodList,
    cartItems,
    orderInfo,
    loading,
    error,
    
    // User
    currentUser,
    userId,
    
    // Cart functions
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    
    // Other functions
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