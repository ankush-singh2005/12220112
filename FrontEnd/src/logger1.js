// src/utils/logger.js
export const logEvent = (message) => {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] ${message}`;
  const logs = JSON.parse(localStorage.getItem('logs')) || [];
  logs.push(log);
  localStorage.setItem('logs', JSON.stringify(logs));
};
