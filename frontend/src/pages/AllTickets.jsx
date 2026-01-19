import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { handleError } from "../utils/helper";
import { BASE_URL } from "../constants";
import { IoTicketSharp } from "react-icons/io5";
import Header from "../components/Header";
import NotFound from "../components/NotFound";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);

  const getAllTickets = async () => {
    try {
      const url = `${BASE_URL}all-tickets`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include",
        body: null,
      });
      const result = await response.json();
      const { success, tickets } = result;
      if (success) {
        setTickets(tickets);
      } else {
        handleResponse(success, "Error while fetching from database");
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <>
      <div className="row justify-content-center my-4">
        <div className="col-lg-6 col-md-6 col-10 icon-render mt-4 text-center">
          <IoTicketSharp size={30} />
          <Header heading={"All Tickets"} />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-10 col-12 text-center">
          {tickets?.length > 0 ? (
            <div className="row">
              {tickets?.map((ticket, i) => {
                return (
                  <div
                    className={`${tickets?.length === 1 ? "col-lg-12 col-md-12" : "col-lg-4 col-md-6"} col-12 text-center mb-4`}
                    key={i}
                  >
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          {ticket?.movie?.movieName}
                        </h5>
                        <p className="card-text m-0">
                          {ticket?.movie?.theatreName}
                        </p>

                        <p className="card-text m-0">
                          <span>Seats : </span>
                          <span>{ticket?.seats?.join(", ")}</span>
                        </p>

                        <p className="card-text m-0">
                          <span>Seats : </span>
                          <span>{ticket?.quantity}</span>
                        </p>

                        <p className="card-text m-0">
                          <span>Booked by : </span>
                          <span>
                            {ticket?.user?.firstName} {ticket?.user?.lastName}
                          </span>
                        </p>

                        <p className="card-text m-0">
                          <span>Status : </span>
                          <span
                            className={`${ticket?.status === "Confirmed" ? "text-success" : ticket?.status === "Cancelled" ? "text-danger" : "text-dark"} fw-bold`}
                          >
                            {ticket?.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="my-4">
              <NotFound
                title={"No ticket found"}
                text={"Users have not booked any ticket"}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTickets;
