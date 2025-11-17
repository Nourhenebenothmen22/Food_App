// controllers/authController.js
const transporter = require("../config/mailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const otpTemplate = require("../templates/otpTemplate");
const generateToken = require("../utils/generateToken");
const welcomeTemplate = require("../templates/welcomeTemplate");

// ---------------- REGISTER ----------------
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // 1️⃣ Check if email already exists
        const emailExist = await User.findOne({ email });
        if (emailExist)
            return res.status(400).json({ msg: "Email already exists" });

        // 2️⃣ Hash password
        const hash = await bcrypt.hash(password, 10);

        // 3️⃣ Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 4️⃣ Create user
        const user = await User.create({
            name,
            email,
            phone,
            password: hash,
            role: role || "user",
            isAccountVerified: false,
            otp,
            otpExpire: Date.now() + 5 * 60 * 1000 // 5 minutes
        });

        // 5️⃣ Send OTP email
        await transporter.sendMail({
            from: "noreply@test.com",
            to: email,
            subject: "Verify your account",
            html: otpTemplate(otp, "Verify Your Email")
        });

        res.json({ msg: "User registered. OTP sent to email." });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ---------------- VERIFY OTP ----------------
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Incorrect OTP" });
        }

        // Check OTP expiration
        if (user.otpExpire < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // OTP is valid → verify account and remove OTP
        user.isAccountVerified = true; // ✅
        user.otp = null;
        user.otpExpire = null;

        await user.save();
        await transporter.sendMail({
            from: "noreply@test.com",
            to: email,
            subject: "Welcome to Our Platform! 🎉",
            html: welcomeTemplate(user.name)
        });

        return res.status(200).json({ message: "OTP verified and account successfully activated" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const existUser = await User.findOne({ email }).select('+password');
        if (!existUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if account is verified
        if (!existUser.isAccountVerified) {
            return res.status(403).json({ message: "Account not verified. Please check your email." });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate JWT token
        const token = await generateToken(existUser);

        // Send token in a secure cookie
        res.cookie('token', token, {
            httpOnly: true, // accessible only by server
            secure: process.env.NODE_ENV === 'production', // secure in production
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // JSON response (optional)
        return res.status(200).json({
            message: "Login successful",
            user: {
                id: existUser._id,
                email: existUser.email,
                name: existUser.name,
                role: existUser.role
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
};
