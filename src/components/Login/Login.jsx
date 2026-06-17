import React, { useState } from "react";
import "./Login.css";
import hero from "../../assets/login-img.png";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // ✅ جديدsw

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
      tempErrors.password = "Password must be at least 8 characters";
    }

    // Role validation
    if (!role) {
      tempErrors.role = "Please select a role";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please enter valid data.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });


      const data = await response.json();

      if (response.ok) {

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
        });

        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', role);
          localStorage.setItem('userName', data.name || data.user?.name || email.split('@')[0]);
          localStorage.setItem('userEmail', email);
          if (data.userId || data.user?._id || data.user?.id) {
            localStorage.setItem('userId', data.userId || data.user?._id || data.user?.id);
          }
        }

        setTimeout(() => {
          navigate('/');
        }, 2000);

      } else {

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid credentials. Please try again.",
        });

      }

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: "Something went wrong. Please try again later.",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="card-image">
          <img src={hero} alt="hero" />


        </div>

        <div className="card-form">
          <img src={logo} alt="logo" className="logo" />

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

            {/* ✅ Role UI */}
            <div className="field">
              <label>Select Role</label>

              <div className="role-options">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="client"
                    checked={role === "client"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Client
                </label>

                <label>
                  <input
                    type="radio"
                    name="role"
                    value="planner"
                    checked={role === "planner"}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Planner
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

              {errors.role && <p className="error">{errors.role}</p>}
            </div>

            <p className="signup">
              Don't have an account?{" "}
              <a onClick={() => (window.location.href = "/signup")}>
                Sign up
              </a>
            </p>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;