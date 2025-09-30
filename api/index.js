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

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

// --- Database Connection Logic for Serverless ---
// Cache the connection promise to avoid reconnecting on every invocation
let cachedDbPromise = null;

const connectToDatabase = () => {
    // If a connection promise is already cached, return it
    if (cachedDbPromise) {
        console.log('Using cached database connection promise.');
        return cachedDbPromise;
    }

    if (!mongoUri) {
        throw new Error('FATAL ERROR: MONGO_URI or MONGODB_URI is not defined.');
    }
    
    console.log('Creating new database connection promise.');
    // Create a new connection promise and cache it
    cachedDbPromise = mongoose.connect(mongoUri, {
        bufferCommands: false, // Disable Mongoose's buffering, essential for serverless
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    }).then(mongooseInstance => {
        console.log('Database connection successful.');
        return mongooseInstance;
    }).catch(err => {
        console.error('Database connection failed:', err);
        // If connection fails, reset the cached promise to allow retry on next request
        cachedDbPromise = null;
        throw err;
    });
    
    return cachedDbPromise;
};

// Middleware to ensure DB is connected before processing any API request
const ensureDbConnection = async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        console.error('Database connection middleware error:', error.message);
        res.status(503).json({
            error: "Service Unavailable",
            message: "Failed to connect to the database. The service may be temporarily down or misconfigured."
        });
    }
};

// Apply the DB connection middleware to all API routes
app.use('/api', ensureDbConnection);


// API Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carousel-slides', carouselSlideRoutes);
app.use('/api/config', siteConfigRoutes);


// Export the app for Vercel
export default app;
