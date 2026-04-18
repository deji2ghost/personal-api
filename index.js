const express = require('express');
const os = require('os');
const app = express();
const PORT = 3000;

// GET /
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// GET /health
app.get('/health', (req, res) => {
  const totalMem = os.totalmem();
  const usedMem = totalMem - os.freemem();
  const cpuLoad = os.loadavg()[0].toFixed(2);
  const memoryMB = (usedMem / 1024 / 1024).toFixed(2);

  res.status(200).json({
    message: 'healthy',
    cpu: `${cpuLoad}%`,
    memory: `${memoryMB}MB`
  });
});

// GET /me
app.get('/me', (req, res) => {
  res.status(200).json({
    name: 'Ayodeji Arib',
    email: 'dejiwilliams9@gmail.com',
    github: 'https://github.com/deji2ghost',
    repo_name: 'personal-api'
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});