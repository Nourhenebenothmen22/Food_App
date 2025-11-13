import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

function ExploreMenu({categry,setCategory}) {
  return (
    <div className='explore_menu' id="explore_menu">
        <h1>Explore Our Menu</h1>
        <p className='menu_description'>
            Discover our wide variety of delicious dishes made with fresh ingredients and authentic flavors
        </p>
        <div className='menu_list'>
            {
                menu_list.map((item,index)=>{
                    return(
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All" :item.menu_name)} key={index} className='menu_item'>
                            <div className='image_container'>
                                <img src={item.menu_image} alt={item.menu_name} />
                            </div>
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMenu