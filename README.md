# GitHub Explorer

A full-stack web app that lets you search any GitHub username and view their public profile and repositories.

## Live Demo
- **Frontend:** https://github-explorer-two-mu.vercel.app
- **Backend API:** https://github-explorer-api.onrender.com

## Tech Stack

### Frontend
- React (Vite) — fast dev setup, functional components with hooks
- Axios — HTTP requests to backend
- Plain CSS — custom dark theme inspired by GitHub's UI

### Backend
- Node.js with Express — REST API server
- Axios — proxies requests to GitHub API
- In-memory caching — reduces GitHub API calls, avoids rate limits
- CORS — allows frontend to communicate with backend

## Why a Backend Proxy?
The frontend never calls GitHub directly. All requests go through our Express server which:
1. Caches responses for 60 seconds to avoid GitHub rate limits
2. Keeps API tokens server-side (safer in production)

## How to Run Locally

> Requires Node.js installed

### Backend
```bash
cd server
npm install
npm run dev
```
Server runs on http://localhost:5000

### Frontend
```bash
cd client
npm install
npm run dev
```
App runs on http://localhost:5173

## API Documentation

### GET /api/github/:username
Fetches a GitHub user's profile and repositories.

**Parameters:**
- `username` (string) — GitHub username

**Response:**
```json
{
  "user": {
    "login": "torvalds",
    "name": "Linus Torvalds",
    "avatar_url": "...",
    "bio": "...",
    "followers": 000,
    "following": 0,
    "public_repos": 0
  },
  "repos": [
    {
      "id": 1,
      "name": "repo-name",
      "description": "...",
      "stargazers_count": 0,
      "language": "C",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

**Error Responses:**
- `404` — User not found
- `403` — GitHub API rate limit exceeded
- `500` — Server error

## Project Structure
```
github-explorer/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx    # Search input
│   │   │   ├── ProfileCard.jsx  # User profile display
│   │   │   ├── RepoList.jsx     # Repo list with sort/filter
│   │   │   └── RepoCard.jsx     # Individual repo with expand
│   │   ├── App.jsx              # Main app, state management
│   │   └── App.css              # Global styles
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/
│   │   └── github.js       # GitHub API proxy + caching
│   ├── index.js            # Express server setup
│   └── package.json
└── README.md
```

## Next Steps
- Add GitHub OAuth so users can search private repos
- Persist recently searched users to a database
- Add a language breakdown chart per user
- Write unit tests for the cache logic and API routes
- Add pagination for users with 100+ repos