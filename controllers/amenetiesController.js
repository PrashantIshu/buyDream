const Amenety = require("../models/amenetiesModel");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');
const factory = require('./handleFactory');

exports.getAllAmeneties = factory.getAll(Amenety);

exports.getAmeneties = factory.getOne(Amenety, {path: 'ameneties'});

exports.createAmeneties = factory.createOne(Amenety);

exports.deleteAmeneties = catchAsync(async(req, res, next) => {
    const doc = await Amenety.findOneAndDelete({name: req.params.amenetyName});
            
    if(!doc) {
        return next(new AppError('No documents found with that ID', 404));
    }
    
    res.json({
        status: "success",
        data: null
    });
});

exports.updateAmeneties = factory.updateOne(Amenety);

exports.getBuildingId = catchAsync(async(req, res, next) => {
    if(!req.body.building) req.body.building = req.params.buildingId;
    next();
});

exports.addExistingAmenetyToABuilding = catchAsync( async(req, res, next) => {
    const amenety = await Amenety.findOne({name: req.body.name});
    
    if(!amenety) {
        return next();
    }
    
    if(amenety.building.includes(req.body.building)) {
        return next(new AppError('This amenety is already present in this building', 400));
    }

    await amenety.building.push(req.body.building);

    const updateBuildingList = await Amenety.findByIdAndUpdate(amenety._id, {building: amenety.building}, {
        new: true,
        runValidators: true
    });

    res.json({
        status: "success",
        data: updateBuildingList
    });
});

exports.removeAmentyFromABuilding = catchAsync( async(req, res, next) => {
    if(!req.params.buildingId) {
        return next();
    }

    let amenety = await Amenety.findOne({name: req.params.amenetyName});

    // const amenety = await Amenety.findById(req.params.id);
    console.log(amenety);
    if(amenety.building.length === 1) {
        return next();
    } 

    function checkBuildingId(id) {
        return id != req.params.buildingId;
    }
    const newAmeneties = await amenety.building.filter(checkBuildingId);
    
    const updateBuildingList = await Amenety.findByIdAndUpdate(amenety._id, {building: newAmeneties}, {
        new: true,
        runValidators: true
    });

    res.json({
        status: "success",
        data: updateBuildingList
    });
});
