import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

function PlaceOrder() {
  const { getTotalCartAmount, cartItems, food_list } = useContext(StoreContext)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zipcode: '', country: '', phone: ''
  })

  const totalAmount = getTotalCartAmount ? getTotalCartAmount() : 0
  const totalItems = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    alert('Order placed successfully!')
  }

  return (
    <div className='place-order'>
      <div className='place-order-container'>
        {/* Left Section - Delivery Information */}
        <div className='place-order-left'>
          <h2>Delivery Information</h2>
          <form onSubmit={handlePlaceOrder}>
            <div className='form-row'>
              <div className='form-group'>
                <label>First Name *</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className='form-group'>
                <label>Last Name *</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className='form-group'>
              <label>Email *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className='form-group'>
              <label>Street *</label>
              <input 
                type="text" 
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label>City *</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className='form-group'>
                <label>State *</label>
                <input 
                  type="text" 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label>Zipcode *</label>
                <input 
                  type="text" 
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className='form-group'>
                <label>Country *</label>
                <input 
                  type="text" 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required 
                />
              </div>
            </div>

            <div className='form-group'>
              <label>Phone *</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />
            </div>
          </form>
        </div>

        {/* Right Section - Order Summary */}
        <div className='place-order-right'>
          <div className='cart-total'>
            <h2>Order Summary</h2>
            
            {/* Order Items */}
            <div className='order-items'>
              {food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div key={item._id} className='order-item'>
                      <div className='item-info'>
                       <img src={`http://localhost:5000/images/${item.image}`} alt={item.name} />
                        <div className='item-details'>
                          <p className='item-name'>{item.name}</p>
                          <p className='item-price'>${item.price} x {cartItems[item._id]}</p>
                        </div>
                      </div>
                      <p className='item-total'>${item.price * cartItems[item._id]}</p>
                    </div>
                  )
                }
                return null
              })}
            </div>

            {/* Price Breakdown */}
            <div className='price-breakdown'>
              <div className='price-row'>
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <div className='price-row'>
                <p>Delivery Fee</p>
                <p>${totalAmount > 0 ? 2 : 0}</p>
              </div>
              <div className='price-row total'>
                <p>Total</p>
                <p>${totalAmount > 0 ? totalAmount + 2 : 0}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className='payment-method'>
              <h3>Payment Method</h3>
              <div className='payment-options'>
                <label className='payment-option'>
                  <input type="radio" name="payment" defaultChecked />
                  <span>Cash on Delivery</span>
                </label>
                <label className='payment-option'>
                  <input type="radio" name="payment" />
                  <span>Credit Card</span>
                </label>
                <label className='payment-option'>
                  <input type="radio" name="payment" />
                  <span>PayPal</span>
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <button 
              type="submit" 
              className='place-order-btn'
              onClick={handlePlaceOrder}
              disabled={totalItems === 0}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder