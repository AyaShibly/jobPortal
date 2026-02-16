import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./savedJobs.css";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
  type: string;
  status: string;
}

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setIsLoggedIn(true);
    fetchSavedJobs();
  }, [navigate]);

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users/saved-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedJobs(res.data.savedJobs || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setLoading(false);
    }
  };

  const handleUnsaveJob = async (jobId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}/save`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove job from the list
      setSavedJobs(savedJobs.filter(job => job._id !== jobId));
    } catch (error: any) {
      console.error('Error removing job:', error);
      alert(error.response?.data?.message || 'Error removing job');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="saved-jobs-container">
      {/* Background blur animation */}
      <div className="bg-blur blur1"></div>
      <div className="bg-blur blur2"></div>
      <div className="bg-blur blur3"></div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">JP</div>
          <span className="logo-text">JobPortal</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="/#jobs">Jobs</a>
          <a href="/#categories">Categories</a>
          <a href="/#about">About</a>
          {isLoggedIn && <Link to="/saved-jobs">Saved Jobs</Link>}
          {isLoggedIn && <Link to="/admin">Admin</Link>}
        </div>

        <div className="nav-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-login">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <section className="saved-jobs-section">
        <h1 className="page-title">
          My Saved <span>Jobs</span>
        </h1>
        <p className="page-subtitle">
          Jobs you've bookmarked for later review
        </p>

        {loading ? (
          <div className="loading-message">Loading your saved jobs...</div>
        ) : savedJobs.length > 0 ? (
          <div className="jobs-grid">
            {savedJobs.map((job) => (
              <div className="job-card" key={job._id}>
                <div className="job-card-header">
                  <h3>{job.title}</h3>
                  <button 
                    className="bookmark-btn saved"
                    onClick={() => handleUnsaveJob(job._id)}
                    title="Remove from saved"
                  >
                    🔖
                  </button>
                </div>
                <p className="company-name">🏢 {job.company}</p>
                <p className="job-location">📍 {job.location}</p>
                {job.description && (
                  <p className="job-description">{job.description.substring(0, 120)}...</p>
                )}
                <div className="job-details-section">
                  <span className="job-type">{job.type}</span>
                  <p className="job-salary">💰 ${job.salary.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔖</div>
            <h2>No Saved Jobs Yet</h2>
            <p>Start exploring jobs and save the ones you're interested in!</p>
            <Link to="/" className="btn-primary">
              Browse Jobs
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 JobPortal. All rights reserved.</p>
      </footer>
    </div>
  );
}
