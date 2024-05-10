/* eslint-disable prettier/prettier */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');    
const animeRouter = require('./routes/animeRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const favouriteAnimeRouter = require('./routes/favouriteAnimeRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());
app.use(cors());

// Development logging
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from the same API
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Middleware to parse the body of the request
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution

//Serving static files
app.use(express.static(`${__dirname}/public`));

// Middleware to add the request time to the request object
app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    //console.log(req.headers);
    next();
});

// 3) ROUTES
app.use('/api/v1/animes', animeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/favouriteAnime', favouriteAnimeRouter);
app.use('/api/v1/posts', postRouter);

// Middleware to handle unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Middleware to handle errors
app.use(globalErrorHandler);

module.exports = app;

