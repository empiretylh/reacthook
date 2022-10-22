import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import authService from "./services/auth.service";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();
const MobilePOS = () => {
  useEffect(() => {
    const token = authService.getCurrentUserToken();
    axios.defaults.baseURL = "http://192.168.43.247:8000";
    axios.defaults.headers.common = {
      Authorization: `Token ${token}`,
    };
  }, []);

  console.log("render form main");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <div>
          <h1>MobilePOS Dashboard</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default MobilePOS;
