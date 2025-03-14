import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const DriverProfile = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();
  const fetchDriver = async () => {
    try {
      const { data } = await apiClient.get(`/driver/67d38affd914d77c3e405a33`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      const statusCode = error.response.status;

      if (statusCode) {
        navigate("/404");
      }
    }
  };
  useEffect(() => {
    fetchDriver();
  }, []);
  return <div></div>;
};

export default DriverProfile;
