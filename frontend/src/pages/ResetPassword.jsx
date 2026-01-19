import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { handleError, handleResponse } from "../utils/helper";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MdOutlineResetTv } from "react-icons/md";

const ResetPassword = () => {
  const { getUserDetails } = useContext(AppContext);
  const navigate = useNavigate();
  const [resetPasswordData, setResetPasswordData] = useState({
    loginId: "",
    password: "",
    confirmPassword: "",
  });

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

  const resetPassword = async () => {
    try {
      const url = `${BASE_URL}reset-password`;
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetPasswordData),
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
    resetPassword();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyData = { ...resetPasswordData };
    copyData[name] = value;
    setResetPasswordData(copyData);
  };

  const { loginId, password, confirmPassword } = resetPasswordData;

  return (
    <>
      <div className="row justify-content-center div-center">
        <div className="col-xl-4 col-lg-6 col-md-6 col-11">
          <div className="div-design">
            <form onSubmit={handleSubmit}>
              <div className="text-center icon-render mb-4">
                <Header heading={"Reset Password"} />
                <MdOutlineResetTv size={30} />
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
                  autoComplete="confirmPassword"
                />
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-dark">Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
