const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const githubRoutes = require('./routes/github');
app.use('/api/github', githubRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'GitHub Explorer API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});