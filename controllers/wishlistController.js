const Wishlist = require('../models/wishlistsModel');
const Building = require('../models/buildingsModel');
const House = require('../models/housesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');


exports.getWishlist = catchAsync(async (req, res, next) => {
    const wishlists = await Wishlist.find();

    // const house = await House.findById(wishlists.house);
    // console.log(wishlists.house);
    // const building = await Building.findById(house.building);
    console.log(wishlists);
    res.json({
        status: 'success',
        data: wishlists
    });
});

exports.getMyWishlists = catchAsync(async (req, res, next) => {
    const wishlists = await Wishlist.find({user: req.user});
    if(!wishlists) {
        return next(new AppError('You have no Wishlists', 404));
    }
    res.json({
        status: 'success',
        data: wishlists
    });    
});

exports.postWishlist = catchAsync(async (req, res, next) => {
    if(req.params) {
        req.body.building = req.params.building;
    }
    req.body.user = req.user;

    const doc = await Wishlist.create(req.body);

    // console.log(doc);
    res.json({
        status: "success",
        data: doc
    });
});

exports.deleteWishlist = catchAsync(async (req, res, next) => {
    const buildingId = req.params.building;
    const wishlist = await Wishlist.findOneAndDelete({building: buildingId});

    if(!wishlist) {
        return next(new AppError(`No documents found with that ID`, 404));
    }
    
    res.json({
        status: "success",
        data: null
    });
});