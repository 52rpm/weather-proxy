// server.js
const express = require('express');
const weatherHandler = require('./api/weather.js'); // Import your function
const app = express();
const PORT = process.env.PORT || 10000; // Render sets the PORT

// Route requests to /api/weather to your function
app.get('/api/weather', weatherHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Weather API server listening on port ${PORT}`);
});
