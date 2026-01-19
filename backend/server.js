import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { user } from "./routes/user.js";
import { movie } from "./routes/movie.js";
import { ticket } from "./routes/ticket.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://movie-booking-app-by-abhilash-majumdar.onrender.com", credentials: true }));
app.use(cookieParser());

const _dirname = path.resolve();

app.use("/api/v1/moviebooking", user);
app.use("/api/v1/moviebooking", movie);
app.use("/api/v1/moviebooking", ticket);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("/*path", (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


mongoose
  .connect(`${process.env.MONGO_URI}/movie-booking-app`)
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is connected on port no : ` + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Error while connecting with server", err);
  });
