const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PendingUser = require("../models/PendingUser");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

//SIGNUP → STORE ONLY IN PendingUser
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    // If real user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message:
          "An account with this email already exists. Please log in instead.",
      });
    }

    // Remove old pending signup if exists
    await PendingUser.deleteOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    await PendingUser.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    await sendEmail(
      email,
      "Verify Your Email – One-Time Password (OTP)",
      `Hello ${name},

Thank you for signing up.

Your One-Time Password (OTP) to verify your email address is:

${otp}

This OTP is valid for the next 10 minutes.

If you did not request this, please ignore this email.

Best regards,
Interview Preparation Planner Team`,
    );

    res.status(201).json({
      message:
        "We’ve sent a verification OTP to your email address. Please check your inbox to continue.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message:
        "We encountered an issue while creating your account. Please try again later.",
    });
  }
});

// VERIFY OTP → CREATE REAL USER
router.post("/verify-email-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const pending = await PendingUser.findOne({ email });
    if (!pending) {
      return res.status(400).json({ message: "No signup request found" });
    }

    if (pending.otp !== otp || pending.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await User.create({
      name: pending.name,
      email: pending.email,
      password: pending.password,
      mydashboards: [],
    });

    await PendingUser.deleteOne({ email });

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

//ONLY VERIFIED USERS EXIST
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;
