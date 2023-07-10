// Entry point to our Node/Express server

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config(); // Load environment variables from .env file

require('./config/database'); // Connect to MongoDB with Mongoose

const app = express();

app.use(logger('dev')); // Log requests to API using morgan
app.use(express.json()); // Parse incoming requests data and make it available under req.body property

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico'))); // Serve favicon
app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from the React app

// Middleware to verify token and assign user object of payload to req.user.
app.use(require('./config/checkToken'));

// * API routes
// Route prefix of /api for all of our routes
app.get('/api', (req, res) => {
    res.send('Hello from API route');
});

app.use('/api/users', require('./routes/api/users')); // API routes for users

// If no API routes are hit, send the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.SERVER_PORT || 3001; // Set port

app.listen(port, () => console.log(`Listening on port ${port}`)); // Start server

