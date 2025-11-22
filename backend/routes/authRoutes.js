// routes/authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ---------------- REGISTER ----------------
// Route for creating a new user account
router.post("/register", authController.register);

// ---------------- VERIFY OTP ----------------
// Route for verifying the OTP sent to the user's email
router.post("/verify-otp", authController.verifyOtp);

// ---------------- LOGIN ----------------
// Route for logging in a user and sending a JWT in a cookie
router.post("/login", authController.login);

// ---------------- GET USER PROFILE ----------------
// Get user profile by ID 
router.get("/:id", authController.getProfile);

// ---------------- LOGOUT ----------------
// Clear JWT token cookie and log out user
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
