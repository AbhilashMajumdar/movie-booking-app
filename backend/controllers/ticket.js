import { ticket } from "../models/ticket.js";

export const getMyTickets = async (req, res, next) => {
  try {
    const userId = req.user;
    const tickets = await ticket.find({ user: userId }).populate('movie');
    if (!tickets) {
      return res.status(404).json({
        success: false,
        message: "No ticket found",
      });
    }
    return res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || error,
    });
  }
};

export const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await ticket.find().populate('movie').populate('user');
    if (!tickets) {
      return res.status(404).json({
        success: false,
        message: "No ticket found",
      });
    }
    return res.status(200).json({
      success: true,
      tickets,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || error,
    });
  }
};

