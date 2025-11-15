const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    ImageProfile: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        required: false,
        default: ""
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // ajoute createdAt et updatedAt automatiquement

module.exports = mongoose.model('User', userSchema);
