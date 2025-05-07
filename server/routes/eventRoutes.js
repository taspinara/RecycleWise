import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from '../controllers/eventController.js';
import { isAdmin, requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get all events
router.route('/').get(getEvents).post(requireAuth,isAdmin, createEvent);

// Route to update and delete a specific event by ID
router.route('/:id').put(requireAuth, isAdmin, updateEvent).delete(requireAuth, isAdmin, deleteEvent);

// Route to get a specific event by ID
router.route('/:id').get(requireAuth, getEventById);

export default router;