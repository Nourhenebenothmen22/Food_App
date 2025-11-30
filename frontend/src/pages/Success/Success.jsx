import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./Success.css"

function Success() {
  const location = useLocation()
  
  // Vérifier si l'utilisateur vient d'une commande valide
  const hasValidOrder = location.state?.orderId || 
                       new URLSearchParams(location.search).get('orderId')

  // Si l'utilisateur n'a pas de commande valide
  if (!hasValidOrder) {
    return (
      <div className="unauthorized-page">
        <div className="unauthorized-card">
          <div className="unauthorized-icon">🚫</div>
          <h1>Access Restricted</h1>
          <p>
            Please complete an order first to access this page.
          </p>
          <div className="button-group">
            <Link to="/" className="btn-secondary">
              Homepage
            </Link>
            <Link to="/cart" className="btn-login">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Order Successful!</h1>
        <p>
          Thank you for your order! Your food is being prepared.
        </p>
        
        <Link to="/" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default Success