import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./data/data";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
axios.defaults.baseURL = baseURL;
import Home from "./screens/home";
import Login from './screens/login';
import { useEffect } from "react";
import services from "./data/services";

const VotingMain = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const current_token = services.getCurrentUserToken();
    setToken(current_token);
  }, [token]);

  return (
    <Router>
      <Routes>
        {token === null ? (
          <Route path="/" element={<Login />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
      </Routes>
    </Router>
  );
};

export default VotingMain;
