import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes from the backend folder
import propertyRoutes from '../backend/routes/properties.routes.js';
import userRoutes from '../backend/routes/users.routes.js';
import authRoutes from '../backend/routes/auth.routes.js';
import agentRoutes from '../backend/routes/agents.routes.js';
import serviceRoutes from '../backend/routes/services.routes.js';
import productRoutes from '../backend/routes/products.routes.js';
import carouselSlideRoutes from '../backend/routes/carouselSlides.routes.js';
import siteConfigRoutes from '../backend/routes/siteConfig.routes.js';

// Load environment variables. In Vercel, these are set in the project settings.
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Middleware to check database connection status before handling API requests
const checkDbConnection = (req, res, next) => {
    // readyState: 0 = disconnected, 1 = connected
    if (mongoose.connection.readyState === 1) {
        return next(); // Connection is good, proceed to the route
    }
    
    // If not connected, the server cannot fulfill the request.
    console.error('API request blocked: Database is not connected. Current state:', mongoose.connection.readyState);
    return res.status(503).json({
        error: "Service Unavailable",
        message: "The server cannot connect to the database. Please ensure environment variables (e.g., MONGO_URI) are correctly configured in the Vercel project settings."
    });
};

// Apply the middleware to all API routes
app.use('/api', checkDbConnection);


// API Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carousel-slides', carouselSlideRoutes);
app.use('/api/config', siteConfigRoutes);

// Make the connection string check more robust by accepting both MONGO_URI and MONGODB_URI
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

// Connect to MongoDB
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error.message));
} else {
  console.error('FATAL ERROR: MONGO_URI or MONGODB_URI is not defined.');
}

// Export the app for Vercel
export default app;