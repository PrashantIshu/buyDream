const express = require('express');
const propertyController = require('../controllers/propertyController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const amenetiesController = require('../controllers/amenetiesController');
const reviewRouter = require('./reviewRoutes');
const amenetiesRoutes = require('./amenetiesRoutes');
const housesRoutes = require('./housesRoutes');
const builderRoutes = require('./builderRoutes');

const Router = express.Router();

// Router
//     .route('/:buildingId/reviews')
//     .post(authController.protect, authController.restrictTo('user'), reviewController.createReview);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
Router.use('/:buildingId/reviews', reviewRouter);  //Nested Routes with Express

Router.use('/:buildingId/ameneties', amenetiesRoutes);

Router.use('/:buildingId/builders', builderRoutes);

Router.use('/:buildingId/houses', housesRoutes);

Router.post('/sendmail/:builderOrAgent/:building', propertyController.bookHouseMail);

Router
    .route('/top-5-buildings')
    .get(propertyController.getMostRatedBuildings, propertyController.getAllBuildings);

// Router
//     .route('/buildings-stats')
//     .get(propertyController.getBuildingStats);
Router.get('/buildingsStats', propertyController.buildingStats);

Router
    // /tours-within?distance=233&center=34.111745,-118.113491&unit=mi
    // /buildings-within/553/center/34.111745,-118.113491/unit/mi:- (this is better way of representing api tha above one)
    .route('/buildings-within/:distance/center/:latlng/unit/:unit')
    .get(propertyController.getBuildingsWithin);

Router
    .route('/distances/:latlng/unit/:unit')
    .get(propertyController.getDistances);

Router
    .route('/near-me/:latlng/unit/:unit')
    .get(propertyController.getDistances);

Router
    .route('/')
    .get(propertyController.getAllBuildings)
    .post(authController.protect, authController.restrictTo('admin','agent', 'owner', 'builder'),
        propertyController.uploadBuildingImages,
        propertyController.resizeBuildingImages,
        propertyController.createBuilding
    );

Router
    .route('/searched-results')
    .get(propertyController.searchDocument);

Router
    .route('/:id')
    .get(propertyController.getOneBuilding)
    .patch(authController.protect,
        authController.restrictTo('admin', 'agent', 'owner'),
        propertyController.uploadBuildingImages,
        propertyController.resizeBuildingImages,
        propertyController.updateBuilding
    )
    .delete(authController.protect, authController.restrictTo('admin', 'agent', 'owner'), propertyController.deleteBuilding);

module.exports = Router;