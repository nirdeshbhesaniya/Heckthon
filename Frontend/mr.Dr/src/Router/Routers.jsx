// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Doctor from "../Pages/Doctor";
import DoctorDetail from "../Pages/DoctorDetail";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Contact from "../Pages/Contact";
import Services from "../Pages/Services";

const routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/doctor" element={<Doctor/>} />
      <Route path="/doctor/:id" element={<DoctorDetail/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/services" element={<Services/>} />
    </Routes>
  );
}

export default routers