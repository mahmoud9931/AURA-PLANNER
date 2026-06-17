import React, { useState } from "react";
import "./SignUp.css";
import signupImg from "../../assets/signup-img.png";
import logo from "../../assets/logo-signup.jpg";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
    const response = await fetch("/api/auth/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name:userName,
    email,
    password,
  }),
});
      

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        await showSuccess("Sign Up Successful!");
        navigate("/login");
      } else {
        showError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      showError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="signup-box">
        
        <div className="image-section">
          <img src={signupImg} alt="Wedding" className="side-image" />
        </div>

        <div className="form-section">
          <img src={logo} alt="logo" className="form-logo" />

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

          <p
            className="have-account"
            onClick={() => navigate("/login")}
          >
            Already have an account?
          </p>

          <button
            className="signup-btn"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default SignUp;