import React from 'react'
import './FoodItem.css'
import { useState } from 'react'

function FoodItem({ id, name, description, price, image}) {
    const [itemCount, setItemCount] = useState(0)

    return (
        <div className='food_item'>
            <div className='food_images'>
                <img src={image} alt={name} className='food_image' />

            </div>
            
            <div className='food_content'>
                <h3 className='food_name'>{name}</h3>
                <p className='food_description'>{description}</p>
                
                <div className='food_bottom'>
                    <div className='food_price'>${price}</div>
                    
                    {itemCount === 0 ? (
                        <button 
                            className='add_btn'
                            onClick={() => setItemCount(1)}
                        >
                            Add +
                        </button>
                    ) : (
                        <div className='counter_container'>
                            <button 
                                className='counter_btn'
                                onClick={() => setItemCount(itemCount - 1)}
                            >
                                -
                            </button>
                            <span className='item_count'>{itemCount}</span>
                            <button 
                                className='counter_btn'
                                onClick={() => setItemCount(itemCount + 1)}
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FoodItem