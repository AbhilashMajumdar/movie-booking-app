import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { user } from "../models/user.js";
import { clearCookie, setCookie } from "../utils/helper.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      loginId,
      contactNo,
      password,
      confirmPassword,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !loginId ||
      !contactNo ||
      !confirmPassword ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }
    const exitingUser = await user.findOne({ loginId });
    if (exitingUser) {
      return res.status(404).json({
        success: false,
        message: "Account already created, please login!",
      });
    }
    const newUser = new user({
      firstName,
      lastName,
      email,
      loginId,
      contactNo,
    });
    const isMatched = password === confirmPassword;
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password not matched!",
      });
    }
    if (
      loginId === process.env.ADMIN_ID &&
      password === process.env.ADMIN_PASSWORD
    ) {
      newUser.role = "admin";
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "Account has been successfully registered!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.messgae || "Server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { loginId, password } = req.body;
    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }
    const exitingUser = await user.findOne({ loginId });
    if (!exitingUser) {
      return res.status(400).json({
        success: false,
        message: "Account not created, please register first!",
      });
    }
    const isMatched = await bcrypt.compare(password, exitingUser.password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }
    const jwtToken = jwt.sign({ loginId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    setCookie(res, jwtToken);
    return res.status(200).json({
      success: true,
      message: "Account has been successfully loggedIn!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.messgae || "Server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    clearCookie(res);
    return res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.messgae || "Server error",
    });
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const userId = req.user;
    const existingUser = await user.findById(userId);
    return res.status(200).json({
      success: true,
      user: existingUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.messgae || "Server error",
    });
  }
};

export const isAuthenticated = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User is authenticated!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.messgae || "Server error",
    });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { loginId, password, confirmPassword } = req.body;
    if (!loginId || !password || !confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "Please fill all the required fields",
      });
    }
    const existingUser = await user.findOne({ loginId });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Please enter correct login ID",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password are not the same",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.findByIdAndUpdate(
      existingUser?._id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Password has changed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.messgae || "Server error",
    });
  }
};
