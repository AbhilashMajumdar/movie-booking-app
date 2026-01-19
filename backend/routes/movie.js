import express from "express";
import {
  addMovie,
  bookMovieTicket,
  deleteMovie,
  getAllMovies,
  getMovieDetails,
  getSearchMovie,
  updateMovieStatus,
} from "../controllers/movie.js";

export const movie = express.Router();

movie.post("/add-movie", addMovie);
movie.get("/get-all-movies", getAllMovies);
movie.delete("/delete-movie/:id", deleteMovie);
movie.put("/update-status", updateMovieStatus);
movie.get("/search-movie", getSearchMovie);
movie.get("/get-movie-details/:id", getMovieDetails);
movie.put("/book-movie-ticket", bookMovieTicket);
