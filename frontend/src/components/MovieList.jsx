import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { handleError, handleResponse } from "../utils/helper";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const MovieList = () => {
  const { movieList, userData, getAllMovies, isLoggedIn } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleBook = (movie) => {
    if (!isLoggedIn) {
      handleResponse(false, "Please login to book the shows!");
      setTimeout(() => {
        navigate("/login");
      }, [2000]);
    } else {
      navigate(`/book/${movie?._id}`);
    }
  };

  const updateStatus = async (movie, status) => {
    try {
      const url = `${BASE_URL}update-status`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movie?._id, status }),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleResponse(success, message);
        setTimeout(() => {
          getAllMovies();
        }, [1000]);
      } else {
        handleResponse(success, message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleMovieStatus = (movie, status) => {
    updateStatus(movie, status);
  };

  const deleteMovie = async (id) => {
    try {
      const url = `${BASE_URL}delete-movie/${id}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: null,
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleResponse(success, message);
        setTimeout(() => {
          getAllMovies();
        }, [1000]);
      } else {
        handleResponse(success, message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleDeleteMovie = (movie) => {
    deleteMovie(movie?._id);
  };

  const handleRefeshAvailability = (movie) => {
    let status = "";
    const totalNoOfTickets = movie?.totalNoOfTickets;
    const bookedNoOfTickets = movie?.bookedNoOfTickets;
    const availableNoOfTickets = totalNoOfTickets - bookedNoOfTickets;
    if (availableNoOfTickets === 0) {
      status = "SOLD OUT";
    } else if (
      availableNoOfTickets < totalNoOfTickets / 2 ||
      availableNoOfTickets === totalNoOfTickets / 2
    ) {
      status = "BOOK ASAP";
    } else if (availableNoOfTickets > bookedNoOfTickets) {
      status = "Available";
    }
    updateStatus(movie, status);
  };

  return (
    <>
      {movieList?.length > 0 ? (
        <div className="row">
          {movieList?.map((movie, i) => {
            return (
              <div
                className={`${movieList?.length === 1 ? "col-lg-12 col-md-12" : "col-lg-4 col-md-6"} col-12 text-center mb-4`}
                key={i}
              >
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{movie?.movieName}</h5>
                    <p className="card-text m-0">{movie?.theatreName}</p>
                    {userData?.role === "admin" && (
                      <p className="card-text m-0">
                        <span>Booked Tickets :</span>
                        <span>{movie?.bookedNoOfTickets}</span>
                      </p>
                    )}

                    <p className="card-text m-0">
                      <span>Available : </span>
                      <span>
                        {movie?.totalNoOfTickets - movie?.bookedNoOfTickets}
                      </span>
                    </p>

                    <p className="card-text">
                      <span>Status :</span>
                      <span
                        className={`${
                          movie?.status === "SOLD OUT" ||
                          movie?.totalNoOfTickets - movie?.bookedNoOfTickets ===
                            0
                            ? "text-danger"
                            : movie?.status === "Available"
                              ? "text-success"
                              : "text-primary"
                        } fw-bold`}
                      >
                        {" "}
                        {movie?.totalNoOfTickets - movie?.bookedNoOfTickets ===
                          0 || movie?.status === "SOLD OUT"
                          ? "SOLD OUT"
                          : movie?.status === "Available"
                            ? "Available"
                            : movie?.status}
                      </span>
                    </p>

                    {userData?.role === "admin" && (
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                          <button
                            className="btn btn-warning book-asap-btn"
                            onClick={() => handleRefeshAvailability(movie)}
                          >
                            Refresh Availability
                          </button>
                        </div>
                      </div>
                    )}
                    {userData?.role === "admin" && (
                      <div className="row justify-content-center mt-3 mb-1">
                        <div className="col-lg-6 col-md-6 col-6 mb-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleMovieStatus(movie, "SOLD OUT")}
                          >
                            Sold Out
                          </button>
                        </div>

                        <div className="col-lg-6 col-md-6 col-6">
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              handleMovieStatus(movie, "BOOK ASAP")
                            }
                          >
                            Book ASAP
                          </button>
                        </div>
                      </div>
                    )}
                    {userData?.role === "admin" && (
                      <div className="row justify-content-center mb-2">
                        <div className="col-lg-4 col-md-4 col-10">
                          <button
                            className="btn btn-dark"
                            onClick={() => handleDeleteMovie(movie)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                    {userData?.role !== "admin" && (
                      <button
                        className="btn btn-dark mb-2"
                        disabled={
                          movie?.status === "SOLD OUT" ||
                          movie?.totalNoOfTickets - movie?.bookedNoOfTickets ===
                            0
                        }
                        onClick={() => handleBook(movie)}
                      >
                        {movie?.status === "SOLD OUT" ||
                        movie?.totalNoOfTickets - movie?.bookedNoOfTickets === 0
                          ? "SOLD OUT"
                          : "Book Now"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="my-4">
          <NotFound
            title={"No movies found"}
            text={"Please add movie to display here"}
          />
        </div>
      )}
    </>
  );
};

export default MovieList;
