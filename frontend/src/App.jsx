import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Logout from "./components/Logout";
import MyTickets from "./pages/MyTickets";
import ResetPassword from "./pages/ResetPassword";
import Admin from "./pages/Admin";
import BookSeats from "./pages/BookSeats";
import AllTickets from "./pages/AllTickets";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/book/:id" element={<BookSeats />} />
        <Route path="/all-tickets" element={<AllTickets />} />
      </Routes>
    </>
  );
};

export default App;
