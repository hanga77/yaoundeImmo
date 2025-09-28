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
// We cache the connection promise to avoid reconnecting on every request.
let cachedDbPromise = null;

const connectToDatabase = async () => {
    // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    if (!mongoUri) {
        throw new Error('FATAL ERROR: MONGO_URI or MONGODB_URI is not defined.');
    }

    if (cachedDbPromise) {
        return cachedDbPromise; // A connection attempt is already in progress
    }

    console.log('Connecting to MongoDB...');
    cachedDbPromise = mongoose.connect(mongoUri, {
        bufferCommands: false, // Recommended for serverless
    });

    try {
        await cachedDbPromise;
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error('MongoDB connection error:', e.message);
        cachedDbPromise = null; // Reset promise on failure to allow retry
        throw e; // Re-throw error to be caught by the middleware
    }
};

// Middleware to ensure DB connection before handling any API request
const ensureDbConnection = async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        console.error('Database connection failed for request:', req.path);
        res.status(503).json({
            error: "Service Unavailable",
            message: "The server could not connect to the database. This might be a temporary issue or a configuration problem (e.g., incorrect MONGO_URI or IP whitelist)."
        });
    }
};

// Apply the middleware to all API routes
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