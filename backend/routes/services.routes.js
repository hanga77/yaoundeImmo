import express from 'express';
import Service from '../models/service.model.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// PUBLIC ROUTES
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
        // Front-end uses string IDs like 'construction', but mongo uses ObjectIds.
        // This will attempt to find by ObjectId first. If that fails, it assumes it might be a custom id field if you added one.
        // For simplicity with virtuals, we'll just search by mongo _id.
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch(error) {
        res.status(500).json({ message: 'Error fetching service', error: error.message });
    }
});


// ADMIN ROUTES
router.post('/', protect, admin, async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: 'Error creating service', error: error.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: 'Error updating service', error: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
});

export default router;