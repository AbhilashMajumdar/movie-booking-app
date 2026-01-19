import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { handleError, handleResponse } from "../utils/helper";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { BiSolidMoviePlay } from "react-icons/bi";

const Login = () => {
  const { getUserDetails } = useContext(AppContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    loginId: "",
    password: "",
  });

  const loginUser = async () => {
    try {
      const url = `${BASE_URL}login`;
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleResponse(success, message);
        getUserDetails();
        setTimeout(() => {
          navigate("/");
        }, [2000]);
      } else {
        handleResponse(success, message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginData = { ...loginData };
    copyLoginData[name] = value;
    setLoginData(copyLoginData);
  };

  const { loginId, password } = loginData;

  return (
    <>
      <div className="row justify-content-center div-center">
        <div className="col-xl-4 col-lg-6 col-md-6 col-11">
          <div className="div-design">
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-4 icon-render">
                <Header heading={"Welcome Back"} />
                < BiSolidMoviePlay size={30} />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="loginId"
                  name="loginId"
                  value={loginId}
                  onChange={handleChange}
                  aria-describedby="email"
                  placeholder="Enter Login Id ... "
                  autoComplete="loginId"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter Password ... "
                  autoComplete="password"
                />
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-dark">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
