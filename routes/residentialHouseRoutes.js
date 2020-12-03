const express = require('express');
const residentialHouseController = require('../controllers/residentialHouseController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewResidentialHouseController');
// const amenetiesController = require('../controllers/amenetiesController');
const reviewRouter = require('./residentialHouseReviewRoutes');
// const amenetiesRoutes = require('./amenetiesRoutes');
// const housesRoutes = require('./housesRoutes');
// const builderRoutes = require('./builderRoutes');

const Router = express.Router();

Router.use('/:residentialHouseId/residentialHouseReviews', reviewRouter);  //Nested Routes with Express

// Router.use('/:buildingId/ameneties', amenetiesRoutes);

// Router.use('/:buildingId/builders', builderRoutes);

// Router.use('/:buildingId/houses', housesRoutes);

// Router.post('/sendmail/:builderOrAgent/:building', propertyController.bookHouseMail);

// Router
//     .route('/top-5-buildings')
//     .get(propertyController.getMostRatedBuildings, propertyController.getAllBuildings);

// Router.get('/buildingsStats', propertyController.buildingStats);

Router
    // /tours-within?distance=233&center=34.111745,-118.113491&unit=mi
    // /buildings-within/553/center/34.111745,-118.113491/unit/mi:- (this is better way of representing api tha above one)
    .route('/buildings-within/:distance/center/:latlng/unit/:unit')
    .get(residentialHouseController.getResidentialHouseWithin);

Router
    .route('/distances/:latlng/unit/:unit')
    .get(residentialHouseController.getDistances);

Router
    .route('/near-me/:latlng/unit/:unit')
    .get(residentialHouseController.getDistances);

Router
    .route('/')
    .get(residentialHouseController.getAllResidentialHouse)
    .post(authController.protect, authController.restrictTo('admin','agent', 'owner'),
        residentialHouseController.uploadResidentialHouseImages,
        residentialHouseController.resizeResidentialHouseImages,
        residentialHouseController.createResidentialHouse
    );

Router
    .route('/searched-results')
    .get(residentialHouseController.searchDocument);

Router
    .route('/:id')
    .get(residentialHouseController.getOneResidentialHouse)
    .patch(authController.protect,
        authController.restrictTo('admin', 'agent', 'owner'),
        residentialHouseController.uploadResidentialHouseImages,
        residentialHouseController.resizeResidentialHouseImages,
        residentialHouseController.updateResidentialHouse
    )
    .delete(authController.protect, authController.restrictTo('admin', 'agent', 'owner'), residentialHouseController.deleteResidentialHouse);

module.exports = Router;