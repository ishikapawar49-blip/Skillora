import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/vendor/register", {
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
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup Successful 🔥");
        navigate("/"); // back to login
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
        <h2>Vendor Signup</h2>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}