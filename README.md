# Personal API

A simple REST API built with Node.js and Express, deployed on AWS EC2 with Nginx as a reverse proxy.

## Run Locally

```bash
git clone https://github.com/YOURUSERNAME/personal-api.git
cd personal-api
npm install
node index.js
```

API will be available at `http://localhost:3000`

## Endpoints

 Endpoint       Method          Response 

 `/`              GET            `{"message": "API is running"}` |
 `/health`        GET              `{"message": "healthy"}` |
 `/me`            GET              `{"name": "...", "email": "...", "github": "..."}` |

## Live URL

http://13.51.48.0/