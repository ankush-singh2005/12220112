// data.js
export const loadUrls = () => {
  const data = localStorage.getItem('urlStore');
  return data ? JSON.parse(data) : [];
};

export const saveUrls = (urls) => {
  localStorage.setItem('urlStore', JSON.stringify(urls));
};

export let urlStore = loadUrls();
