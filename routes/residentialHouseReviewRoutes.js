const express = require('express');
const reviewController = require('./../controllers/reviewResidentialHouseController');
const authController = require('./../controllers/authController');

const Router = express.Router({ mergeParams: true });  //Nested Routes with Express

// Router.use(authController.protect);

Router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(authController.protect, authController.restrictTo('user', 'admin'), reviewController.setBuildingIdAndUserId, reviewController.createReview);

Router
    .route('/:id')
    .delete(authController.protect, authController.restrictTo('user', 'admin', 'agent', 'owner'), reviewController.deleteReview)
    .patch(authController.protect, authController.restrictTo('user', 'admin', 'agent', 'owner'), reviewController.updateReview)
    .get(reviewController.getReview);

module.exports = Router;
