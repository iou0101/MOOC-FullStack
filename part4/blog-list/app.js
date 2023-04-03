const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const config  = require('./utils/config');



mongoose.set('strictQuery', false);

logger.info('connecting to ', config.MONGODB_URI);


mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info("connected to database"))
  .catch((err) => logger.error("error connecting to MongoDB: " + err.message));



app.use(cors());
express.static('build');
app.use(express.json());
app.use(middleware.requestLogger);

// app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;