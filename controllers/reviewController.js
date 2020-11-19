const Review = require("../models/reviewModel");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');
const factory = require('./handleFactory');

exports.getAllReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

exports.setBuildingIdAndUserId = (req, res, next) => {
    if(!req.body.building) req.body.building = req.params.buildingId;
    if(!req.body.user) req.body.user = req.user.id;

    next();
};

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
