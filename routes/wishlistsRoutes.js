const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');
const wishlistController = require('./../controllers/wishlistController');

const Router = express.Router();

Router
    .route('/getAllWishlists')
    .get(authController.protect,  wishlistController.getWishlist);

Router.
    route('/mywishlists')
    .get(authController.protect, wishlistController.getMyWishlists);

Router
    .route('/my-wishlists/:building')
    .post(authController.protect, wishlistController.postWishlist)
    .delete(authController.protect, wishlistController.deleteWishlist);

module.exports = Router;
