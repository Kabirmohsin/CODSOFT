import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 👈 ye zaruri hai

const RegisterPage = () => {
  const [name, setName] = useState(""); // 👈 name bhi chahiye backend ke liye
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful!");
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister} className="login-form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="login-btn">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
