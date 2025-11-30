import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {
  const { getTotalCartAmount, cartItems, food_list, userId, clearCart } = useContext(StoreContext)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', street: '',
    city: '', state: '', zipcode: '', country: '', phone: ''
  })

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const totalAmount = getTotalCartAmount ? getTotalCartAmount() : 0
  const totalItems = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  // Prepare cart items for backend
  const prepareOrderItems = () => {
    return food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
        image: item.image
      }))
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    
    if (totalItems === 0) {
      alert('Your cart is empty!')
      return
    }

    // Validate form
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }

    setLoading(true)

    try {
      const orderData = {
        userId: userId,
        items: prepareOrderItems(),
        amount: totalAmount + (totalAmount > 0 ? 2 : 0), // Total + delivery fee
        address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          country: formData.country,
          phone: formData.phone
        },
        paymentMethod: paymentMethod
      }

      console.log('Sending order data:', orderData)

      const response = await axios.post(
        'http://localhost:5000/api/v1/order/place', 
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      console.log('Order response:', response.data)

      if (response.data.success || response.data.message === "Order created successfully") {
        // Handle different payment methods
        if (paymentMethod === 'card' && response.data.checkoutUrl) {
          // Redirect to Stripe checkout
          window.location.href = response.data.checkoutUrl
        } else {
          // For cash on delivery or other methods
          alert('Order placed successfully!')
          clearCart()
          navigate('/success', { 
            state: { 
              orderId: response.data.order._id,
              orderDetails: response.data.order
            }
          })
        }
      } else {
        alert('Failed to place order. Please try again.')
      }

    } catch (error) {
      console.error('Error placing order:', error)
      if (error.response) {
        console.error('Server response:', error.response.data)
        alert(`Error: ${error.response.data.message || 'Failed to place order'}`)
      } else if (error.request) {
        alert('Network error. Please check your connection.')
      } else {
        alert('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Update payment options in your JSX
  const paymentOptions = [
    { value: 'cash', label: 'Cash on Delivery' },
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' }
  ]

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
                {paymentOptions.map(option => (
                  <label key={option.value} className='payment-option'>
                    <input 
                      type="radio" 
                      name="payment" 
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={handlePaymentChange}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Place Order Button */}
            <button 
              type="submit" 
              className='place-order-btn'
              onClick={handlePlaceOrder}
              disabled={totalItems === 0 || loading}
            >
              {loading ? 'PROCESSING...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder