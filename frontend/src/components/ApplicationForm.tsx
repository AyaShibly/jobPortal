import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApplicationForm.css';

interface Candidate {
  _id: string;
  name: string;
  email: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
}

interface ApplicationFormProps {
  jobId?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobId, onClose, onSuccess }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidateId, setCandidateId] = useState('');
  const [selectedJobId, setSelectedJobId] = useState(jobId || '');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCandidates();
    if (!jobId) {
      fetchJobs();
    }
  }, [jobId]);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/candidates');
      setCandidates(res.data.candidates || []);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      const openJobs = (res.data.jobs || []).filter((job: any) => job.status === 'open');
      setJobs(openJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!candidateId || !selectedJobId) {
      alert('Please select both a candidate and a job');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/applications', {
        candidateId,
        jobId: selectedJobId,
        coverLetter
      });

      alert('Application submitted successfully!');
      onClose();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="application-overlay" onClick={onClose}>
      <div className="application-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Apply for Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Select Candidate *</label>
            <select 
              value={candidateId} 
              onChange={(e) => setCandidateId(e.target.value)}
              required
            >
              <option value="">-- Select Candidate --</option>
              {candidates.map((candidate) => (
                <option key={candidate._id} value={candidate._id}>
                  {candidate.name} ({candidate.email})
                </option>
              ))}
            </select>
          </div>

          {!jobId && (
            <div className="form-field">
              <label>Select Job *</label>
              <select 
                value={selectedJobId} 
                onChange={(e) => setSelectedJobId(e.target.value)}
                required
              >
                <option value="">-- Select Job --</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.title} - {job.company}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-field">
            <label>Cover Letter (Optional)</label>
            <textarea 
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell us why you're interested in this position..."
              rows={6}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
