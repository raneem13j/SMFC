import React, { useState } from "react";
import "./login.css";


function Login() {
  const [isLoginFormShown, setIsLoginFormShown] = useState(true);

  const handleSignupClick = () => {
    setIsLoginFormShown(false);
  };

  const handleLoginClick = () => {
    setIsLoginFormShown(true);
  };

  return (
    <div className="login-all">
    <div className="login-body">
      <div className="login-container">
        <div
          className={`login-slider ${isLoginFormShown ? "" : "movelogin-slider"}`}
        ></div>
        <div className="login-btn">
          <button
            className={`login-login ${isLoginFormShown ? "active" : ""}`}
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className={`login-signup ${isLoginFormShown ? "" : "active"}`}
            onClick={handleSignupClick}
          >
            Signup
          </button>
        </div>

        <div className={`login-form-section ${isLoginFormShown ? "" : "login-form-section-move"}`}>
          <div className="login-login-box">
            <input
              type="email"
              className="login-email ele"
              placeholder="youremail@email.com"
            />
            <input
              type="password"
              className="login-password ele"
              placeholder="password"
            />
            <button className="login-clkbtn">Login</button>
          </div>

          <div className="login-signup-box">
            <input
              type="text"
              className="login-name ele"
              placeholder="Enter your name"
            />
            <input
              type="email"
              className="login-email ele"
              placeholder="youremail@email.com"
            />
            <input
              type="password"
              className="login-password ele"
              placeholder="password"
            />
            {/* <input
              type="password"
              className="login-password ele"
              placeholder="Confirm password"
            /> */}
            <button className="login-clkbtn">Signup</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
