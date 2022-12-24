import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Category from "./components/Category";
import Products from "./components/Products";
import Expense from "./components/Expense";
import OtherIncome from "./components/OtherIncome";
import Purchase from "./components/Purchase";
import Sales from "./components/Sales";
import authService,{API_URL} from "./services/auth.service";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import "./main.css";
import { Container } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import LoadingContext from "./context/LoadingContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PICTURE } from "../assets/assets";
const queryClient = new QueryClient();
const token = authService.getCurrentUserToken();
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common = {
  Authorization: `Token ${token}`,
};
const MobilePOS = () => {
  useEffect(() => {
    const token = authService.getCurrentUserToken();
    
    axios.defaults.headers.common = {
      Authorization: `Token ${token}`,
    };
  }, []);

  console.log("render form main");

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading");

  const loadingvalue = useMemo(
    () => ({ loading, setLoading, loadingText, setLoadingText }),
    [loading, setLoading, loadingText, setLoadingText]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingContext.Provider value={loadingvalue}>
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
                width: "100vw",
                overflow: "auto",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/category" element={<Category />} />
                <Route path="/product" element={<Products />} />
                <Route path="/expense" element={<Expense />} />
                    <Route path="/otherincome" element={<OtherIncome />} />
                     <Route path="/purchase" element={<Purchase />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </Router>
        {loading ? (
          <div className="uni_loading">
            <div>
              <img src={PICTURE.loading} />
              <h6>{loadingText}</h6>
            </div>
          </div>
        ) : null}
      </LoadingContext.Provider>
    </QueryClientProvider>
  );
};

export default MobilePOS;
