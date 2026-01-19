import jwt from "jsonwebtoken";
import "dotenv/config";
import { user } from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    const { jwtToken } = req.cookies;
    if (!jwtToken) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized token!",
      });
    }
    const decodedUser = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const existingUser = await user.findOne({ loginId: decodedUser.loginId });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "user not found!",
      });
    }
    req.user = existingUser._id;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.messgae || "Server error",
    });
  }
};
