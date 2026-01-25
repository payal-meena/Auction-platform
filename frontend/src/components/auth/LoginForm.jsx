import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ important

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
  "http://localhost:3000/api/users/login",
  { email, password },
  {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true, // only if your backend sets cookies
  }
);

    
      // ✅ context login
      login(response.data);

      setMessage("Login successful!");
      navigate("/dashboard"); // or /profile
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="w-full space-y-8" onSubmit={handleSubmit}>
      <div className="flex flex-col w-full group">
        <label className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-1 ml-1">
          Email Address
        </label>
        <input
          className="w-full bg-transparent border-0 border-b border-white/10 text-white py-3 px-1"
          type="email"
          placeholder="alex@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col w-full group">
        <label className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold ml-1">
          Password
        </label>
        <input
          className="w-full bg-transparent border-0 border-b border-white/10 text-white py-3 px-1"
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {message && (
        <p className="text-center text-sm text-white/70">{message}</p>
      )}

      <button
        className="w-full bg-primary h-14 rounded-full font-extrabold"
        type="submit"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
