// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Custom log box handler
document.addEventListener("log", (e) => {
  const log = e.detail;
  const logBox = document.getElementById('log-box');
  if (logBox) logBox.innerHTML += `<div>${log}</div>`;
});

// Create React root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
    <div id="log-box" style={{ padding: 10, fontSize: 12, backgroundColor: "#eee" }} />
  </>
);
