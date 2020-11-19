const express = require('express');
const builderController = require('../controllers/builderController');
const authController = require('../controllers/authController');

const Router = express.Router({ mergeParams: true });  //Nested Routes with Express

Router
    .route('/')
    .get(builderController.getAllBuilders)
    .post(authController.protect, authController.restrictTo('admin', 'builder', 'agent', 'owner'), builderController.getBuildingId, builderController.addExistingBuilderToABuilding, builderController.createBuilder);

Router
    .route('/:id')
    .patch(authController.protect,
        authController.restrictTo('admin', 'builder', 'agent', 'owner'),
        builderController.updateBuilderPhoto,
        builderController.resizeBuilderPhoto,
        builderController.updateBuilder
    )
    .get(builderController.getBuilder);

Router
    .route('/:builderName')
    .delete(authController.protect, authController.restrictTo('agent', 'admin', 'owner', 'builder'), builderController.removeBuilderFromABuilding, builderController.deleteBuilder);
module.exports = Router;
