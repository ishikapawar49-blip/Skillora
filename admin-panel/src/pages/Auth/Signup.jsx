import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiPhone,
  FiUser,
} from "react-icons/fi";

import { FaStore } from "react-icons/fa";

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
`${import.meta.env.VITE_API_URL}/api/vendor/register`,
{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    ownerName: name,
    email,
    phone,
    password
  }),

}
      );

      const data = await res.json();

      if (res.ok) {

        alert("Signup Successful 🔥");
        navigate("/");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);
      alert("Error");

    }

  };

  return (

<div className="login-container">

<div className="login-card">

{/* ICON */}

<div className="login-icon">
  <FaStore />
</div>

{/* TITLE */}

<h2>Vendor Signup</h2>

<p className="subtitle">
Create your professional vendor account
</p>


{/* FORM */}

<form onSubmit={handleSignup}>

<label>Full Name</label>

<div className="input-box">

<input
type="text"
placeholder="Enter your full name"
required
onChange={(e) => setName(e.target.value)}
/>

</div>


<label>Email</label>

<div className="input-box">

<input
type="email"
placeholder="Enter your email"
required
onChange={(e) => setEmail(e.target.value)}
/>

</div>


<label>Phone Number</label>

<div className="input-box">

<input
type="text"
placeholder="Enter your phone number"
required
onChange={(e) => setPhone(e.target.value)}
/>

</div>


<label>Password</label>

<div className="input-box">

<input
type="password"
placeholder="Create password"
required
onChange={(e) => setPassword(e.target.value)}
/>

</div>

<button className="login-btn">
Create Vendor Account
</button>

</form>


<p className="signup">

Already have an account?{" "}

<span onClick={() => navigate("/")}>
Login
</span>

</p>

</div>

</div>

  );

}