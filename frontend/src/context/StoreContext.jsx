import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});

  // 👉 Ajouter un item au panier
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      // Si l'item existe déjà, on incrémente
      if (prev[itemId]) {
        return {
          ...prev,
          [itemId]: prev[itemId] + 1,
        };
      }
      // Sinon on l'ajoute avec quantité 1
      return {
        ...prev,
        [itemId]: 1,
      };
    });
  };

  // 👉 Retirer un item
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev; // sécurité

      // Si quantité > 1, décrémenter
      if (prev[itemId] > 1) {
        return {
          ...prev,
          [itemId]: prev[itemId] - 1,
        };
      }

      // Si quantité = 1 → suppression de l'objet
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };
  useEffect(()=>{
console.log(cartItems)
  },[cartItems])

  // Les valeurs à partager aux autres composants
  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
