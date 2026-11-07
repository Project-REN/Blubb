import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { health } from './Routes/cropHealthRoutes.js';

export const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/crops", health);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server Live at http://localhost:${PORT}`);
});