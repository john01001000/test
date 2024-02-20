const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Define route to fetch nearby concerts
app.get('/concerts', async (req, res) => {
  try {
    const location = req.query.location;
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }

    // Fetch nearby concerts from Ticketmaster API
    const concerts = await fetchNearbyConcerts(location);
    res.json(concerts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to fetch nearby concerts from Ticketmaster API
async function fetchNearbyConcerts(location) {
  const apiKey = 'zgx3rmni8IEqPxXl1PtdsfjP8xVzduxm';
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&geoPoint=${location}&apikey=${apiKey}`;

  const response = await axios.get(apiUrl);
  return response.data._embedded.events;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});