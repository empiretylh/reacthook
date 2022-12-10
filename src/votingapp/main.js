import React,{useState} from "react";
import axios from "axios";
import { baseURL } from "./data/data";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
axios.defaults.baseURL = baseURL;
import Home from "./screens/home";


const VotingMain = () => {
    
    const [token,setToken] = useState()


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default VotingMain;
