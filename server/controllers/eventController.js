import Event from "../models/Event.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.status(200).json(events);
});

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
export const createEvent = asyncHandler(async (req, res) => {
  const { eventName, eventDate, eventLocation, eventDescription, eventImage, eventOrganizer, eventType } = req.body;

  const newEvent = new Event({
    eventName,
    eventDate,
    eventLocation,
    eventDescription,
    eventImage,
    eventOrganizer,
    eventType,
  });

  const createdEvent = await newEvent.save();
  res.status(201).json(createdEvent);
});

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = asyncHandler(async (req, res) => {
  const { eventName, eventDate, eventLocation, eventDescription, eventImage, eventOrganizer, eventType } = req.body;

  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  event.eventName = eventName || event.eventName;
  event.eventDate = eventDate || event.eventDate;
  event.eventLocation = eventLocation || event.eventLocation;
  event.eventDescription = eventDescription || event.eventDescription;
  event.eventImage = eventImage || event.eventImage;
  event.eventOrganizer = eventOrganizer || event.eventOrganizer;
  event.eventType = eventType || event.eventType;

  const updatedEvent = await event.save();
  res.status(200).json(updatedEvent);
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await event.remove();
  res.status(200).json({ message: "Event removed" });
});

// @desc    Get an event by ID
// @route   GET /api/events/:id 
// @access  Public
export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.status(200).json(event);
});

// @desc    Get events by type
// @route   GET /api/events/type/:eventType
// @access  Public
export const getEventsByType = asyncHandler(async (req, res) => {
  const { eventType } = req.params;
  const events = await Event.find({ eventType });

  if (!events || events.length === 0) {
    res.status(404);
    throw new Error("No events found for this type");
  }

  res.status(200).json(events);
});