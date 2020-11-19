const multer = require('multer');
const sharp = require('sharp');
const User = require("../models/usersModel");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');
const factory = require('./handleFactory');

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//     }
// });
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

exports.updateUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if(!req.file) {
        return next();
    }

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);
    
    next();
});

const filter = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });
    return newObj;
};

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

exports.createUser = catchAsync( async(req, res, next) => {
    res.json({
        status: "error",
        message : "This route is not defined yet",
    });
});

exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.getMe = catchAsync( async(req, res, next) => {
    req.params.id = req.user.id;

    next();
});

exports.deleteMe = catchAsync( async(req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.json({
        status: "success",
        data : null,
    });

    next();
});

exports.updateMe = catchAsync( async(req, res, next) => {
    // console.log(req.file);
    // console.log(req.body);
    // 1) Create error if user PATCHes password data
    if(req.body.password || req.body.confirmPassword) {
        return next(new AppError("This route is not for password updates. Please use /updatePassword", 400));
    }

    // 2) Update your document
    const filterBody = filter(req.body, 'name', 'email');
    if(req.file) filterBody.photo = req.file.filename;

    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {new: true, runValidators: true});

    res.json({
        status: "success",
        data: updateUser
    });

    next();
});