const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const housesController = require('../controllers/housesController');
const propertyController = require('./../controllers/propertyController');
const amenetiesController = require('./../controllers/amenetiesController');

const Router = express.Router({ mergeParams: true });  //Nested Routes with Express

// Router.use(authController.protect);


Router
    .route('/flatType/:flatType')
    .get(housesController.flatTypes);

Router
    .route('/')
    .get(housesController.getAllHouses)
    .post(authController.protect,
        authController.restrictTo('admin', 'owner', 'agent'),
        amenetiesController.getBuildingId,
        housesController.uploadHouseImage,
        housesController.resizeHousePhoto,
        housesController.createHouse,
        propertyController.buildingStats
    );

Router
    .route('/:id')
    .delete(authController.protect, authController.restrictTo('agent', 'admin'), housesController.deleteHouse)
    .patch(authController.protect,
        authController.restrictTo('agent', 'admin'),
        housesController.uploadHouseImage,
        housesController.resizeHousePhoto,
        housesController.updateHouse
    )
    .get(housesController.getHouse);


module.exports = Router;