/**
 * Express Application Setup
 */

const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const canvaRoutes = require('./routes/canva.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Canva Integration API',
    version: '1.0.0',
    endpoints: {
      auth: '/auth',
      api: '/api/canva',
    },
  });
});

app.use('/auth', authRoutes);
app.use('/api/canva', canvaRoutes);

// Error handler (debe ser el último middleware)
app.use(errorHandler);

module.exports = app;
