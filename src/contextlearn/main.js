import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Index from "./home";
import About from "./about";
import { UserContext } from "./UserContext";
export default function Approuter() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
 
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <UserContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
    
  );
}
