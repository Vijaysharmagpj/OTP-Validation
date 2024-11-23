import React, { useEffect, useRef, useState } from "react";
import "./OtpInput.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OtpInput = ({
  length = 4,
  onOtpSubmit = () => {},
  initialTimer = 30,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [timer, setTimer] = useState(initialTimer);
  const navigate = useNavigate();  
  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); 
    }
  }, [timer]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
    }

    if (newOtp.join("").length === length) {
      onOtpSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleClick=(index)=>{
    inputRef.current[index].setSelectionRange(1,1);
    //optional
    if(index>0 && !otp[index-1]){
      inputRef.current[otp.indexOf("")].focus();
    }
  }

  const handleResendCode = () => {
    setOtp(new Array(length).fill("")); 
    setTimer(initialTimer); 
    toast.success("OTP resent successfully!")
  };

  const handleVerify = () => {
    if (otp.join("").length === length) {
      navigate("/dashboard");
      toast('Good Job!', {
        icon: '👏',
      });
    } else {
      setOtp(new Array(length).fill(""));
      toast.error("Please complete the OTP!");
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify your Phone number</h2>
      <p>Enter your OTP code here</p>
      <div className="otp-input-container">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(input) => (inputRef.current[index] = input)}
            type="text"
            value={value}
            onChange={(event) => handleChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onClick={() => handleClick(index)}
            className="otp-input"
            maxLength="1"
          />
        ))}
      </div>
      <p>
        {timer > 0 ? (
          `Resend code in ${timer}s`
        ) : (
          <span
            className={`resend-link ${timer > 0 ? "disabled" : ""}`}
            onClick={timer === 0 ? handleResendCode : null}
          >
            RESEND NEW CODE
          </span>
        )}
      </p>
      <button className="button" onClick={handleVerify} >Verify</button>
    </div>
  );
};

export default OtpInput;
