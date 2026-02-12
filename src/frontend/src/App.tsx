import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.tsx';
import Register from './components/Register.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<div style={{textAlign: 'center', padding: '50px'}}><h1>Welcome to Job Portal</h1><a href="/login">Login</a> | <a href="/register">Register</a></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
