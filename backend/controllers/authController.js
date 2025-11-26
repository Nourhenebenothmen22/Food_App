// controllers/authController.js
const transporter = require("../config/mailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const otpTemplate = require("../templates/otpTemplate");
const generateToken = require("../utils/generateToken");
const welcomeTemplate = require("../templates/welcomeTemplate");

// ------------------------------------------------------
// REGISTER CONTROLLER
// ------------------------------------------------------
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // 1️⃣ Check if the email is already registered
        const emailExist = await User.findOne({ email });
        if (emailExist)
            return res.status(400).json({ msg: "Email already exists" });

        // 2️⃣ Hash the password
        const hash = await bcrypt.hash(password, 10);

        // 3️⃣ Generate a 6-digit OTP code
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 4️⃣ Create a new user in the database
        const user = await User.create({
            name,
            email,
            phone,
            password: hash,
            role: role || "user",
            isAccountVerified: false,
            otp,
            otpExpire: Date.now() + 5 * 60 * 1000 // OTP valid for 5 min
        });

        // 5️⃣ Send OTP to the user's email
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

// ------------------------------------------------------
// VERIFY OTP CONTROLLER
// ------------------------------------------------------
exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // 1️⃣ Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2️⃣ Validate OTP
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Incorrect OTP" });
        }

        // 3️⃣ Check OTP expiration
        if (user.otpExpire < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // 4️⃣ Mark the account as verified and remove OTP fields
        user.isAccountVerified = true;
        user.otp = null;
        user.otpExpire = null;

        await user.save();

        // 5️⃣ Send a welcome email
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

// ------------------------------------------------------
// LOGIN CONTROLLER
// ------------------------------------------------------
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Check if the user exists (+password is included explicitly)
        const existUser = await User.findOne({ email }).select('+password');
        if (!existUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2️⃣ Ensure the account is verified
        if (!existUser.isAccountVerified) {
            return res.status(403).json({ message: "Account not verified. Please check your email." });
        }

        // 3️⃣ Compare submitted password with the hashed password
        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // 4️⃣ Generate a JWT token
        const token = await generateToken(existUser);

        // 5️⃣ Store the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000 // 1 hour
        });

        // 6️⃣ Return user info (without password)
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

// ------------------------------------------------------
// GET PROFILE CONTROLLER
// ------------------------------------------------------
// ------------------------------------------------------
// GET PROFILE CONTROLLER
// ------------------------------------------------------
exports.getProfile = async (req, res) => {
    try {
        const id = req.params.id;

        // 1️⃣ Fetch user by ID (password excluded)
        const user = await User.findById(id).select("-password");

        // 2️⃣ If user does not exist → return error
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // 3️⃣ Send back user profile data WITH image and phone
        return res.status(200).json({
            message: "Profile fetched successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                phone: user.phone,
                image: user.ImageProfile,
                cart:user.cart 
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error
        });
    }
};