const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const Router = express.Router({ mergeParams: true });  //Nested Routes with Express

// Router.use(authController.protect);

Router
    .route('/')
    .get(reviewController.getAllReviews)
    .post(authController.protect, authController.restrictTo('user', 'admin'), reviewController.setBuildingIdAndUserId, reviewController.createReview);

Router
    .route('/:id')
    .delete(authController.protect, authController.restrictTo('user', 'admin', 'agent', 'builder'), reviewController.deleteReview)
    .patch(authController.protect, authController.restrictTo('user', 'admin'), reviewController.updateReview)
    .get(reviewController.getReview);

module.exports = Router;
