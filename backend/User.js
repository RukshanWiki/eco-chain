// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["farmer", "admin"], default: "farmer" }
// });

// // Encrypt password before saving
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare password
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", UserSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  nic: { type: String, required: true },
  farmerRegNo: { type: String, required: true, unique: true },
  province: { type: String, required: true },
  district: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "farmer" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);

