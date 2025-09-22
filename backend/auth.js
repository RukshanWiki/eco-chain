// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// // REGISTER
// router.post("/register", async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const user = new User({ name, email, password, role });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     res.json({ 
//       message: "Login successful", 
//       user: { name: user.name, role: user.role, email: user.email } 
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// });

// module.exports = router;


import express from "express";
import User from "./User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { fullName, nic, farmerRegNo, province, district, email, mobile, password } = req.body;

  try {
    const existingUser = await User.findOne({ farmerRegNo });
    if (existingUser) return res.status(400).json({ success: false, message: "Farmer already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      nic,
      farmerRegNo,
      province,
      district,
      email,
      mobile,
      password: hashedPassword,
      role: "farmer",
    });

    await user.save();
    res.status(201).json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});


// FARMER LOGIN
router.post("/login", async (req, res) => {
  const { farmerRegNo, password } = req.body;
  try {
    const user = await User.findOne({ farmerRegNo });
    if (!user) return res.status(400).json({ success: false, message: "Farmer not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password" });

    res.json({ success: true, message: "Login successful", user: { fullName: user.fullName, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
