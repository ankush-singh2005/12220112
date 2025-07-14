// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Shortener from './Shortener';
import Stats from './Stats';
import { urlStore } from './data';
import { Container } from '@mui/material';
import Login from './Login';

const Redirector = () => {
  const { code } = useParams();
  const urlData = urlStore.find(u => u.shortcode === code);

  if (!urlData) {
    return <div>⚠️ Link not found</div>;
  }

  const now = new Date();
  const expiry = new Date(urlData.expiry);

  if (now > expiry) {
    return <div>⚠️ This link has expired.</div>;
  }

  // Perform client-side redirect
  window.location.href = urlData.longUrl;
  return null;
};


function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/urls" element={<Shortener />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/:code" element={<Redirector />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
