import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "userName is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  accessToken: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.isMatchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.getAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const Users = mongoose.model("user", userSchema);

export default Users;
