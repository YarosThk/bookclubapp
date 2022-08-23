const express = require('express');
const colors = require('colors'); // to add colors in console messages
const dotenv = require('dotenv').config(); // to have access to -env variables
const { logErrors, errorHandler } = require('./middleware/errorHandler');
const { connectDB } = require('./config/db');

const port = process.env.PORT || 3000;
connectDB();
const app = express();

// Middleware in order to parse incoming json and urlencoded payloads
// and have access to req.body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using Router for /api/books routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
