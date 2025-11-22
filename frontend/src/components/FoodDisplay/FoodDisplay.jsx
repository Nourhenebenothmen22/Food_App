import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

function FoodDisplay({ category }) {
  const { food_list, loading, error } = useContext(StoreContext)

  // Handle loading state
  if (loading) {
    return (
      <div className='food_display' id='food_display'>
        <h2>Top Dishes Near You</h2>
        <div className="loading">Loading dishes...</div>
      </div>
    )
  }

  // Handle errors
  if (error) {
    return (
      <div className='food_display' id='food_display'>
        <h2>Top Dishes Near You</h2>
        <div className="error">{error}</div>
      </div>
    )
  }

  // Filter food by category
  const filteredFood = food_list.filter(item => 
    category === "All" || category === item.category
  )

  return (
    <div className='food_display' id='food_display'>
      <h2>Top Dishes Near You</h2>
      <div className='food_list'>
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <FoodItem 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image}
            />
          ))
        ) : (
          <div className="no-items">
            No dishes found for this category.
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay