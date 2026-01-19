import React from "react";
import Header from "../components/Header";
import { MdEventSeat } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { handleError, handleResponse } from "../utils/helper";
import { BASE_URL, seatRows, SEATS_PER_ROW } from "../constants";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const BookSeats = () => {
  const { id } = useParams();
  const [totalNoOfSeats, setTotalNoOfSeats] = useState("");
  const [movie, setMovie] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [existingBookedSeats, setExistingBookedSeats] = useState([]);
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  const getMovieDetails = async (id) => {
    try {
      const url = `${BASE_URL}get-movie-details/${id}`;
      const response = await fetch(url);
      const result = await response.json();
      const { success, movie } = result;
      if (success) {
        setMovie(movie);
        setExistingBookedSeats(movie?.bookedSeats);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useState(() => {
    getMovieDetails(id);
  }, []);

  console.log(movie);
  

  const rows = [];
  const allSeats = Array.from(
    { length: movie?.totalNoOfTickets || 0 },
    (_, i) => i + 1,
  );

  for (let i = 0; i < allSeats?.length; i = i + SEATS_PER_ROW) {
    rows.push(allSeats.slice(i, i + SEATS_PER_ROW));
  }

  const handleButtonClick = (seatId) => {
    if (!selectedSeats?.includes(seatId)) {
      setSelectedSeats((prev) => [...prev, seatId]);
    } else {
      const filterData = selectedSeats?.filter((item) => item !== seatId);
      setSelectedSeats(filterData);
    }
  };

  const confirmBookSeats = async () => {
    try {
      const userId = userData?._id;
      const movieId = movie?._id;
      const quantity = selectedSeats?.length;
      const bookedSeats = [...existingBookedSeats, ...selectedSeats];
      const bookedNoOfTickets = bookedSeats?.length;

      const url = `${BASE_URL}book-movie-ticket`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          userId,
          movieId,
          quantity,
          selectedSeats,
          bookedSeats,
          bookedNoOfTickets,
        }),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleResponse(success, message);
        setTimeout(() => {
          navigate("/my-tickets");
        }, [2000]);
      } else {
        handleResponse(success, message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSeatBook = () => {
    const noOfSeats = Number(totalNoOfSeats);
    if (noOfSeats === 0) {
      handleResponse(false, `Please enter total no of seats`);
    } else if (selectedSeats?.length === 0) {
      handleResponse(false, `Please select the seats!`);
    } else if (noOfSeats !== selectedSeats?.length) {
      handleResponse(false, `Please select exactly ${noOfSeats} seats!`);
    } else {
      confirmBookSeats();
    }
  };

  return (
    <>
      {/* heading  */}
      <div className="row justify-content-center mt-4 mb-2">
        <div className="col-lg-6 col-md-6 col-12 text-center icon-render mt-2">
          <MdEventSeat size={30} />
          <Header heading={"Select your Seats"} />
        </div>
      </div>

      {/* subheading */}
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-4 col-10 text-center">
          <p>
            {movie?.movieName} {" - "} {movie?.theatreName}
          </p>
        </div>
      </div>

      {/* seat layout  */}
      <div className="row justify-content-center my-4">
        <div className="col-xl-6 col-lg-8 col-md-8 col-12 bg-white p-4 rounded">
          {/* no of tickets  */}
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-11">
              <div>
                <h4>No of tickets</h4>
              </div>
              <div className="mt-3">
                <input
                  type="number"
                  className="form-control"
                  id="totalNoOfSeats"
                  name="totalNoOfSeats"
                  value={totalNoOfSeats}
                  onChange={(e) => setTotalNoOfSeats(e.target.value)}
                  aria-describedby="email"
                  placeholder="Enter total no of seats ... "
                  autoComplete="totalNoOfSeats"
                />
              </div>
            </div>
          </div>

          {/* setas */}
          <div className="row my-4">
            <div className="col-lg-12 col-md-12 col-12 text-center">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((_, i) => {
                    const seatId = seatRows[rowIndex] + (i + 1);
                    const isSelected = selectedSeats.includes(seatId);
                    const isBooked = existingBookedSeats?.includes(seatId);
                    return (
                      <button
                        key={i}
                        className={`seat-btn btn ${isSelected ? "btn-primary text-white" : isBooked ? "btn-danger" : "btn-outline-primary"} m-1`}
                        onClick={() => handleButtonClick(seatId)}
                        disabled={isBooked}
                      >
                        {seatId}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* button  */}
          <div className="row mt-2 mb-3">
            <div className="col-lg-12 col-md-12 col-12">
              <button
                className="btn btn-primary confirm-btn"
                onClick={handleSeatBook}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSeats;
