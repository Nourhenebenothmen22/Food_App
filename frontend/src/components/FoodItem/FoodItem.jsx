import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, description, price, image }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const API_URL = import.meta.env.VITE_API_URL;

  // quantité de cet item dans le panier
  const quantity = cartItems[id] || 0;

  return (
    <div className="food_item">
      <div className="food_images">
        <img
  src={`${API_URL}/images/${image}`}
  alt={name}
  className="food_image"
/>

      </div>

      <div className="food_content">
        <h3 className="food_name">{name}</h3>
        <p className="food_description">{description}</p>

        <div className="food_bottom">
          <div className="food_price">${price}</div>

          {quantity === 0 ? (
            <button className="add_btn" onClick={() => addToCart(id)}>
              Add +
            </button>
          ) : (
            <div className="counter_container">
              <button
                className="counter_btn"
                onClick={() => removeFromCart(id)}
              >
                -
              </button>

              <span className="item_count">{quantity}</span>

              <button className="counter_btn" onClick={() => addToCart(id)}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodItem;
