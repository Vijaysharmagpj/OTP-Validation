import React from "react";
import PhoneLogin from "./Component/PhoneLogin";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Component/Dashboard";

const App = () => {
  return (
    <>
      <div className="app-container">
        <Toaster/>
        <Router>
      <Routes>
        <Route path="/" element={<PhoneLogin/>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
      </div>
    </>
  );
};

export default App;
