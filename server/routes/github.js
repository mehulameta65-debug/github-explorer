const express = require('express');
const axios = require('axios');
const router = express.Router();

// In-memory cache
const cache = {};
const CACHE_TTL = 60 * 1000; // 60 seconds

// Helper to check if cache is still valid
const isCacheValid = (key) => {
  if (!cache[key]) return false;
  return Date.now() - cache[key].timestamp < CACHE_TTL;
};

// GET /api/github/:username - Get user profile
router.get('/:username', async (req, res) => {
  const { username } = req.params;
  const cacheKey = `user_${username}`;

  // Return cached response if valid
  if (isCacheValid(cacheKey)) {
    console.log(`Cache hit for ${username}`);
    return res.json(cache[cacheKey].data);
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
    ]);

    const data = {
      user: userRes.data,
      repos: reposRes.data
    };

    // Store in cache
    cache[cacheKey] = { data, timestamp: Date.now() };

    res.json(data);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (error.response?.status === 403) {
      return res.status(403).json({ error: 'GitHub API rate limit exceeded' });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;