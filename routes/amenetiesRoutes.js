const express = require('express');
const amenetiesController = require('./../controllers/amenetiesController');
const authController = require('./../controllers/authController');

const Router = express.Router({ mergeParams: true });  //Nested Routes with Express

// Router.use(authController.protect);
// Router
//     .route('/:ameneties')
//     .get(amenetiesController.filterAmeneties);

Router
    .route('/')
    .get(amenetiesController.getAllAmeneties)
    .post(authController.protect, authController.restrictTo('admin', 'agent', 'owner'), amenetiesController.getBuildingId, amenetiesController.addExistingAmenetyToABuilding, amenetiesController.createAmeneties);

Router
    .route('/:id')
    .patch(authController.protect, authController.restrictTo('agent', 'admin', 'owner'), amenetiesController.updateAmeneties)
    .get(amenetiesController.getAmeneties);

Router
    .route('/:amenetyName')
    .delete(authController.protect, authController.restrictTo('agent', 'admin', 'owner'),amenetiesController.removeAmentyFromABuilding, amenetiesController.deleteAmeneties);
module.exports = Router;
