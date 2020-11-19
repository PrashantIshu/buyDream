const multer = require('multer');
const sharp = require('sharp');
const House = require("../models/housesModel");
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

exports.uploadHouseImage = upload.single('image');

exports.resizeHousePhoto = catchAsync(async (req, res, next) => {
    if(!req.file) {
        return next();
    }

    if(req.params.id) {
        req.body.image = `house-${req.params.id}-${Date.now()}.jpeg`;
    } else {
        req.body.image = `house-${Date.now()}.jpeg`;
    }
    
    await sharp(req.file.buffer)
        .resize(2000, 1300)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/houses/${req.body.image}`);
    next();
});


exports.getAllHouses = factory.getAll(House);

exports.getHouse = factory.getOne(House);

exports.createHouse = catchAsync(async(req, res, next) => {
    const doc = await House.create(req.body);

    res.json({
        status: "success",
        data: doc
    });

    next();
});
exports.updateHouse = factory.updateOne(House);

exports.deleteHouse = factory.deleteOne(House);

exports.flatTypes = catchAsync(async(req, res, next) => {
    let filter = {};
    if(req.params.buildingId) filter = {building: req.params.buildingId};

    const houses = await House.find(filter).find({flatType: req.params.flatType});

    res.json({
        status: "Success",
        results: houses.length,
        data: {
            houses
        }
    });
});
