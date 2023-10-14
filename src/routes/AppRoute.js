import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "../components/ManageUser";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/Login";
import NavHeader from "../components/Nav/NavHeader";
import Role from "../components/Role";
import GroupRole from "../components/GroupRole";
import Home from "../components/Home/Home";
export default function AppRoute() {
  return (
    <BrowserRouter>
      <NavHeader />
      <Routes>
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/roles"
          element={
            <PrivateRoute>
              <Role />
            </PrivateRoute>
          }
        />
        <Route
          path="/group-role"
          element={
            <PrivateRoute>
              <GroupRole />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*">404 not found</Route>
      </Routes>

      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  );
}
