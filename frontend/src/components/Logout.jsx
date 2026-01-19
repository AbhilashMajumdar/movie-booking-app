import React, { useContext, useEffect } from "react";
import { handleError, handleResponse } from "../utils/helper";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setIsloggedIn, setUserData } = useContext(AppContext);

  const logOutUser = async () => {
    try {
      const url = `${BASE_URL}logout`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
        credentials: "include",
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleResponse(success, message);
        setIsloggedIn(false);
        setUserData(null);
        setTimeout(() => {
          navigate("/");
        }, [2000]);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    logOutUser();
  }, []);

  return <></>;
};

export default Logout;
