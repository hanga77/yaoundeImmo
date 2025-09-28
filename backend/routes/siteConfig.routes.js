import express from 'express';
import SiteConfig from '../models/siteConfig.model.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// @desc    Get site configuration
// @route   GET /api/config
// @access  Public
router.get('/', async (req, res) => {
  try {
    // There should only ever be one config document
    const config = await SiteConfig.findOne();
    if (!config) {
      return res.status(404).json({ message: 'Site configuration not found. Please seed the database.' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching site configuration', error: error.message });
  }
});

// @desc    Update site configuration
// @route   PUT /api/config
// @access  Private/Admin
router.put('/', protect, admin, async (req, res) => {
  try {
    const config = await SiteConfig.findOneAndUpdate(
      {}, // Find the single document
      { $set: req.body }, // Use $set to update/merge fields provided in the body
      { new: true, upsert: true, runValidators: true } // Options: return updated doc, create if not exist
    );
    res.json(config);
  } catch (error) {
    res.status(400).json({ message: 'Error updating site configuration', error: error.message });
  }
});

export default router;