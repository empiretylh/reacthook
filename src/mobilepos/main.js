import axios from "axios";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import authService from "./services/auth.service";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import "./main.css";
import { Container } from "react-bootstrap";

const queryClient = new QueryClient();
const token = authService.getCurrentUserToken();
axios.defaults.baseURL = "http://192.168.43.247:8000";
axios.defaults.headers.common = {
  Authorization: `Token ${token}`,
};
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            width: "100vw",
          }}
        >
          <SideBar />
          <main
            style={{
              height: "100vh",
              width:'100vw',
              overflow: "auto",             
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default MobilePOS;
