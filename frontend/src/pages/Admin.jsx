import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { RiMovieAiFill } from "react-icons/ri";
import SubHeader from "../components/SubHeader";
import { handleError, handleResponse } from "../utils/helper";
import { BASE_URL } from "../constants";
import MovieList from "../components/MovieList";
import { AppContext } from "../context/AppContext";

const Admin = () => {
  const [movieData, setMovieData] = useState({
    movieName: "",
    theatreName: "",
    totalNoOfTickets: "",
  });

  const { getAllMovies } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyData = { ...movieData };
    copyData[name] = value;
    setMovieData(copyData);
  };

  const addMovie = async () => {
    try {
      const url = `${BASE_URL}add-movie`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleResponse(success, message);
        setTimeout(() => {
          setMovieData({
            movieName: "",
            theatreName: "",
            totalNoOfTickets: "",
          });
          getAllMovies();
        }, [1000]);
      } else {
        handleResponse(success, message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSubmit = () => {
    addMovie();
  };

  const { movieName, theatreName, totalNoOfTickets } = movieData;

  return (
    <>
      <div className="admin my-4">
        {/* heading */}
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12 text-center mb-2 icon-render">
            <RiMovieAiFill size={30} />
            <Header heading={"Admin Dashboard"} />
          </div>
        </div>

        {/* sub-heading  */}
        <div className="row justify-content-center mb-2">
          <div className="col-lg-6 col-md-8 col-12 text-center">
            <p>Manage movies, ticket availability & status</p>
          </div>
        </div>

        {/* add movie  */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-10 col-10 bg-white">
            <div className="row justify-content-center my-4">
              <div className="col-md-4 col-10 text-center">
                <SubHeader heading={"Add New Movie"} />
              </div>
            </div>

            <div className="row justify-content-evenly mb-4">
              <div className="col-md-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="movieName"
                  name="movieName"
                  value={movieName}
                  onChange={handleChange}
                  aria-describedby="movieName"
                  placeholder="Enter Movie Name ... "
                  autoComplete="movieName"
                />
              </div>
              <div className="col-md-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="theatreName"
                  name="theatreName"
                  value={theatreName}
                  onChange={handleChange}
                  aria-describedby="theatreName"
                  placeholder="Enter Theatre Name ... "
                  autoComplete="theatreName"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  id="totalNoOfTickets"
                  name="totalNoOfTickets"
                  value={totalNoOfTickets}
                  onChange={handleChange}
                  aria-describedby="totalNoOfTickets"
                  placeholder="Enter Total Tickets ... "
                  autoComplete="totalNoOfTickets"
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-12 col-md-12 col-12">
                <button
                  className="btn btn-dark add-movie-btn"
                  onClick={handleSubmit}
                >
                  Add Movie
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* movieList  */}
        <div className="row justify-content-center my-4">
          <div className="col-lg-11 col-md-11 col-12">
            <MovieList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
