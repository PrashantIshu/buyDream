const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const buildingRoutes = require('../buyDream/routes/property-routes');
const userRoutes = require('../buyDream/routes/userRoutes');
const reviewRoutes = require('../buyDream/routes/reviewRoutes');
const amenetiesRoutes = require('../buyDream/routes/amenetiesRoutes');
const housesRoutes = require('../buyDream/routes/housesRoutes');
const viewRoutes = require('../buyDream/routes/viewRoutes');
const wishlistsRoutes = require('../buyDream/routes/wishlistsRoutes');
const builderRoutes = require('../buyDream/routes/builderRoutes');
const residentialHouseRoutes = require('../buyDream/routes/residentialHouseRoutes');
const residentialHouseReviewRoutes = require('../buyDream/routes/residentialHouseReviewRoutes');

const Building = require('../buyDream/models/buildingsModel');
const AppError = require('../buyDream/utils/app-error');
const errorController = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB , {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology: true ,
}).then(() => console.log("DB connection successfull"));

app.use((req, res, next) => {
    // console.log(req.headers);
    next();
});


app.use('/', viewRoutes);
app.use('/api/v1/buildings', buildingRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/ameneties', amenetiesRoutes);
app.use('/api/v1/houses', housesRoutes);
app.use('/api/v1/wishlists', wishlistsRoutes);
app.use('/api/v1/builders', builderRoutes);
app.use('/api/v1/residentialHouses', residentialHouseRoutes);
app.use('/api/v1/residentialHousesReviews', residentialHouseReviewRoutes);

app.all('*', (req, res, next) => {
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status =  "fail";
    // err.statusCode = 404;
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); //if err is passed as argument in next() then it will ignore all other middlewares and direct go to error middleware.

});

// Error Middleware :-
app.use(errorController.globalErrorHandler);

module.exports = app;