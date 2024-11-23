import React, { useState } from "react";
import OtpInput from "./OtpInput";
import "./PhoneLogin.css";
import toast from "react-hot-toast";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtp, setshowOtp] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };



  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    // Phone validation here
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      toast.error("Invalid phone number");
      return;
    }else{
      toast.success("OTP Send Successfully");
    }

    // Call backend API here
    // Show OTP input
    setshowOtp(true);
  };

  const onOtpSubmit = (otp) => {
    console.log("Login successful", otp);
  };

  return (
    <div className="phone-login-container">
    <h1>Login With Phone</h1>
      {!showOtp ? (
        <div className="phone-form-container">
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              placeholder="Enter phone number"
              className="phone-input"
            />
            <button
              type="submit"
              className="phone-submit-button"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="otp-container">
          <p className="otp-text">Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneLogin;
