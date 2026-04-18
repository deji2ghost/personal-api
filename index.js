const express = require('express');
const app = express();
const PORT = 3000;
const os = require("os");

const API_KEY = process.env.API_KEY || "test123";

const authMiddleware = (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key || key !== API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

app.use("/me", authMiddleware);

// Endpoint 1: GET /
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Endpoint 2: GET /health
// app.get('/health', (req, res) => {
//   res.status(200).json({ message: 'healthy' });
// });
app.get("/health", (req, res) => {
  const cpuUsage = os.loadavg()[0]; // simple CPU indicator
  const memoryUsage = process.memoryUsage().rss / (1024 * 1024); // MB

  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    cpu: `${cpuUsage.toFixed(2)}%`,
    memory: `${memoryUsage.toFixed(2)}MB`,
  });
});

// Endpoint 3: GET /me
app.get('/me', (req, res) => {
  res.status(200).json({
    name: 'Ayodeji Arib',   
    email: 'dejiwilliams9@gmail.com',     
    github: 'https://github.com/deji2ghost',
    repo_name: "https://github.com/deji2ghost/personal-api"
  });
});

// app.use("/", authMiddleware);
// app.use("/health", authMiddleware);
// app.use("/me", authMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});