import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { AppContext } from "../context/AppContext";
import { MdMovieFilter } from "react-icons/md";

const Navbar = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const [navState, setNavState] = useState(false);
  const { userData, isLoggedIn } = useContext(AppContext);

  const handleNavLinks = () => {
    if (navState) {
      setNavState(false);
      const element = document.getElementById("navbarSupportedContent");
      element.classList.remove("show");
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <MdMovieFilter size={30} /> Movie Booking App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={(e) => setNavState(!navState)}
          >
            {!navState ? (
              <span className="navbar-toggler-icon"></span>
            ) : (
              <RxCross1 color="white" size={30} />
            )}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <Link
                  className={`nav-link active ${
                    pathName === "/" && " bg-white text-dark fw-bold rounded"
                  }`}
                  to={"/"}
                  onClick={handleNavLinks}
                >
                  Home
                </Link>
              </li>
              {userData?.role === "user" && (
                <li className="nav-item mx-3">
                  <Link
                    className={`nav-link active ${
                      pathName === "/my-tickets" &&
                      " bg-white text-dark fw-bold rounded"
                    }`}
                    to={"/my-tickets"}
                    onClick={handleNavLinks}
                  >
                    My Tickets
                  </Link>
                </li>
              )}
              {userData?.role === "admin" && (
                <li className="nav-item mx-3">
                  <Link
                    className={`nav-link active ${
                      pathName === "/all-tickets" &&
                      " bg-white text-dark fw-bold rounded"
                    }`}
                    to={"/all-tickets"}
                    onClick={handleNavLinks}
                  >
                    All Tickets
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item mx-3">
                  <Link
                    className={`nav-link active ${
                      pathName === "/reset-password" &&
                      " bg-white text-dark fw-bold rounded"
                    }`}
                    to={"/reset-password"}
                    onClick={handleNavLinks}
                  >
                    Change Password
                  </Link>
                </li>
              )}
              {isLoggedIn && userData?.role === "admin" && (
                <li className="nav-item mx-3">
                  <Link
                    className={`nav-link active ${
                      pathName === "/admin" && " bg-white text-dark fw-bold rounded"
                    }`}
                    to={"/admin"}
                    onClick={handleNavLinks}
                  >
                    Admin
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item mx-3">
                  <span className={`nav-link active text-warning fw-bold`}>
                    Hi, {userData?.firstName}
                  </span>
                </li>
              )}
              {!isLoggedIn && (
                <li className="nav-item mx-3">
                  <Link
                    className={`nav-link active ${
                      pathName === "/login" && " bg-white text-dark fw-bold rounded"
                    }`}
                    to={"/login"}
                    onClick={handleNavLinks}
                  >
                    Login
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li className="nav-item mx-3">
                  <Link
                    className={`nav-link active ${
                      pathName === "/register" && " bg-white text-dark fw-bold rounded"
                    }`}
                    to={"/register"}
                    onClick={handleNavLinks}
                  >
                    Register
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item mx-3">
                  <Link
                    className={`nav-link active ${
                      pathName === "/logout" && " bg-white text-dark fw-bold rounded"
                    }`}
                    to={"/logout"}
                    onClick={handleNavLinks}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
