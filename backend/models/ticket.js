import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
  },
  seats: {
    type: Array,
    default: [],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "Confirmed",
  },
});

export const ticket = mongoose.model("Ticket", ticketSchema);
