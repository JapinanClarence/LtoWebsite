import React, { useLayoutEffect, useState } from "react";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  return (
    <div className="p-4">
      <section className="text-3xl font-bold">Home</section>
    </div>
  );
};

export default HomePage;
