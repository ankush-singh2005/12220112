export const logger = (message) => {
  const log = `[${new Date().toLocaleTimeString()}] ${message}`;
  // Send to in-memory log store or console substitute
  document.dispatchEvent(new CustomEvent("log", { detail: log }));
};