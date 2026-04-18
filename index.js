const express = require('express');
const app = express();
const PORT = 3000;
const os = require("os");
const API_KEY = "hng-secret";

const authMiddleware = (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key || key !== API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

// GET /
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// GET /health
app.get("/health", (req, res) => {
  const cpu = os.loadavg()[0].toFixed(2);
  const memory = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);

  res.status(200).json({
    status: "ok",
    cpu: cpu,
    memory: memory
  });
});

// GET /me
app.get('/me', authMiddleware, (req, res) => {
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