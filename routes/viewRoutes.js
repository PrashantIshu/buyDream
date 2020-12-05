const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const wishlistController = require('../controllers/wishlistController');
const propertyController = require('../controllers/propertyController');

const Router = express.Router();

Router.get('/',authController.isLoggedIn, viewsController.getOverview);

Router.get('/my-properties',authController.isLoggedIn, viewsController.getMyProperties);

Router.get('/min-to-max-price', authController.isLoggedIn, viewsController.getMinToMaxPrice);
Router.get('/max-to-min-price', authController.isLoggedIn, viewsController.getMaxToMinPrice);
Router.get('/min-to-max-rating', authController.isLoggedIn, viewsController.getMinToMaxRating);
Router.get('/max-to-min-rating', authController.isLoggedIn, viewsController.getMaxToMinRating);

Router.get('/houses/:slug',authController.isLoggedIn, viewsController.getHouses);

Router.get('/login', viewsController.login);
Router.get('/signup', viewsController.signup);
Router.get('/forgotPassword', viewsController.forgotPassword);
Router.get('/api/v1/users/resetPassword/:token', viewsController.resetPassword);


Router
    .route('/sellBuilding')
    .get(authController.protect,
            authController.isLoggedIn,
            authController.restrictTo('admin', 'owner', 'agent', 'user'),
            viewsController.sellBuilding
        );

Router
    .route('/houses/:slug/postHouseAndAmen')
    .get(authController.protect,
            authController.restrictTo('admin', 'owner', 'agent'),
            viewsController.sellHouseAmen
    );

Router
    .route('/independentHouse/:slug')
    .get(viewsController.getIndependentHouse);

Router
    .route('/me')
    .get(authController.protect, authController.isLoggedIn, viewsController.getMe);

Router.get('/my-wishlists', authController.protect, authController.isLoggedIn, viewsController.getMyWishlists);

Router.get('/buildings-near-me/:latlng/unit/:unit', viewsController.getBuildingsNearMe);

Router.get('/buildings-within-distance/:distance/center/:latlng/unit/:unit', viewsController.getBuildingsWithinDistance);

Router.get('/my-reviews', authController.protect, authController.isLoggedIn, viewsController.getMyReviews);

Router.get('/buildings/:string', viewsController.searchedDocs);

Router.get('/updateBuilding/:slug', viewsController.updateBuilding);

Router.get('/updateHouse/:id', viewsController.updateHouse);

Router.get('/about-the-developer', viewsController.aboutTheDeveloper);

module.exports = Router;
