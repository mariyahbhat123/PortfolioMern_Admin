import React from "react";
import HomePortfolio from "../display/HomePortfolio";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPortfolio from "../display/Login/LoginPortfolio";

export default function PortFolioAdminRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPortfolio />} />
          <Route path="/dashboard" element={<HomePortfolio />} />
        </Routes>
      </Router>
    </div>
  );
}
