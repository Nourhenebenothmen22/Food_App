const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,       
    },
    items: {
        type: Array,
        required: true,     
       
    },
    amount: {
        type: Number,
        required: true,       
    },
    address: {
        type: Object,
        required: true,       // Delivery address information
        /* Example:
        {
          street: "Main Street 12",
          city: "Paris",
          phone: "0611223344"
        }
        */
    },
    status: {
        type: String,
        default: 'Food Processing',  // Current order status
        // Possible values: "Food Processing", "Out for Delivery", "Delivered"
    },
    date: {
        type: Date,
        default: Date.now      
    },
    payment: {
        type: Boolean,
        default: false         
    }
});

module.exports = mongoose.model('Orders', orderSchema);
