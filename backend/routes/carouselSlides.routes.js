import express from 'express';
import CarouselSlide from '../models/carouselSlide.model.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// PUBLIC ROUTES
router.get('/', async (req, res) => {
  try {
    const slides = await CarouselSlide.find({});
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching carousel slides', error: error.message });
  }
});

// ADMIN ROUTES
router.post('/', protect, admin, async (req, res) => {
  try {
    const newSlide = new CarouselSlide(req.body);
    const savedSlide = await newSlide.save();
    res.status(201).json(savedSlide);
  } catch (error) {
    res.status(400).json({ message: 'Error creating slide', error: error.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updatedSlide = await CarouselSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSlide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    res.json(updatedSlide);
  } catch (error) {
    res.status(400).json({ message: 'Error updating slide', error: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deletedSlide = await CarouselSlide.findByIdAndDelete(req.params.id);
    if (!deletedSlide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting slide', error: error.message });
  }
});

export default router;