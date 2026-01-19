import express from "express";
import { getUserDetails, isAuthenticated, login, logout, register, resetPassword } from "../controllers/user.js";
import { auth } from "../middlewares/auth.js";

export const user = express.Router();

user.post("/register", register);
user.post("/login", login);
user.get('/logout', logout);
user.get('/get-user-details', auth, getUserDetails);
user.get('/is-authenticated', auth, isAuthenticated);
user.put('/reset-password', auth, resetPassword);
