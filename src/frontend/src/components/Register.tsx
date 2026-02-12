import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
      localStorage.setItem('token', response.data.token);
      setError('');
      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundDecor}></div>
      <div style={styles.formWrapper}>
        <div style={styles.headerSection}>
          <h1 style={styles.logo}>💼 JobPortal</h1>
          <h2 style={styles.title}>Join Today</h2>
          <p style={styles.subtitle}>Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.errorBox}>
            <span style={{ marginRight: '10px' }}>⚠️</span>{error}
          </div>}

          <div style={styles.inputGroup}>
            <label style={styles.label}>👤 Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
              minLength={3}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>📧 Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>🔒 Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              minLength={6}
            />
            <p style={styles.hint}>Password must be at least 6 characters</p>
          </div>

          <button 
            type="submit" 
            style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
            disabled={loading}
          >
            {loading ? '🔄 Creating account...' : '🚀 Create Account'}
          </button>
        </form>

        <div style={styles.divider}></div>

        <p style={styles.switchText}>
          Already have an account? 
          <span 
            style={styles.switchLink}
            onClick={() => navigate('/login')}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative' as const,
    overflow: 'hidden',
  },
  backgroundDecor: {
    position: 'absolute' as const,
    width: '400px',
    height: '400px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    top: '-50px',
    right: '-50px',
  },
  formWrapper: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '420px',
    padding: '50px 40px',
    position: 'relative' as const,
    zIndex: 10,
  },
  headerSection: {
    textAlign: 'center' as const,
    marginBottom: '35px',
  },
  logo: {
    fontSize: '32px',
    color: '#764ba2',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '28px',
    color: '#1a1a1a',
    marginBottom: '8px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    marginTop: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  hint: {
    fontSize: '12px',
    color: '#999',
    marginTop: '4px',
    margin: '4px 0 0 0',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box' as const,
    outline: 'none',
  } as React.CSSProperties,
  button: {
    width: '100%',
    padding: '13px 14px',
    backgroundColor: '#764ba2',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
  } as React.CSSProperties,
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  errorBox: {
    background: '#fff3cd',
    border: '2px solid #ffc107',
    color: '#856404',
    padding: '12px 14px',
    borderRadius: '10px',
    marginBottom: '20px',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    background: '#e0e0e0',
    margin: '25px 0',
  },
  switchText: {
    textAlign: 'center' as const,
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  switchLink: {
    color: '#764ba2',
    fontWeight: '600',
    cursor: 'pointer',
    marginLeft: '5px',
    transition: 'all 0.2s ease',
  },
};

export default Register;
