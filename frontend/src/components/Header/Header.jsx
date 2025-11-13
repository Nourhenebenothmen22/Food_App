import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

function Header() {
  return (
    <div className='header' style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${assets.header_img})`}}>
        <div className='header_content'>
            <h2>Delicious Food Delivered To You</h2>
            <p>Experience the finest cuisine from the comfort of your home. Fresh ingredients, authentic flavors, and exceptional service.</p>
            <button className='header_btn'>Order Now</button>
        </div>
    </div>
  )
}

export default Header