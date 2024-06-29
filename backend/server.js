// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const roomRoutes = require('./routes/roomRoutes');
const customerRoutes = require('./routes/customerRoutes'); // Import customer routes
const ratingRoutes = require('./routes/ratingRoutes'); 
const cartRoutes = require('./routes/cartRoutes')

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());  
app.use(cors()); // Enable CORS for all origins

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', roomRoutes);
app.use('/api', customerRoutes); // Use customer routes
app.use('/api', ratingRoutes);
app.use('/api', cartRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
