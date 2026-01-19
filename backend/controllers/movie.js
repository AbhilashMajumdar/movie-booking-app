import { movie } from "../models/movie.js";
import { ticket } from "../models/ticket.js";

export const addMovie = async (req, res, next) => {
  try {
    const { movieName, theatreName, totalNoOfTickets } = req.body;
    if (!movieName || !theatreName || !totalNoOfTickets) {
      return res.status(404).json({
        success: false,
        message: "Please fill the required fields",
      });
    }
    const existingMovie = await movie.findOne({ movieName });
    if (existingMovie) {
      return res.status(400).json({
        success: false,
        message: `${existingMovie.movieName} already added!`,
      });
    }
    const newMovie = new movie({
      movieName,
      theatreName,
      totalNoOfTickets,
    });
    await newMovie.save();
    return res.status(200).json({
      success: true,
      message: `${movieName} added successfully!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || error,
    });
  }
};

export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await movie.find();
    if (!movies) {
      return res.status(404).json({
        success: false,
        message: "No movie found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "fetching all movies ...",
      movies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || error,
    });
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingMovie = await movie.findById(id);
    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        message: `${existingMovie?.movieName} not found!`,
      });
    }
    await movie.findByIdAndDelete(id);
    const filter = { movie: id };
    await ticket.deleteMany(filter);
    return res.status(200).json({
      success: true,
      message: `${existingMovie?.movieName} deleted successfully!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || error,
    });
  }
};

export const updateMovieStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const existingMovie = await movie.findById(id);
    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        message: `${existingMovie?.movieName} not found!`,
      });
    }
    const updatedMovie = await movie.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: `${updatedMovie?.movieName} status updated successfully!`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || error,
    });
  }
};

export const getSearchMovie = async (req, res, next) => {
  try {
    const { movieName } = req.query;
    const searchMovie = await movie.find({
      movieName: { $regex: movieName, $options: "i" },
    });

    if (!searchMovie) {
      return res.status(404).json({
        success: false,
        message: "No movie found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "fetching searched movie ...",
      searchMovie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || error,
    });
  }
};

export const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDetails = await movie.findById(id);
    if (!movieDetails) {
      return res.status(404).json({
        success: false,
        message: "No movie found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "fetching movie ...",
      movie: movieDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || error,
    });
  }
};

export const bookMovieTicket = async (req, res, next) => {
  try {
    const {
      userId,
      movieId,
      selectedSeats,
      bookedSeats,
      bookedNoOfTickets,
      quantity,
    } = req.body;
    const existingMovie = await movie.findById(movieId);
    const updatedMovie = await movie.findByIdAndUpdate(
      existingMovie?._id,
      {
        bookedSeats,
        bookedNoOfTickets,
      },
      {
        new: true,
      },
    );
    await updatedMovie.save();
    const newTicket = new ticket({
      user: userId,
      movie: movieId,
      seats: selectedSeats,
      quantity,
    });
    await newTicket.save();
    return res.status(200).json({
      success: true,
      message: "Ticket has booked!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || error,
    });
  }
};
