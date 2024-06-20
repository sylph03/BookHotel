// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const roomRoutes = require('./routes/roomRoutes');
const customerRoutes = require('./routes/customerRoutes'); // Import customer routes

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/api', roomRoutes);
app.use('/api', customerRoutes); // Use customer routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
