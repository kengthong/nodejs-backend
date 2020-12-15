import * as bodyParser from 'body-parser';
import express from 'express';
const morgan = require('morgan');

import application from '../constants/application';
import indexRoute from '../routes/index.route';
import joiErrorHandler from '../middlewares/joiErrorHandler';
import * as errorHandler from '../middlewares/apiErrorHandler';

const app = express();

// require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`});
app.use(bodyParser.json());

app.use(morgan('dev'));

// Router/
app.use(application.url.base, indexRoute);

// Joi Error Handler
app.use(joiErrorHandler);
// Error Handler
app.use(errorHandler.notFoundErrorHandler);

export default app;
