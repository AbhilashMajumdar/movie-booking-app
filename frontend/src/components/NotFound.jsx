import React from "react";

const NotFound = ({ title, text }) => {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12 p-4 bg-white text-center mt-4">
          <div className="my-4">
            <h2>{title}</h2>
          </div>
          <div className="my-4">
            <p>{text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
