import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

function FoodDisplay() {
    const { food_list } = useContext(StoreContext)
    
    return (
        <div className='food_display' id='food_display'>
            <h2>Top Dishes Near You</h2>
            <div className='food_list'>
                {
                    food_list.map((item, index) => {
                        return (
                            <FoodItem 
                                key={index} 
                                id={item._id} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price} 
                                image={item.image}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay