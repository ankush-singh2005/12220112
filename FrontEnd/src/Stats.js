// Stats.js
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { urlStore } from './data';
import { useNavigate } from 'react-router-dom';

export default function Stats() {
  const navigate = useNavigate();

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h5">Shortened URL Statistics</Typography>
      <List>
        {urlStore.map((u, i) => (
          <ListItem key={i} secondaryAction={
            <Button variant="outlined" onClick={() => navigate(`/${u.shortcode}`)}>Go</Button>
          }>
            <ListItemText
              primary={`/${u.shortcode} → ${u.longUrl}`}
              secondary={`Expires at: ${new Date(u.expiry).toLocaleTimeString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
