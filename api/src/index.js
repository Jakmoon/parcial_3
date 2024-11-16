import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('API is running'));

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ message: 'Database connected', serverTime: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
