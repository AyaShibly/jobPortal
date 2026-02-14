import React, { useState, useEffect, useCallback } from 'react';
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
  const [activeTab, setActiveTab] = useState<'jobs' | 'candidates' | 'applications'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  const [currentItem, setCurrentItem] = useState<any>(null);

  const getToken = () => localStorage.getItem('token');

  const axiosConfig = useCallback(() => ({
    headers: { Authorization: `Bearer ${getToken()}` }
  }), []);

  const fetchData = useCallback(async () => {
    try {
      const config = axiosConfig();
      
      if (activeTab === 'jobs') {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data.jobs || []);
      } else if (activeTab === 'candidates') {
        const res = await axios.get('http://localhost:5000/api/candidates');
        setCandidates(res.data.candidates || []);
      } else if (activeTab === 'applications') {
        const res = await axios.get('http://localhost:5000/api/applications', config);
        setApplications(res.data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [activeTab, axiosConfig]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = () => {
    setModalType('create');
    setCurrentItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setModalType('edit');
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const config = axiosConfig();
      const endpoint = `http://localhost:5000/api/${activeTab}/${id}`;
      await axios.delete(endpoint, config);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const config = axiosConfig();
      await axios.put(
        `http://localhost:5000/api/applications/${applicationId}`,
        { status: newStatus },
        config
      );
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

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
      const config = axiosConfig();
      if (modalType === 'create') {
        await axios.post(`http://localhost:5000/api/${activeTab}`, data, config);
      } else {
        await axios.put(`http://localhost:5000/api/${activeTab}/${currentItem._id}`, data, config);
      }
      setShowModal(false);
      fetchData();
    } catch (error: any) {
      console.error('Error saving item:', error.response?.data || error.message);
      alert('Failed to save item: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="floating-blur blur-1"></div>
      <div className="floating-blur blur-2"></div>
      
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'jobs' ? 'active' : ''}
          onClick={() => setActiveTab('jobs')}
        >
          Jobs
        </button>
        <button
          className={activeTab === 'candidates' ? 'active' : ''}
          onClick={() => setActiveTab('candidates')}
        >
          Candidates
        </button>
        <button
          className={activeTab === 'applications' ? 'active' : ''}
          onClick={() => setActiveTab('applications')}
        >
          Applications
        </button>
      </div>

      <div className="admin-content">
        <button className="btn-create" onClick={handleCreate}>
          Create New {activeTab.slice(0, -1)}
        </button>

        <div className="data-table">
          {activeTab === 'jobs' && (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Salary</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>${job.salary.toLocaleString()}</td>
                    <td><span className="badge">{job.type}</span></td>
                    <td><span className={`badge badge-${job.status}`}>{job.status}</span></td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEdit(job)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(job._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'candidates' && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Experience</th>
                  <th>Skills</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate._id}>
                    <td>{candidate.name}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.phone}</td>
                    <td>{candidate.experience} years</td>
                    <td>{candidate.skills.join(', ')}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEdit(candidate)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(candidate._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'applications' && (
            <table>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Job</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app._id}>
                    <td>
                      {app.candidateId?.name}<br />
                      <small>{app.candidateId?.email}</small>
                    </td>
                    <td>
                      {app.jobId?.title}<br />
                      <small>{app.jobId?.company}</small>
                    </td>
                    <td>
                      <span className={`badge badge-${app.status}`}>{app.status}</span>
                      <div className="status-buttons">
                        <button 
                          className="btn-status" 
                          onClick={() => handleStatusChange(app._id, 'pending')}
                          disabled={app.status === 'pending'}
                        >
                          Pending
                        </button>
                        <button 
                          className="btn-status" 
                          onClick={() => handleStatusChange(app._id, 'reviewed')}
                          disabled={app.status === 'reviewed'}
                        >
                          Reviewed
                        </button>
                        <button 
                          className="btn-status" 
                          onClick={() => handleStatusChange(app._id, 'accepted')}
                          disabled={app.status === 'accepted'}
                        >
                          Accepted
                        </button>
                        <button 
                          className="btn-status" 
                          onClick={() => handleStatusChange(app._id, 'rejected')}
                          disabled={app.status === 'rejected'}
                        >
                          Rejected
                        </button>
                      </div>
                    </td>
                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <button className="btn-delete" onClick={() => handleDelete(app._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalType === 'create' ? 'Create' : 'Edit'} {activeTab.slice(0, -1)}</h2>
            <form onSubmit={handleSubmit}>
              {activeTab === 'jobs' && (
                <>
                  <div className="form-field">
                    <label>Title</label>
                    <input name="title" defaultValue={currentItem?.title} required />
                  </div>
                  <div className="form-field">
                    <label>Company</label>
                    <input name="company" defaultValue={currentItem?.company} required />
                  </div>
                  <div className="form-field">
                    <label>Location</label>
                    <input name="location" defaultValue={currentItem?.location} required />
                  </div>
                  <div className="form-field">
                    <label>Salary</label>
                    <input type="number" name="salary" defaultValue={currentItem?.salary} required />
                  </div>
                  <div className="form-field">
                    <label>Description</label>
                    <textarea name="description" defaultValue={currentItem?.description} required />
                  </div>
                  <div className="form-field">
                    <label>Type</label>
                    <select name="type" defaultValue={currentItem?.type} required>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Status</label>
                    <select name="status" defaultValue={currentItem?.status || 'open'}>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Requirements (comma-separated)</label>
                    <input name="requirements" defaultValue={currentItem?.requirements?.join(', ')} />
                  </div>
                </>
              )}

              {activeTab === 'candidates' && (
                <>
                  <div className="form-field">
                    <label>Name</label>
                    <input name="name" defaultValue={currentItem?.name} required />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input type="email" name="email" defaultValue={currentItem?.email} required />
                  </div>
                  <div className="form-field">
                    <label>Phone</label>
                    <input name="phone" defaultValue={currentItem?.phone} required />
                  </div>
                  <div className="form-field">
                    <label>Resume URL</label>
                    <input name="resume" defaultValue={currentItem?.resume} />
                  </div>
                  <div className="form-field">
                    <label>Skills (comma-separated)</label>
                    <input name="skills" defaultValue={currentItem?.skills?.join(', ')} />
                  </div>
                  <div className="form-field">
                    <label>Experience (years)</label>
                    <input type="number" name="experience" defaultValue={currentItem?.experience || 0} />
                  </div>
                </>
              )}

              <div className="modal-actions">
                <button type="submit" className="btn-save">Save</button>
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
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
