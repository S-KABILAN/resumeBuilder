import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GoogleAuth from "./components/GoogleAuth";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GoogleAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
