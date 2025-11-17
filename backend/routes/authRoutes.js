// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ---------------- REGISTER ----------------
router.post("/register", authController.register);

// ---------------- VERIFY OTP ----------------
router.post("/verify-otp", authController.verifyOtp);

// ---------------- LOGIN ----------------
router.post("/login", authController.login);

// ---------------- LOGOUT (optional) ----------------
// Clears the token cookie
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
