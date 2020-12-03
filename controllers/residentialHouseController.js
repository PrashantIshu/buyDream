const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const ResidentialHouse = require('../models/residentialHouseModel');
// const House = require('../models/housesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');
const factory = require('./handleFactory');
// const Builder = require('../models/builderModel');
// const User = require('../models/usersModel');
const sendEmail = require('../utils/bookingEmail');

// const buildings = JSON.parse(fs.readFileSync(`./dev-data/property.json`));

// const testBuildings = new Building({buildings});


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

exports.uploadResidentialHouseImages = upload.fields([
    { name: 'imageCover', maxCount: 1},
    { name: 'images', maxCount: 3}
]);

exports.resizeResidentialHouseImages = catchAsync( async (req, res, next) => {
    // console.log(req.files);

    if( !req.files.imageCover || !req.files.images ) return next();

    //1) Cover Image
    if(req.params.id) {
        req.body.imageCover = `residentialHouse-${req.params.id}-${Date.now()}-cover.jpeg`;
    } else {
        req.body.imageCover = `residentialHouse-${req.body.buildingNumber}-${Date.now()}-cover.jpeg`;
    }
    
    await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 1300)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/residentialHouse/${req.body.imageCover}`);

        // 2) Images
    req.body.images = [];

    await Promise.all(
    req.files.images.map(async (file, i) => {
        let filename;
        if(req.params.id) {
            filename = `residentialHouse-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
        } else {
            filename = `residentialHouse-${Date.now()}-${i + 1}.jpeg`;
        }
        await sharp(file.buffer)
            .resize(2000, 1333)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/residentialHouse/${filename}`);

        req.body.images.push(filename);
    })
    );
    next();
});

// exports.getMostRatedBuildings = async(req, res, next) => {
//     req.query.limit='5';
//     req.query.sort='-ratingsAverage,price';
//     req.query.fields='name,address,ratingsAverage,price,summary';

//     next();
// };

// exports.getOneBuilding = factory.getOne(Building, {path: 'ameneties'});

exports.getAllResidentialHouse = factory.getAll(ResidentialHouse);

exports.getOneResidentialHouse = catchAsync(async(req, res, next) => {
    
    // const residentialHouses = await ResidentialHouse.findById(req.params.id).populate('ameneties').populate('reviews').populate('houses');
    const residentialHouses = await ResidentialHouse.findById(req.params.id).populate('reviews');
    if(!residentialHouses) {
        return next(new AppError('No documents found with that ID', 404));
    }

    res.json({
        status: "success",
        data: residentialHouses
    });
});

exports.createResidentialHouse = factory.createOne(ResidentialHouse);

exports.updateResidentialHouse = factory.updateOne(ResidentialHouse);

exports.deleteResidentialHouse = factory.deleteOne(ResidentialHouse);

exports.getResidentialHouseWithin = factory.getDocsWithin(ResidentialHouse);

exports.getDistances = factory.getDistances(ResidentialHouse);

exports.searchDocument = factory.searchDocs(ResidentialHouse);

// exports.buildingStats = catchAsync( async(req, res, next) => {
//     const stats = await House.aggregate([
//         {
//             $match: { building : { $ne: 0 }}
//         },
//         {
//             $group: {
//                 _id : '$building',
//                 numHouses: { $sum: 1 },
//                 minPrice: { $min: '$price' },
//                 maxPrice: { $max: '$price' },
//                 avgPrice: { $avg: '$price' },
//                 properties: { $push: '$flatType' },
//                 propertiesSqft: { $push: '$sqftArea' }               
//             }
//         },
//         {
//             $sort: {
//                 numHouses: 1
//             }
//         }
//     ]);
//     if(req.url === '/buildingsStats') {
//         res.json({
//             status: 'success',
//             result: stats.length,
//             data: {
//                 stats
//             }
//         });
//     } else {
//         await stats.forEach( async el => {
//             const building = await Building.findByIdAndUpdate(el._id, {price: el.minPrice}, {new: true, runValidators: true});  
//         });
//     }  
 
// });



// exports.bookHouseMail = catchAsync( async(req, res, next) => {
//     const building = await Building.findById(req.params.building);
//     const builder = await Builder.findById(req.params.builderOrAgent);
//     const agent = await User.findById(req.params.builderOrAgent);
    
//     // console.log(builder);
//     // console.log(agent);

//     const { name, email, phone } = req.body;
//     let mailTo;
//     const message = `${name} is interested in your ${building.name} property. Get In touch with him/her.
//                     His/Her contact details are below:- 
//                     Email - ${email}
//                     Phone - ${phone}`;

//     if (builder) {
//         clientMessage = `You Contacted Builder of ${building.name}, ${building.address}.
//                             Average Price ${building.price}.
//                             Below are his contact details:- 
//                             Email - ${builder.contactEmail}
//                             Phone - ${builder.phone}`;
//         mailTo = builder;
//     }
//     if (agent) {
//         clientMessage = `You Contacted Agent of ${building.name}, ${building.address}.
//                             Average Price ${building.price}.
//                             Below are his contact details:- 
//                             Email - ${agent.contactEmail}
//                             Phone - ${agent.phone}`;
//         mailTo = agent;
//     }
//     // console.log(mailTo.contactEmail);
//     const builderOrAgentMail = await sendEmail({
//         email: mailTo.contactEmail,
//         subject: 'Congratulations! Someone liked your property',
//         message
//     });
//     const clientMail = await sendEmail({
//             email,
//             subject: `Congratulations! You Contacted ${building.name}`,
//             message: clientMessage
//     });

//     res.json({
//         status: 'success',
//         message: 'Booking Contact details sent to email!'
//     });

//     next();
// });
