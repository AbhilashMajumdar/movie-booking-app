import { createContext, useEffect, useState } from "react";
import { handleError, handleResponse } from "../utils/helper";
import { BASE_URL } from "../constants";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [movieList, setMovieList] = useState([]);

  const isAuthenticated = async () => {
    try {
      const url = `${BASE_URL}is-authenticated`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
        credentials: "include",
      });
      const result = await response.json();
      const { success } = result;
      if (success) {
        setIsloggedIn(true);
        getUserDetails();
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    isAuthenticated();
    getAllMovies();
  }, []);

  const getUserDetails = async () => {
    try {
      const url = `${BASE_URL}get-user-details`;
      const response = await fetch(url, {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      const { success, user } = result;
      if (success && user) {
        setUserData(user);
        setIsloggedIn(true);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getAllMovies = async () => {
    try {
      const url = `${BASE_URL}get-all-movies`;
      const response = await fetch(url);
      const result = await response.json();
      const { success, movies, message } = result;
      if (success) {
        setMovieList(movies);
      } else {
        handleResponse(success, message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getSearchMovie = async (movie) => {
    try {
      const url = `${BASE_URL}search-movie?movieName=${movie}`;
      const response = await fetch(url);
      const result = await response.json();
      const { success, message, searchMovie } = result;
      if (success) {
        setMovieList(searchMovie);
      } else {
        handleResponse(success, message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const value = {
    isLoggedIn,
    setIsloggedIn,
    userData,
    setUserData,
    getUserDetails,
    isAuthenticated,
    getAllMovies,
    movieList,
    setMovieList,
    getSearchMovie,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
