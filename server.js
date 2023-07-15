// Entry point to our Node/Express server

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config(); // Load environment variables from .env file

require('./config/database'); // Connect to MongoDB with Mongoose
const swagger = require('./config/swagger');

const app = express();

app.use(logger('dev')); // Log requests to API using morgan
app.use(express.json()); // Parse incoming requests data and make it available under req.body property

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico'))); // Serve favicon
app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from the React app

// Middleware to verify token and assign user object of payload to req.user.
app.use(require('./config/checkToken'));

// * API routes
// Route prefix of /api for all of our routes
app.use('/api/users', require('./routes/api/users')); // API routes for users
app.use('/api/projects', require('./routes/api/projects')); // API routes for projects
app.use('/api/templates', require('./routes/api/templates')); // API routes for templates
app.use('/api/forms', require('./routes/api/forms')); // API routes for forms

swagger(app);

// If no API routes are hit, send the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.SERVER_PORT || 3001; // Set port

app.listen(port, () => console.log(`Listening on port ${port}`)); // Start server

