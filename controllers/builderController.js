const multer = require('multer');
const sharp = require('sharp');
const Builder = require("../models/builderModel");
const Building = require("../models/buildingsModel");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');
const factory = require('./handleFactory');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError("Not an image! Please upload only image.", 404), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.updateBuilderPhoto = upload.single('logo');

exports.resizeBuilderPhoto = catchAsync(async (req, res, next) => {
    if(!req.file) {
        return next();
    }

    req.body.logo = `builder-${req.params.id}-${Date.now()}.jpeg`
    console.log(req.file.filename);
    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/builders/${req.body.logo}`);
    
    next();
});

exports.getAllBuilders = factory.getAll(Builder);

exports.getBuilder = factory.getOne(Builder);

exports.getBuildingId = catchAsync(async(req, res, next) => {
    if(!req.body.building) req.body.building = req.params.buildingId;
    next();
});

exports.addExistingBuilderToABuilding = catchAsync( async(req, res, next) => {
    const builder = await Builder.findOne({name: req.body.name});
    
    if(!builder) {
        return next();
    }

    const newDoc = await Building.findByIdAndUpdate(req.body.building, {builder: builder._id}, {new: true, runValidators: true});
    if(!newDoc) {
        return next(new AppError('No documents found with that ID', 404));
    }

    if(builder.building.includes(req.body.building)) {
        return next(new AppError('This amenety is already present in this building', 400));
    }

    await builder.building.push(req.body.building);

    const updateBuildingList = await Builder.findByIdAndUpdate(builder._id, {building: builder.building}, {
        new: true,
        runValidators: true
    });

    res.json({
        status: "success",
        data: updateBuildingList
    });
});

exports.removeBuilderFromABuilding = catchAsync( async(req, res, next) => {
    if(!req.params.buildingId) {
        return next();
    }

    let builder = await Builder.findOne({name: req.params.builderName});

    // const amenety = await Amenety.findById(req.params.id);
    // console.log(builder);
    const newDoc = await Building.findByIdAndUpdate(req.params.buildingId, {builder: null}, {new: true, runValidators: true});
    if(!newDoc) {
        return next(new AppError('No documents found with that ID', 404));
    }

    if(builder.building.length === 1) {
        req.params.id = builder._id;
        return next();
    } 

    function checkBuildingId(id) {
        return id != req.params.buildingId;
    }
    const newBuildings = await builder.building.filter(checkBuildingId);
    
    const updateBuildingList = await Builder.findByIdAndUpdate(builder._id, {building: newBuildings}, {
        new: true,
        runValidators: true
    });

    res.json({
        status: "success",
        data: updateBuildingList
    });
});

exports.createBuilder = catchAsync(async(req, res) => {
    let doc = await Builder.create(req.body);

    const newDoc = await Building.findByIdAndUpdate(req.body.building, {builder: doc._id}, {new: true, runValidators: true});
    if(!newDoc) {
        return next(new AppError('No documents found with that ID', 404));
    }
    // const build = await Building.findById(req.params.buildingId);
    // if(!build.builder) {
    //     const newDoc = await Building.findByIdAndUpdate(req.params.buildingId, {builder: null}, {new: true, runValidators: true});
    //     if(!newDoc) {
    //         return next(new AppError('No documents found with that ID', 404));
    //     }
    // } else {
    //     return next(new AppError('Some other Builder is already associated with this building.', 404));
    // }

    res.json({
        status: "success",
        data: doc
    });
});


exports.deleteBuilder = factory.deleteOne(Builder);

exports.updateBuilder = factory.updateOne(Builder);