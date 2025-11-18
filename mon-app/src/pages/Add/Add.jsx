import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Add.css";
import { assets } from "../../assets/assets";
import { toast } from 'react-toastify';

function Add() {
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    })

    const url = "http://localhost:5000/api/v1/food"

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const resetForm = () => {
        setData({
            name: "",
            description: "",
            price: "",
            category: ""
        });
        setImage(false);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('category', data.category);

            const response = await axios.post(url, formData);
            
            console.log("Réponse du serveur:", response.data);
            
            // Show success toast et reset après fermeture
            toast.success('Product added successfully!', {
                position: "top-right",
                autoClose: 5000,
                onClose: () => resetForm()
            });
            
        } catch (error) {
            console.error("Erreur lors de l'ajout:", error);
            
            // Show error toast
            toast.error('Error adding product. Please try again.', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className="add">
            <h1>Add New Product</h1>
            <form className="flex-col" onSubmit={onSubmitHandler}>
                {/* Product Image */}
                <div className="form-group">
                    <label htmlFor="image">Product Image</label>
                    <div className="file-input-container">
                        <img src={assets.upload_area} alt="" />
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id="image"
                            name="image"
                            className="file-input"
                            required
                        />
                        <div className="file-input-label">
                            <span>Choose image</span>
                        </div>
                    </div>
                </div>

                {/* Product Name */}
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                {/* Product Category */}
                <div className="form-group">
                    <label htmlFor="category">Product Category</label>
                    <select
                        onChange={onChangeHandler}
                        value={data.category}
                        id="category"
                        name="category"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="salad">Salad</option>
                        <option value="rolls">Rolls</option>
                        <option value="desserts">Desserts</option>
                        <option value="sandwich">Sandwich</option>
                        <option value="cake">Cake</option>
                        <option value="pure-veg">Pure Veg</option>
                        <option value="pasta">Pasta</option>
                        <option value="noodles">Noodles</option>
                    </select>
                </div>

                {/* Product Price */}
                <div className="form-group">
                    <label htmlFor="price">Product Price ($)</label>
                    <input
                        onChange={onChangeHandler}
                        value={data.price}
                        type="number"
                        id="price"
                        name="price"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        id="description"
                        name="description"
                        placeholder="Enter product description..."
                        rows="4"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-btn">
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default Add;