import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent, getEventById } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get all events
router.route('/').get(protect, getEvents).post(protect, createEvent);

// Route to update and delete a specific event by ID
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);

// Route to get a specific event by ID
router.route('/:id').get(protect, getEventById);