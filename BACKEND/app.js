const express = require('express');
const cors = require('cors');
//const helmet = require('./node_modules/helmet/index.d.cts');
const { errorHandler } = require('./Middlewares/errorMiddleware');

const app = express();

// Middlewares
//app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/testRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/videos', require('./routes/videoRoutes'));




// Error Handler
app.use(errorHandler);

module.exports = app;