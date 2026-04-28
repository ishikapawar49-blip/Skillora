import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
});

// Handle input changes
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

// SIGNUP
const handleSignup = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Signup Success ✅");
      window.location.href = "/"; // homepage
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// LOGIN
const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Login Success ✅");
      window.location.href = "/";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  const token = localStorage.getItem("userToken");

  if (token) {
    navigate("/");
  }
}, [navigate]);

  return (
    <div className="auth-container">
      
      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="logo">
          <span>Skillora</span>
        </div>

        <div className="left-content">
          <h1>Expert services at your fingertips</h1>
          <p>
            Join 50,000+ customers who trust Skillora for their home and
            personal service needs.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">

        {!isSignup ? (
          <>
            <h2>Welcome back</h2>
            <p className="subtitle">
              Sign in to your account to continue
            </p>

            <div className="input-group">
             <input type="email" name="email" placeholder="Email address" onChange={handleChange} />
            </div>

            <div className="input-group">
              <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            </div>

            <p className="forgot">Forgot password?</p>

            <button className="main-btn" onClick={handleLogin}>
              Sign In →
            </button>

            <div className="divider">
              <span></span>
              <p>or continue with</p>
              <span></span>
            </div>

<div className="social-login">
  <button className="social-btn google">Google</button>
  <button className="social-btn apple">Apple</button>
</div>

            <p className="bottom-text">
              Don't have an account?
              <span onClick={() => setIsSignup(true)}> Sign up</span>
            </p>
          </>
        ) : (
          <>
            <h2>Create account</h2>
            <p className="subtitle">
              Start booking services today
            </p>

            <div className="input-group">
              <input type="text" name="name" placeholder="Full name" onChange={handleChange} />
            </div>

            <div className="input-group">
              <input type="email" name="email" placeholder="Email address" onChange={handleChange} />
            </div>

            <div className="input-group">
              <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            </div>

            <button className="main-btn"onClick={handleSignup}>
              Create Account →
            </button>

            <div className="divider">
              <span></span>
              <p>or continue with</p>
              <span></span>
            </div>

<div className="social-login">
  <button className="social-btn google">Google</button>
  <button className="social-btn apple">Apple</button>
</div>

            <p className="bottom-text">
              Already have an account?
              <span onClick={() => setIsSignup(false)}> Sign in</span>
            </p>
          </>
        )}

      </div>
    </div>
  );
};

export default AuthPage;