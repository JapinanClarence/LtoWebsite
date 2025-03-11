"use client";
import { Outlet } from "react-router-dom";
import React from "react";
import  Header  from "../components/nav/Header";

const DashboardLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
    </>
  );
};

export default DashboardLayout;
