// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all routes
// This allows the frontend (served from a different origin) to make requests to this backend.
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount the API routes under the /api path
app.use('/api', apiRoutes);

// Global error handler - More robust version
app.use((err, req, res, next) => {
  console.error("--- Global Error Handler Activated ---");
  console.error(err); // Log the full error object for detailed debugging

  // Specific handling for mysql2/database errors which have a 'sqlMessage' property
  if (err.sqlMessage) {
    console.error(`Database Error Detected: ${err.sqlMessage}`);
    // Return a 400 Bad Request because it's usually a client-side data issue (e.g., violating a NOT NULL constraint)
    return res.status(400).json({
      message: `Database error: ${err.sqlMessage}`,
      code: err.code || 'DB_ERROR'
    });
  }

  // Fallback for other types of errors
  // Ensure headers haven't already been sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({ message: err.message || 'An unexpected server error occurred.' });
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});