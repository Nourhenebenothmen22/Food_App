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
    },
    
    // ✅ AJOUTER LE CHAMP CART ICI
    cart: {
        type: Object,
        default: {}  // Panier vide par défaut
    },
    
    otp: String,
    otpExpire: Date,
    resetOtp: String,
    resetOtpExpire: Date
}, { timestamps: true }); 

module.exports = mongoose.model('User', userSchema);