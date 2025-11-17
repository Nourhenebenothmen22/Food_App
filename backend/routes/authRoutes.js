const express = require("express");
const router = express.Router();
const { register, verifyOTP } = require("../controllers/authController");

router.post("/register", register);


module.exports = router;
