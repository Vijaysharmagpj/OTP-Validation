import React from "react";
import "./Dashboard.css"; 

const Dashboard = () => {
  return (
    <>
      <div className="gif-container">
      <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Your OTP has been verified successfully!</p>
      </div>
        <div>
        <img
          src={`${process.env.PUBLIC_URL}/3-Checking-Hero.gif`} 
          alt="Success Animation"
          className="gif-image"
        />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
