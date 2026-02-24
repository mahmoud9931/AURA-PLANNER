import React, { useState } from "react";
import "./SignUp.css";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(value);
  };

  const showError = (msg) => {
    MySwal.fire({
      title: "Error",
      text: msg,
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const showSuccess = (msg) => {
    return MySwal.fire({
      title: "Success",
      text: msg,
      icon: "success",
      confirmButtonText: "Continue",
    });
  };

  const handleSignUp = async () => {
    if (!userName || !email || !password) {
      return showError("Please fill all fields");
    }

    if (!validateEmail(email)) {
      return showError("Invalid email format");
    }

    if (password.length < 8) {
      return showError("Password must be at least 8 characters");
    }

    if (!role) {
      return showError("Please select a role");
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      showSuccess("Sign Up Successful!").then(() => {

        setTimeout(() => {
          navigate('/')
        }, 1000);
      });
    } catch (err) {
      showError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="page-container">
      <div className="signup-box">
        <div className="image-section">
          <img src='/src/assets/signup-img.png' alt="Wedding" className="side-image" />
        </div>

        <div className="form-section">
          <img src='/src/assets/logo-signup.jpg' alt="logo" className="form-logo" />
          <h2 className="form-title">SIGN UP</h2>

          <div className="input-group">
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="role-options">
            <label>
              <input
                type="radio"
                name="role"
                value="client"
                checked={role === "client"}
                onChange={(e) => setRole(e.target.value)}
              />
              client
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="planner"
                checked={role === "planner"}
                onChange={(e) => setRole(e.target.value)}
              />
              planner
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              Admin
            </label>
          </div>

          <p
            className="have-account"
            onClick={() => (window.location.href = "/login")}
          >
            Already have an account?
          </p>

          <button className="signup-btn" onClick={handleSignUp}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;