const express = require('express');
const os = require('os');
const app = express();
const PORT = 3000;

const API_KEY = "PUT_THE_KEY_FROM_DISCORD_HERE"; // ← this is the critical part

const authMiddleware = (req, res, next) => {
  const apiKeyHeader = req.headers["x-api-key"];
  const authHeader = req.headers["authorization"];

  let key = null;

  if (apiKeyHeader) {
    key = apiKeyHeader;
  } else if (authHeader && authHeader.startsWith("Bearer ")) {
    key = authHeader.split(" ")[1];
  }

  if (!key || key !== API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

// ✅ This line is the key fix — auth applies to ALL routes now
app.use(authMiddleware);

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