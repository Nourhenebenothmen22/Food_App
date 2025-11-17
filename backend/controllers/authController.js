// controllers/authController.js
const  transporter  = require("../config/mailer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const otpTemplate = require("../templates/otpTemplate");

// ---------------- REGISTER ----------------
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // 1️⃣ Check if email exists
        const emailExist = await User.findOne({ email });
        if (emailExist)
            return res.status(400).json({ msg: "Email already exists" });
        // 3️⃣ Hash password
        const hash = await bcrypt.hash(password, 10);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();


        // 4️⃣ Create user
        const user = await User.create({
            name,
            email,
            phone,
            password: hash,
            role: role || "user",
            isVerified: false,
            otp,
            otpExpire: Date.now() + 5 * 60 * 1000
        });
        // send OTP email
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
exports.verifyOtp=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }

}

