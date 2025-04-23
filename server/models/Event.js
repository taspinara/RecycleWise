import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        trim: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventLocation: {
        type: String,
        required: true,
        trim: true,
    },
    eventDescription: {
        type: String,
        required: true,
        trim: true,
    },
    eventImage: {
        type: String,
        required: false,
        trim: true,
    },
    eventOrganizer: {
        type: String,
        required: true,
        trim: true,
    }, 
    eventType: {
        type: String,
        required: true,
        trim: true,
    },
    eventStatus: {
        type: String,
        required: true,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming',
    },
},
{
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
export default Event;