import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { handleError } from "../utils/helper";
import { BASE_URL } from "../constants";
import { useEffect } from "react";

const SearchMovie = () => {
  const [movieName, setMovieName] = useState("");
  const { movieList, userData, getAllMovies, getSearchMovie } =
    useContext(AppContext);

  // useEffect(() => {
  //   if (movieName === "") {
  //     getSearchMovie(movieName);
  //   }
  // }, [movieName]);

  const handleSearch = () => {
    getSearchMovie(movieName);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-9 col-8">
          <input
            type="text"
            className="form-control"
            id="movieName"
            name="movieName"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Enter Movie Name ... "
            autoComplete="movieName"
          />
        </div>
        <div className="col-md-3 col-3">
          <button className="btn btn-dark" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchMovie;
