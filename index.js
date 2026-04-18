const express = require('express');
const app = express();
const PORT = 3000;

// Endpoint 1: GET /
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Endpoint 2: GET /health
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'healthy' });
});

// Endpoint 3: GET /me
app.get('/me', (req, res) => {
  res.status(200).json({
    name: 'Ayodeji Arib',   
    email: 'dejiwilliams9@gmail.com',     
    github: 'https://github.com/deji2ghost'  
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});