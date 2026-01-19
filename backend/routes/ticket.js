import express from "express";
import { getAllTickets, getMyTickets } from "../controllers/ticket.js";
import { auth } from "../middlewares/auth.js";


export const ticket = express.Router();

ticket.get('/my-tickets', auth, getMyTickets);
ticket.get('/all-tickets', auth, getAllTickets);
