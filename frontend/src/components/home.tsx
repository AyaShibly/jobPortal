import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  type: string;
  status: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    // Check login status
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    // Fetch saved jobs if logged in
    if (token) {
      fetchSavedJobs();
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      const openJobs = (res.data.jobs || []).filter((job: Job) => job.status === 'open');
      setJobs(openJobs.slice(0, 6)); // Get first 6 open jobs
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users/saved-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const savedIds = res.data.savedJobs.map((job: Job) => job._id);
      setSavedJobIds(savedIds);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const toggleSaveJob = async (jobId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to save jobs');
        navigate('/login');
        return;
      }

      const isSaved = savedJobIds.includes(jobId);
      
      if (isSaved) {
        // Unsave the job
        await axios.delete(`http://localhost:5000/api/jobs/${jobId}/save`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedJobIds(savedJobIds.filter(id => id !== jobId));
      } else {
        // Save the job
        await axios.post(`http://localhost:5000/api/jobs/${jobId}/save`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSavedJobIds([...savedJobIds, jobId]);
      }
    } catch (error: any) {
      console.error('Error toggling save job:', error);
      alert(error.response?.data?.message || 'Error saving job');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="home-container">
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
          <a href="#jobs">Jobs</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
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

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Find Your Next <span>Career</span> <br /> Opportunity
          </h1>

          <p>
            Discover thousands of jobs and connect with top companies hiring
            today. Start your future with JobPortal.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">Find Jobs</button>
            <button className="btn-secondary">Post a Job</button>
          </div>

         
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats">
        <div className="stat-item">
          <h2>2.4M+</h2>
          <p>Active Users</p>
        </div>

        <div className="stat-item">
          <h2>50K+</h2>
          <p>Companies</p>
        </div>

        <div className="stat-item">
          <h2>200K+</h2>
          <p>Jobs Posted</p>
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section id="jobs" className="section">
        <h2 className="section-title">Featured Jobs</h2>
        <p className="section-subtitle">
          Explore the latest job opportunities from top companies.
        </p>

        <div className="jobs-grid">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div className="job-card" key={job._id}>
                <div className="job-card-header">
                  <h3>{job.title}</h3>
                  {isLoggedIn && (
                    <button 
                      className="bookmark-btn"
                      onClick={() => toggleSaveJob(job._id)}
                      title={savedJobIds.includes(job._id) ? "Remove from saved" : "Save job"}
                    >
                      {savedJobIds.includes(job._id) ? '🔖' : '🏷️'}
                    </button>
                  )}
                </div>
                <p className="company-name">🏢 {job.company}</p>
                <p className="job-location">📍 {job.location}</p>
                <div className="job-details-section">
                  <span className="job-type">{job.type}</span>
                  <p className="job-salary">💰 ${job.salary.toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading jobs...</p>
          )}
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="section">
        <h2 className="section-title">Popular Categories</h2>
        <p className="section-subtitle">
          Find jobs by category and explore new career paths.
        </p>

        <div className="categories-grid">
          <div className="category-card"> IT & Software</div>
          <div className="category-card"> Design</div>
          <div className="category-card"> Marketing</div>
          <div className="category-card"> Healthcare</div>
          <div className="category-card"> Education</div>
          <div className="category-card"> Finance</div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section about-section">
        <h2 className="section-title">Why Choose JobPortal?</h2>
        <p className="section-subtitle">
          We help job seekers and employers connect faster and smarter.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3> Fast Hiring</h3>
            <p>Companies can post jobs and hire candidates quickly.</p>
          </div>

          <div className="feature-card">
            <h3> Smart Search</h3>
            <p>Search jobs by title, company, category, and location.</p>
          </div>

          <div className="feature-card">
            <h3> Career Growth</h3>
            <p>Discover new career opportunities and upgrade your skills.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 JobPortal. All rights reserved.</p>
      </footer>
    </div>
  );
}
