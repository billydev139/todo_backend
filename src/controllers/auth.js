import Users from "../models/user.js";
import { sendToken } from "../../src/middleware/utils.js";
import bcrypt from "bcryptjs";

//Register
export const register = async (req, res) => {
  try {
    let { userName, email, password } = req.body;

    if (!userName  || !email || !password) {
      return res.status(203).json({ error: "All fields are required" });
    }
    const regexEmail = /^\S+@\S+\.\S+$/;
    email = email.toLowerCase();
    if (!regexEmail.test(email)) {
      return res.status(203).json({ error: "Enter Valid E-mail" });
    }
    const checkEmail = await Users.findOne({ email });
    if (checkEmail) {
      return res.status(203).json({ error: "Email Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    password = hashPassword;
    req.body.password = password;
    const newUser = new Users(req.body);
    await newUser.save();

    res.status(201).json({ message: `Registered Successfully` });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// login
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const regexEmail = /^\S+@\S+\.\S+$/;
    email = email.toLowerCase();
    if (!regexEmail.test(email)) {
      return res.status(404).json({ message: "Enter Valid E-mail" });
    }
    const user = await Users.findOne({ email }).select("+password");
    if (!user || user.isDelete) {
      return res.status(404).json({ message: "Invalid Email & Password" });
    }
    const isMatch = await user.isMatchPassword(password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Email & Password" });
    }

    return sendToken(res, user, "Login Successfully");
  } catch (error) {
    console.log(error);
    return res.status(504).json({ message: error.message });
  }
};

//logOut API
export const logOut = async (req, res) => {
  try {
    let user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    user.accessToken = "";
    const updatedData = {
      ...user.toObject(),
    };
    Object.assign(user, updatedData);
    await user.save();
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};

// send OTP

export const sendOtp = async (req, res) => {
  try {
    let { email } = req.body;
    const regexEmail = /^\S+@\S+\.\S+$/;
    email = email.toLowerCase();
    if (!regexEmail.test(email)) {
      return res.status(400).json({ message: "Enter Valid E-mail" });
    }

    const user = await Users.findOne({ email: email });

    if (!user || user.isDelete) {
      return res.status(404).json({ message: "User Not Found" });
    }

    let otp = Math.floor(100000 + Math.random() * 900000);
    let otpExpireTime = new Date(Date.now()) + 60 * 1000;
    console.log("🚀 ~ sendOtp ~ otpExpireTime:", otpExpireTime);

    await Users.updateOne(
      { email: email },
      {
        $set: {
          otp: otp,
          OTPExpireTime: otpExpireTime,
        },
      }
    );

    return res.status(200).json({ message: "OTP Sent Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const verifyOPT = async (req, res) => {
  try {
    let { email, otp } = req.body;
    let verifyOTP = await Users.find({
      email: email,
      otp: otp,
    });
    if (!verifyOTP) {
      return res.status(404).json({ message: "Invalid OTP" });
    }
    let time = Date.now();
    if (verifyOTP.OTPExpireTime < time) {
      return res.status(404).json({ message: "OTP Expired" });
    }
  } catch (error) {}
};
