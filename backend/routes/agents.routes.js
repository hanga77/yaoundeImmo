import express from 'express';
import Agent from '../models/agent.model.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// PUBLIC ROUTES
router.get('/', async (req, res) => {
  try {
    const agents = await Agent.find({});
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agents', error: error.message });
  }
});

// ADMIN ROUTES
router.post('/', protect, admin, async (req, res) => {
  try {
    const newAgent = new Agent(req.body);
    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating agent', error: error.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(updatedAgent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating agent', error: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting agent', error: error.message });
  }
});

export default router;