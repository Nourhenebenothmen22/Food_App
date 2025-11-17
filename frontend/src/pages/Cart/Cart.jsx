import React from 'react'
import './Cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import {  useNavigate } from 'react-router-dom'

function Cart() {
    const { food_list, cartItems, removeFromCart, getTotalCartAmount } = useContext(StoreContext)
    const navigate = useNavigate(); // ✅ hook pour la navigation

    
    // Calcul du total
    const totalAmount = getTotalCartAmount(cartItems, food_list);
    
    return (
        <div className='cart'>
            <h2>Your Cart</h2>
            
            {/* Liste des articles */}
            <div className='cart-items'>
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id} className='cart-item'>
                                <img src={item.image} alt={item.name} />
                                <div className='item-details'>
                                    <p className='item-name'>{item.name}</p>
                                    <p className='item-price'>${item.price}</p>
                                    <p className='item-quantity'>Quantity: {cartItems[item._id]}</p>
                                    <p className='item-total'>Total: ${item.price * cartItems[item._id]}</p>
                                    <button 
                                        className='remove-btn'
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            
            {/* Total du panier */}
            <div className='cart-summary'>
                <h3>Cart Total: ${totalAmount}</h3>
                <button onClick={()=>navigate('/order')}  className='checkout-btn'>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export default Cart