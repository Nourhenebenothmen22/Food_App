import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const url = "http://localhost:5000/api/v1/food";

function List() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products
  const fetchList = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setList(response.data);
    } catch (error) {
      console.error("Error while loading:", error);
      toast.error('Error loading products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Delete a product
  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/${foodId}`);
      if (response.status === 200) {
        toast.success('Product deleted successfully');
        setList(prevList => prevList.filter(item => item._id !== foodId));
      }
    } catch (error) {
      console.error("Error while deleting:", error);
      toast.error('Error deleting the product');
    }
  };

  return (
    <div className='list'>
      <h1>Product List</h1>
      {isLoading && <div className="loading">Loading...</div>}

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length === 0 && !isLoading ? (
          <div className="no-data">No products found</div>
        ) : (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img 
                src={`http://localhost:5000/images/${item.image}`}
                alt={item.name}
                className="product-image"
              />
              <p>{item.name}</p>
              <p className="description">{item.description}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <button 
                onClick={() => removeFood(item._id)} 
                className='remove-btn' 
                disabled={isLoading}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default List;
