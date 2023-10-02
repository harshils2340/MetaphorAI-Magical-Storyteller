const path = require('path');

// Serve static files (including index.html) from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve the React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  