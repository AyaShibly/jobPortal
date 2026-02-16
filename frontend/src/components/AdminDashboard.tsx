import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.css';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'open' | 'closed';
  requirements: string[];
}

interface Candidate {
  _id: string;
  name: string;
  email: string;
  phone: string;
  resume?: string;
  skills: string[];
  experience: number;
}

interface Application {
  _id: string;
  candidateId: { _id: string; name: string; email: string };
  jobId: { _id: string; title: string; company: string };
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  coverLetter?: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'jobs' | 'candidates' | 'applications' | 'saved-jobs'>('overview');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'job' | 'candidate'>('job');
  const [editItem, setEditItem] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem('token');
  const axiosConfig = { headers: { Authorization: `Bearer ${getToken()}` } };

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Fetch all data
  useEffect(() => {
    fetchJobs();
    fetchCandidates();
    fetchApplications();
    fetchSavedJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/candidates');
      setCandidates(res.data.candidates || []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/applications', axiosConfig);
      setApplications(res.data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get('http://localhost:5000/api/users/saved-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSavedJobs(res.data.savedJobs || []);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  // Calculate stats
  const stats = {
    totalJobs: jobs.length,
    openJobs: jobs.filter(j => j.status === 'open').length,
    totalCandidates: candidates.length,
    totalApplications: applications.length,
    pendingApplications: applications.filter(a => a.status === 'pending').length,
    reviewedApplications: applications.filter(a => a.status === 'reviewed').length,
  };

  // Handle delete
  const handleDelete = async (type: 'job' | 'candidate' | 'application', id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      await axios.delete(`http://localhost:5000/api/${type === 'job' ? 'jobs' : type === 'candidate' ? 'candidates' : 'applications'}/${id}`, axiosConfig);
      
      if (type === 'job') fetchJobs();
      else if (type === 'candidate') fetchCandidates();
      else fetchApplications();
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  // Handle status change for applications
  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/api/applications/${appId}`, { status: newStatus }, axiosConfig);
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {};

    formData.forEach((value, key) => {
      if (key === 'requirements' || key === 'skills') {
        data[key] = value.toString().split(',').map(item => item.trim()).filter(Boolean);
      } else if (key === 'salary' || key === 'experience') {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    });

    try {
      const endpoint = modalType === 'job' ? 'jobs' : 'candidates';
      
      if (editItem) {
        await axios.put(`http://localhost:5000/api/${endpoint}/${editItem._id}`, data, axiosConfig);
      } else {
        await axios.post(`http://localhost:5000/api/${endpoint}`, data, axiosConfig);
      }

      setShowModal(false);
      setEditItem(null);
      
      if (modalType === 'job') fetchJobs();
      else fetchCandidates();
    } catch (error: any) {
      alert('Failed to save: ' + (error.response?.data?.message || error.message));
    }
  };

  const openModal = (type: 'job' | 'candidate', item: any = null) => {
    setModalType(type);
    setEditItem(item);
    setShowModal(true);
  };

  return (
    <div className="admin-dashboard">
      {/* Background Blur */}
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
          <Link to="/saved-jobs">Saved Jobs</Link>
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

      {/* Header */}
      <header className="admin-header">
        <h1>📊 Admin Dashboard</h1>
        <p className="admin-subtitle">Manage your job portal efficiently</p>
      </header>

      {/* Navigation */}
      <nav className="admin-nav">
        <button 
          className={activeSection === 'overview' ? 'active' : ''}
          onClick={() => setActiveSection('overview')}
        >
          📈 Overview
        </button>
        <button 
          className={activeSection === 'jobs' ? 'active' : ''}
          onClick={() => setActiveSection('jobs')}
        >
          💼 Jobs
        </button>
        <button 
          className={activeSection === 'candidates' ? 'active' : ''}
          onClick={() => setActiveSection('candidates')}
        >
          👥 Candidates
        </button>
        <button 
          className={activeSection === 'applications' ? 'active' : ''}
          onClick={() => setActiveSection('applications')}
        >
          📋 Applications
        </button>
        <button 
          className={activeSection === 'saved-jobs' ? 'active' : ''}
          onClick={() => setActiveSection('saved-jobs')}
        >
          🔖 Saved Jobs
        </button>
      </nav>

      {/* Main Content */}
      <main className="admin-content">
        
        {/* OVERVIEW SECTION */}
        {activeSection === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card stat-purple">
                <div className="stat-icon">💼</div>
                <div className="stat-info">
                  <h3>{stats.totalJobs}</h3>
                  <p>Total Jobs</p>
                </div>
                <div className="stat-detail">{stats.openJobs} Open</div>
              </div>

              <div className="stat-card stat-blue">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>{stats.totalCandidates}</h3>
                  <p>Total Candidates</p>
                </div>
                <div className="stat-detail">Active Pool</div>
              </div>

              <div className="stat-card stat-green">
                <div className="stat-icon">📋</div>
                <div className="stat-info">
                  <h3>{stats.totalApplications}</h3>
                  <p>Applications</p>
                </div>
                <div className="stat-detail">{stats.pendingApplications} Pending</div>
              </div>

              <div className="stat-card stat-orange">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <h3>{stats.reviewedApplications}</h3>
                  <p>Under Review</p>
                </div>
                <div className="stat-detail">Need Action</div>
              </div>
            </div>

            <div className="quick-actions">
              <h2>🚀 Quick Actions</h2>
              <div className="action-grid">
                <button className="action-btn" onClick={() => openModal('job')}>
                  <span>➕</span>
                  <div>
                    <strong>Post New Job</strong>
                    <small>Create a new job listing</small>
                  </div>
                </button>
                <button className="action-btn" onClick={() => openModal('candidate')}>
                  <span>👤</span>
                  <div>
                    <strong>Add Candidate</strong>
                    <small>Register new candidate</small>
                  </div>
                </button>
                <button className="action-btn" onClick={() => setActiveSection('applications')}>
                  <span>🔍</span>
                  <div>
                    <strong>Review Applications</strong>
                    <small>{stats.pendingApplications} waiting</small>
                  </div>
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h2>📌 Recent Applications</h2>
              <div className="activity-list">
                {applications.slice(0, 5).filter(app => app.candidateId && app.jobId && typeof app.candidateId === 'object' && typeof app.jobId === 'object').map((app) => (
                  <div key={app._id} className="activity-item">
                    <div className="activity-avatar">{app.candidateId?.name?.charAt(0) || '?'}</div>
                    <div className="activity-details">
                      <strong>{app.candidateId?.name || 'Unknown'}</strong>
                      <p>Applied for {app.jobId?.title || 'Unknown Position'} at {app.jobId?.company || 'Unknown Company'}</p>
                      <small>{new Date(app.createdAt).toLocaleDateString()}</small>
                    </div>
                    <span className={`status-badge status-${app.status}`}>{app.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* JOBS SECTION */}
        {activeSection === 'jobs' && (
          <div className="section-container">
            <div className="section-header">
              <h2>💼 Job Management</h2>
              <button className="btn-primary" onClick={() => openModal('job')}>
                ➕ Add New Job
              </button>
            </div>

            <div className="cards-grid">
              {jobs.map((job) => (
                <div key={job._id} className="job-card-item">
                  <div className="card-header">
                    <h3>{job.title}</h3>
                    <span className={`badge badge-${job.status}`}>{job.status}</span>
                  </div>
                  <p className="company">🏢 {job.company}</p>
                  <p className="location">📍 {job.location}</p>
                  <p className="salary">💰 ${job.salary.toLocaleString()}/year</p>
                  <p className="type">⏰ {job.type}</p>
                  <div className="card-actions">
                    <button className="btn-edit" onClick={() => openModal('job', job)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete('job', job._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CANDIDATES SECTION */}
        {activeSection === 'candidates' && (
          <div className="section-container">
            <div className="section-header">
              <h2>👥 Candidate Management</h2>
              <button className="btn-primary" onClick={() => openModal('candidate')}>
                ➕ Add Candidate
              </button>
            </div>

            <div className="cards-grid">
              {candidates.map((candidate) => (
                <div key={candidate._id} className="candidate-card-item">
                  <div className="candidate-avatar">{candidate.name.charAt(0)}</div>
                  <h3>{candidate.name}</h3>
                  <p className="email">📧 {candidate.email}</p>
                  <p className="phone">📱 {candidate.phone}</p>
                  <p className="experience">💼 {candidate.experience} years experience</p>
                  <div className="skills-tags">
                    {candidate.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <div className="card-actions">
                    <button className="btn-edit" onClick={() => openModal('candidate', candidate)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete('candidate', candidate._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPLICATIONS SECTION */}
        {activeSection === 'applications' && (
          <div className="section-container">
            <div className="section-header">
              <h2>📋 Application Management</h2>
              <p className="section-subtitle">{stats.pendingApplications} applications pending review</p>
            </div>

            <div className="table-wrapper">
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Job Position</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.filter(app => app.candidateId && app.jobId && typeof app.candidateId === 'object' && typeof app.jobId === 'object').map((app) => (
                    <tr key={app._id}>
                      <td>
                        <div className="candidate-info">
                          <div className="table-avatar">{app.candidateId?.name?.charAt(0) || '?'}</div>
                          <div>
                            <strong>{app.candidateId?.name || 'Unknown'}</strong>
                            <small>{app.candidateId?.email || 'No email'}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>{app.jobId?.title || 'Unknown Position'}</strong>
                        <small>{app.jobId?.company || 'Unknown Company'}</small>
                      </td>
                      <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge status-${app.status}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        <div className="status-actions">
                          <button 
                            className="status-btn"
                            onClick={() => handleStatusChange(app._id, 'pending')}
                            disabled={app.status === 'pending'}
                          >
                            Pending
                          </button>
                          <button 
                            className="status-btn"
                            onClick={() => handleStatusChange(app._id, 'reviewed')}
                            disabled={app.status === 'reviewed'}
                          >
                            Review
                          </button>
                          <button 
                            className="status-btn success"
                            onClick={() => handleStatusChange(app._id, 'accepted')}
                            disabled={app.status === 'accepted'}
                          >
                            Accept
                          </button>
                          <button 
                            className="status-btn danger"
                            onClick={() => handleStatusChange(app._id, 'rejected')}
                            disabled={app.status === 'rejected'}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SAVED JOBS SECTION */}
        {activeSection === 'saved-jobs' && (
          <div className="section-container">
            <div className="section-header">
              <h2>🔖 My Saved Jobs</h2>
              <p className="section-subtitle">{savedJobs.length} jobs bookmarked</p>
            </div>

            {savedJobs.length > 0 ? (
              <div className="jobs-grid-admin">
                {savedJobs.map((job) => (
                  <div className="job-card-admin" key={job._id}>
                    <div className="job-header-admin">
                      <h3>{job.title}</h3>
                      <span className={`status-badge status-${job.status}`}>{job.status}</span>
                    </div>
                    <p className="company-name">🏢 {job.company}</p>
                    <p className="job-location">📍 {job.location}</p>
                    <p className="job-desc">{job.description.substring(0, 120)}...</p>
                    <div className="job-details-section">
                      <span className="job-type-badge">{job.type}</span>
                      <p className="job-salary">💰 ${job.salary.toLocaleString()}</p>
                    </div>
                    <div className="job-actions">
                      <button 
                        className="btn-view"
                        onClick={() => {
                          // View job details or navigate
                          alert(`Job Details:\n${job.title} at ${job.company}`);
                        }}
                      >
                        👁️ View Details
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem('token');
                            await axios.delete(`http://localhost:5000/api/jobs/${job._id}/save`, {
                              headers: { Authorization: `Bearer ${token}` }
                            });
                            fetchSavedJobs();
                          } catch (error) {
                            console.error('Error removing saved job:', error);
                          }
                        }}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state-admin">
                <div className="empty-icon">🔖</div>
                <h3>No Saved Jobs Yet</h3>
                <p>Browse jobs and bookmark the ones you're interested in!</p>
                <button 
                  className="btn-primary-admin"
                  onClick={() => navigate('/')}
                >
                  Browse Jobs
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); setEditItem(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editItem ? 'Edit' : 'Create'} {modalType === 'job' ? 'Job' : 'Candidate'}</h2>
            
            <form onSubmit={handleSubmit}>
              {modalType === 'job' ? (
                <>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Job Title *</label>
                      <input name="title" defaultValue={editItem?.title} required placeholder="e.g. Senior Developer" />
                    </div>
                    <div className="form-field">
                      <label>Company *</label>
                      <input name="company" defaultValue={editItem?.company} required placeholder="e.g. Google" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Location *</label>
                      <input name="location" defaultValue={editItem?.location} required placeholder="e.g. New York, NY" />
                    </div>
                    <div className="form-field">
                      <label>Salary *</label>
                      <input type="number" name="salary" defaultValue={editItem?.salary} required placeholder="e.g. 120000" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Job Type *</label>
                      <select name="type" defaultValue={editItem?.type} required>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Status *</label>
                      <select name="status" defaultValue={editItem?.status || 'open'}>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Description *</label>
                    <textarea name="description" defaultValue={editItem?.description} required placeholder="Job description..." rows={4} />
                  </div>

                  <div className="form-field">
                    <label>Requirements (comma-separated)</label>
                    <input name="requirements" defaultValue={editItem?.requirements?.join(', ')} placeholder="e.g. React, TypeScript, 3+ years" />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input name="name" defaultValue={editItem?.name} required placeholder="e.g. John Doe" />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Email *</label>
                      <input type="email" name="email" defaultValue={editItem?.email} required placeholder="email@example.com" />
                    </div>
                    <div className="form-field">
                      <label>Phone *</label>
                      <input name="phone" defaultValue={editItem?.phone} required placeholder="+1 234 567 8900" />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Resume URL</label>
                    <input name="resume" defaultValue={editItem?.resume} placeholder="https://..." />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Skills (comma-separated)</label>
                      <input name="skills" defaultValue={editItem?.skills?.join(', ')} placeholder="e.g. JavaScript, Python, SQL" />
                    </div>
                    <div className="form-field">
                      <label>Experience (years)</label>
                      <input type="number" name="experience" defaultValue={editItem?.experience || 0} placeholder="0" />
                    </div>
                  </div>
                </>
              )}

              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  {editItem ? 'Update' : 'Create'}
                </button>
                <button type="button" className="btn-cancel" onClick={() => { setShowModal(false); setEditItem(null); }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
