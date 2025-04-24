import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MODE = process.env.MODE;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN, // Frontend URL
  credentials: true               // ✅ Allow cookies to be sent with requests
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Import Routes
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler); // Error handler middleware

// Catch-all route for 404 errors
app.get(/.*/, (req, res) => {
  res.status(404).send('Page does not exist');
});

// Server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running in ${MODE} mode on ${PORT}`);
  });
});
