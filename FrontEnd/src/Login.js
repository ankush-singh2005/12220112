// src/components/Login.js
import React, { useState } from 'react';
import { logEvent } from './logger1';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    logEvent(`Login attempt with Email: ${email}`);

    if (!email || !password) {
      logEvent('Login failed: Missing email or password');
      return;
    }

    
    if (email === 'admin@admin.com' && password === 'admin123') {
      logEvent('Login successful');
      alert('Logged in successfully!');
      navigate('/urls');

    } else {
      logEvent('Login failed: Invalid credentials');
      alert('Invalid credentials!');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            logEvent(`Email input changed to: ${e.target.value}`);
          }}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            logEvent(`Password input changed`);
          }}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: '300px', margin: 'auto', paddingTop: '100px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }
};

export default Login;
