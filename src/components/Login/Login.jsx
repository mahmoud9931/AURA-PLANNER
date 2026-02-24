import React, { useState } from "react";
import "./Login.css";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let tempErrors = {};

    // Email validation
    if (!email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!password.trim()) {
      tempErrors.password = "Password is required";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);

    // Show SweetAlert for errors
    if (Object.keys(tempErrors).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please enter valid data.",
      });
      return;
    }

    // SUCCESS Swal
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome back!",

    });
    setTimeout(() => {
      navigate('/')
    }, 3000);
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-image">
          <img src="/src/assets/login-img.png" alt="Wedding tables" />
        </div>

        <div className="card-form">
          <img src="/src/assets/logo.png" alt="Logo" className="logo" />

          <h2 className="title">LOG IN</h2>

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <p className="signup">
              Don't have an account? <a onClick={() => (window.location.href = "/signup")}>Sign up</a>
            </p>

            <button className="btn" type="submit">LOG IN</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
