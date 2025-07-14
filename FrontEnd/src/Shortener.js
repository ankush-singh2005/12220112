import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Link } from '@mui/material';
import { logger } from './logger';
import { nanoid } from 'nanoid';
import { urlStore, saveUrls } from './data';
import { click } from '@testing-library/user-event/dist/click';

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function Shortener() {
  const [inputs, setInputs] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);
  const [clicks,setClicks] = useState(0);

  const handleChange = (i, field, value) => {
    const newInputs = [...inputs];
    newInputs[i][field] = value;
    setInputs(newInputs);
  };

  const handleAddField = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const generateShortcode = () => nanoid(6);

const handleSubmit = () => {
  const newResults = [];

  inputs.forEach((item) => {
    const { longUrl, validity, shortcode } = item;

    if (!isValidUrl(longUrl)) {
      logger(`❌ Invalid URL: ${longUrl}`);
      return;
    }

    let code = shortcode || generateShortcode();
    while (urlStore.find((u) => u.shortcode === code)) {
      code = generateShortcode();
    }

    const expiry = new Date(Date.now() + ((validity || 30) * 60000));
    const record = { longUrl, shortcode: code, expiry };

    urlStore.push(record);        // ✅ Store in memory
    saveUrls(urlStore);           // ✅ Save to localStorage

    newResults.push(record);

    logger(`✅ Shortened ${longUrl} to http://${code} (expires at ${expiry.toLocaleTimeString()})`);
  });

  setResults(newResults);
  setInputs([{ longUrl: '', validity: '', shortcode: '' }]);
};
    const handleLinkClicks = () => {
        setClicks(clicks+1);
    }
    useEffect(() => {

    },clicks);

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h5">URL Shortener</Typography>

      {inputs.map((input, i) => (
        <Grid key={i} container spacing={1} sx={{ marginTop: 1 }}>
          <Grid item xs={5}><TextField fullWidth label="Long URL" value={input.longUrl} onChange={(e) => handleChange(i, 'longUrl', e.target.value)} /></Grid>
          <Grid item xs={2}><TextField label="Validity (min)" type="number" value={input.validity} onChange={(e) => handleChange(i, 'validity', e.target.value)} /></Grid>
          <Grid item xs={3}><TextField label="Custom Shortcode" value={input.shortcode} onChange={(e) => handleChange(i, 'shortcode', e.target.value)} /></Grid>
        </Grid>
      ))}

      <Button variant="contained" onClick={handleAddField} sx={{ mt: 2, mr: 2 }}>Add</Button>
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Shorten</Button>

      {/* Display shortened results */}
      {results.length > 0 && (
        <Paper sx={{ mt: 3, padding: 2 }}>
          <Typography variant="h6">Shortened URLs:</Typography>
          {results.map((r, idx) => (
            <div key={idx}>
              <Link onClick={handleLinkClicks} href={`/${r.shortcode}`} underline="hover" target="_blank">
                {`http://localhost:3000/${r.shortcode}`}
              </Link>
              <div>Expires at: {new Date(r.expiry).toLocaleString()}</div>
              <div>No of clicks : {clicks}  Clicked At: 
                {
                    clicks && (new Date().toLocaleTimeString())
                }
            
                </div>
            </div>
          ))}
        </Paper>
      )}
    </Paper>
  );
}
