import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all models
import Property from './models/property.model.js';
import User from './models/user.model.js';
import Agent from './models/agent.model.js';
import Service from './models/service.model.js';
import Product from './models/product.model.js';
import CarouselSlide from './models/carouselSlide.model.js';
import SiteConfig from './models/siteConfig.model.js';

// Import data from local JS data file
import { PROPERTIES, AGENTS, SERVICES, PRODUCTS, CAROUSEL_SLIDES, ABOUT_DATA, HOME_PAGE_DATA } from './seedData.js';

// Explicitly configure dotenv to use the .env file in the current directory.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const initialSeoData = {
    title: 'Immo Yaoundé - Agence Immobilière',
    description: 'Découvrez les meilleures offres immobilières à Yaoundé. Vente, location et gestion de biens avec notre agence experte.',
    keywords: 'immobilier, yaoundé, vente, location, agence, cameroun',
    ogImage: 'https://picsum.photos/seed/og/1200/630'
};

const initialFooterData = {
    description: "Votre partenaire de confiance pour tous vos projets immobiliers à Yaoundé. Vente, location, gestion et services sur-mesure.",
    address: "123 Avenue de l'Indépendance, Yaoundé, Cameroun",
    phone: "+237 612 345 678",
    email: "contact@immoyaounde.com",
    facebookUrl: "#",
    xUrl: "#",
    instagramUrl: "#",
    legalNoticeUrl: "/mentions-legales",
    privacyPolicyUrl: "/mentions-legales",
    openingHours: "Lundi - Vendredi: 9h00 - 18h00\nSamedi: 9h00 - 13h00\nDimanche: Fermé"
};

const seedDB = async () => {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error('\nERROR: MONGO_URI or MONGODB_URI is not defined in your .env file.');
        console.log('Please create a .env file in the /backend directory, copy the contents of .env.example, and add your MongoDB connection string.\n');
        process.exit(1);
    }
    
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB for seeding.');

        console.log('Deleting existing data...');
        await Property.deleteMany({});
        await User.deleteMany({});
        await Agent.deleteMany({});
        await Service.deleteMany({});
        await Product.deleteMany({});
        await CarouselSlide.deleteMany({});
        await SiteConfig.deleteMany({});
        console.log('Existing data deleted.');
        
        console.log('Inserting new data...');
        await Property.insertMany(PROPERTIES);
        console.log('Properties inserted.');
        
        await Agent.insertMany(AGENTS);
        console.log('Agents inserted.');
        
        await Service.insertMany(SERVICES);
        console.log('Services inserted.');

        await Product.insertMany(PRODUCTS);
        console.log('Products inserted.');
        
        await CarouselSlide.insertMany(CAROUSEL_SLIDES);
        console.log('Carousel slides inserted.');
        
        await SiteConfig.create({
            seoData: initialSeoData,
            footerData: initialFooterData,
            aboutData: ABOUT_DATA,
            homePageData: HOME_PAGE_DATA,
        });
        console.log('Site configuration inserted.');

        await User.create({
            name: 'Admin Istrateur',
            email: 'admin@immoyaounde.com',
            password: 'password123',
            role: 'Admin',
        });
        console.log('Admin user created.');

        console.log('Database seeding complete!');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedDB();