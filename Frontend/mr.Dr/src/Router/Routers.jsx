// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Doctor from "../Pages/Doctor";
import DoctorDetail from "../Pages/DoctorDetail";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Contact from "../Pages/Contact";
import Services from "../Pages/Services";
import ChangePassword from "../Pages/ChangePassword";
import MyAccount from '../Dashboard/user-account/MyAccount';
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./protectedRoutes";
const routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>} />
      <Route path="/doctor" element={<Doctor/>} />
      <Route path="/doctor/:id" element={<DoctorDetail/>} />
      <Route path="/user/profile" element={<ProtectedRoute allowedRoles={['patient']}><MyAccount/></ProtectedRoute>} />
      <Route path="/doctor/profile" element={<ProtectedRoute allowedRoles={['doctor']} ><Dashboard/></ProtectedRoute>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/services" element={<Services/>} />
      <Route path="/change-password" element={<ChangePassword/>} />
    </Routes>
  );
}

export default routers