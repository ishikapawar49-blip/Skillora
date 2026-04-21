import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaStore, FaShieldAlt } from "react-icons/fa";


export default function Login() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 🔥 LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const url =
  role === "admin"
    ? "http://localhost:5000/api/admin/login"
    : "http://localhost:5000/api/vendor/login";

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});

       const data = await res.json();

if (res.ok) {
  alert("Login Successful 🔥");

  if (role === "admin") {
    localStorage.setItem("adminToken", data.token);
    navigate("/admin");
  } else {
    localStorage.setItem("vendorToken", data.token);
    navigate("/vendor");
  }

} else {
  alert(data.message);
}
 } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
}; 
  
  return (
    <div className="login-container">
      <div className="login-card">

        {/* ICON */}
        <div className="login-icon">
          {role === "admin" ? <FaShieldAlt /> : <FaStore />}
        </div>

        {/* TITLE */}
        <h2>{role === "admin" ? "Admin Login" : "Vendor Login"}</h2>
        <p className="subtitle">
          Sign in to your {role} dashboard
        </p>

        {/* TOGGLE */}
        <div className="toggle">
          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            <FaShieldAlt /> Admin
          </button>

          <button
            className={role === "vendor" ? "active" : ""}
            onClick={() => setRole("vendor")}
          >
            <FaStore /> Vendor
          </button>
        </div>

        {/* GOOGLE */}
        <button className="google-btn">
          <FcGoogle /> Continue with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* FORM */}
       <form onSubmit={handleLogin}>
          <label>Email</label>
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password-row">
            <label>Password</label>
            <span className="forgot">Forgot password?</span>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn">
            Sign In as {role === "admin" ? "Admin" : "Vendor"}
          </button>
        </form>

        <p className="signup">
  Don’t have an account?{" "}
  <span onClick={() => navigate("/signup")}>Sign up</span>
</p>
      </div>
    </div>
  );
    }