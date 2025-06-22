// frontend/src/AuthPage.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const navigate = useNavigate()

  const handleSubmit = async (e : any) => {
    
    e.preventDefault();
    const url = `http://localhost:5000/api/auth/${mode}`;
    try {
      const res = await axios.post(url, { username, password });
      if (mode === "login") {
        localStorage.setItem("token", res.data.token);
        alert("Logged in!");
        navigate("/", { replace: true });
      } else {
        alert("Account created!");
        setMode("login");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error occurred");
    }
  };

  return (<div className='login-route'>
    <div className="container">
      <h1 className="heading">{mode === "login" ? "Login" : "Signup"}</h1>
      <form onSubmit={handleSubmit}className='form' >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
          </div>
          <div className='input-container'>
            <label htmlFor='username' className='label'>
              USERNAME
            </label>
            <br />
            <input
              type='text'
              id='username'
              className='input'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='input-container'>
            <label htmlFor='password' className='label'>
              PASSWORD
            </label>
            <br />
            <input
              type='password'
              id='password'
              className='input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
    
        <button type="submit" className='login-btn'>{mode === "login" ? "Login" : "Signup"}</button>
      </form>
      <button className="switch-btn" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        Switch to {mode === "login" ? "Signup" : "Login"}
      </button>
    </div></div>
  );
};

export default AuthPage;
