import React, { useContext } from "react";
import MovieList from "../components/MovieList";
import Header from "../components/Header";
import { BsPlayCircleFill } from "react-icons/bs";
import SearchMovie from "../components/SearchMovie";

const Home = () => {
  return (
    <>
      <div className="row justify-content-center my-4">
        <div className="col-lg-6 col-md-6 col-10 text-center icon-render">
          <BsPlayCircleFill size={30} />
          <Header heading={"Now Showing"} />
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-lg-4 col-md-6 col-11 bg-white p-4 rounded">
          <SearchMovie />
        </div>
      </div>

      <div className="row justify-content-center my-4">
        <div className="col-lg-10 col-md-10 col-11">
          <MovieList />
        </div>
      </div>
    </>
  );
};

export default Home;
