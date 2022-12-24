const path = require('path');
const express = require('express');
const cors = require('cors');
const colors = require('colors'); // to add colors in console messages
const dotenv = require('dotenv').config(); // to have access to -env variables
const { errorHandler } = require('./middleware/errorHandler');
const { connectDB } = require('./config/db');

const port = process.env.PORT || 3000;
connectDB();
const app = express();

// Middleware in order to parse incoming json and urlencoded payloads
// and have access to req.body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'https://book-club-app.onrender.com',
  })
);

// Using Router for /api/books routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   // We put the path to the static files in the build
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   // We serve the index.html file which is the entry page to out app
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => res.send('Please set to production environment'));
// }

// app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));
