const express = require('express');
const dotenv = require('dotenv').config();
const { logErrors, errorHandler } = require('./middleware/errorHandler');

const port = process.env.PORT || 3000;
const app = express();

// Middleware in order to parse incoming json and urlencoded payloads
// and have access to req.body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Using Router for /api/books routes
app.use('/api/books', require('./routes/bookRoutes'));

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
