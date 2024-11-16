import express from 'express';
import dotenv from 'dotenv';
import doctorRoutes from './routes/doctorRoutes.js';
import patientRoutes from './routes/patientRoutes.js'; // Import patient routes

dotenv.config();

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Routes
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes); // Add patient routes

// Default error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
