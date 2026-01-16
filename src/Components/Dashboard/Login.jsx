import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // HARDCODED CREDENTIALS (Simple for Freshers)
    if (creds.username === "admin" && creds.password === "algo123") {
      // Save "token" to session storage
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-5 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Algo Dashboard</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            onChange={(e) => setCreds({ ...creds, username: e.target.value })}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
          />
          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;