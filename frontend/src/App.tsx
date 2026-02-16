import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/home';
import AdminDashboard from './components/AdminDashboard';
import SavedJobs from './components/SavedJobs';
import './App.css';

function App() {
  return (
  
        <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
        </Routes>
      </div>
    </Router>
    
    
  );
}

export default App;
