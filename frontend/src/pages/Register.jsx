import React, { useState } from "react";
import Header from "../components/Header";
import { toast } from "react-toastify";
import { handleError, handleResponse } from "../utils/helper";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    loginId: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyRegisterData = { ...registerData };
    copyRegisterData[name] = value;
    setRegisterData(copyRegisterData);
  };

  const rules = [
    {
      label: "Minimum 8 characters",
      test: (value) => value?.length >= 8,
    },
    {
      label: "Contains uppercase letter",
      test: (value) => /[A-Z]/.test(value),
    },
    {
      label: "Contains lowercase letter",
      test: (value) => /[a-z]/.test(value),
    },
    {
      label: "Contains a number",
      test: (value) => /[0-9]/.test(value),
    },
    {
      label: "*Contains special character (!@#$%^&*)",
      test: (value) => /[!@#$%^&*]/.test(value),
    },
  ];

  const {
    firstName,
    lastName,
    email,
    contactNo,
    confirmPassword,
    loginId,
    password,
  } = registerData;

  const registerUser = async () => {
    try {
      const url = `${BASE_URL}register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleResponse(success, message);
        setTimeout(() => {
          navigate("/login");
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
    const isValidPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      );

    if (password && !isValidPassword) {
      toast.warning("Please follow the password rules and try again!");
      return;
    }
    registerUser();
  };

  return (
    <>
      <div className="row justify-content-center div-center-reg">
        <div className="col-xl-4 col-lg-6 col-md-6 col-12">
          <div className="div-design">
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-4 icon-render">
                <Header heading={"Create an Account"} />
                <MdCreateNewFolder size={30} />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  aria-describedby="firstName"
                  placeholder="Enter FirstName ... "
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  aria-describedby="lastName"
                  placeholder="Enter LastName ... "
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  aria-describedby="email"
                  placeholder="Enter Email Id ... "
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="loginId"
                  name="loginId"
                  value={loginId}
                  onChange={handleChange}
                  aria-describedby="loginId"
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
                  autoComplete="passowrd"
                />
              </div>

              <div className="my-4 text-center">
                {rules?.map((rule, i) => {
                  const isValid = rule.test(password);
                  return (
                    <div
                      key={i}
                      className={`${
                        isValid ? "text-success" : "text-danger"
                      } fw-bold`}
                    >
                      {rule.label}
                    </div>
                  );
                })}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter Confirm Password ... "
                  autoComplete="new-password"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="contactNo"
                  name="contactNo"
                  value={contactNo}
                  onChange={handleChange}
                  aria-describedby="contactNo"
                  placeholder="Enter Contact No ... "
                />
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-dark">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
