import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from '../controllers/eventController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get all events
router.route('/').get(requireAuth, getEvents).post(requireAuth, createEvent);

// Route to update and delete a specific event by ID
router.route('/:id').put(requireAuth, updateEvent).delete(requireAuth, deleteEvent);

// Route to get a specific event by ID
router.route('/:id').get(requireAuth, getEventById);

export default router;