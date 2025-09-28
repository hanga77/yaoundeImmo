import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import propertyRoutes from './routes/properties.routes.js';
import userRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';
import agentRoutes from './routes/agents.routes.js';
import serviceRoutes from './routes/services.routes.js';
import productRoutes from './routes/products.routes.js';
import carouselSlideRoutes from './routes/carouselSlides.routes.js';
import siteConfigRoutes from './routes/siteConfig.routes.js';

// Determine __dirname for ES modules, which is needed for both dotenv and serving static files.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly configure dotenv to use the .env file in the current directory.
dotenv.config({ path: path.join(__dirname, '.env') });

// Make the connection string check more robust by accepting both MONGO_URI and MONGODB_URI
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

// Exit if MongoDB URI is not defined
if (!mongoUri) {
  console.error('FATAL ERROR: MONGO_URI or MONGODB_URI is not defined in the .env file.');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Routes (must be before the frontend serving)
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carousel-slides', carouselSlideRoutes);
app.use('/api/config', siteConfigRoutes);


// Serve frontend
// The root directory of the frontend is one level up from the backend directory
const frontendRoot = path.join(__dirname, '..');

// Serve static files (like index.tsx, components, pages, etc.)
app.use(express.static(frontendRoot));

// For any other request, serve the index.html file to let React Router handle it
app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendRoot, 'index.html'));
});

// Connect to MongoDB and start server
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection error', error.message);
  });