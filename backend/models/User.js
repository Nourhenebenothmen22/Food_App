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
        select: false 
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

    // ✅ Email Verification Fields
    verifyOtp: {
        type: String,
        default: ""
    },
    verifyOtpExpireAt: {
        type: Number, 
        default: 0
    },
    isAccountVerified: {
        type: Boolean,
    },

    // 🔁 Password Reset Fields
    resetOtp: {
        type: String,
        default: "",
    },
    resetOtpExpireAt: {
        type: Number,
        default: 0,
     
    }
}, { timestamps: true }); // ajoute createdAt et updatedAt automatiquement

module.exports = mongoose.model('User', userSchema);
