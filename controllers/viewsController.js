const Building = require('../models/buildingsModel');
const House = require('../models/housesModel');
const Review = require('../models/reviewModel');
const Amenety = require('../models/amenetiesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/app-error');
const Wishlist = require('../models/wishlistsModel');
const Builder = require('../models/builderModel');

const adminExistsOrNot = (user) => {
    let admin = false;
    
    if(user) {
        if(user.role === 'admin') {
            admin = true;
        } else {
            admin = false;
        }         
    }

    return admin;
};

const agentOrOwnerExistsOrNot = (user, building) => {
    let agentOrOwnerExists = false;
    const currentUserId = user._id;
    building.agentOrOwner.forEach(el => {
        el = JSON.stringify(el);
        if(el ===  JSON.stringify(currentUserId)) {
            agentOrOwnerExists = true;
        } 
    });

    return agentOrOwnerExists;
};

exports.getOverview = catchAsync( async(req, res) => {
    // 1) Get Building data from thecollection
    const buildings = await Building.find();
    
    //////// Restrict User /////////
    const building = await Building.find({slug: req.params.slug});

    let admin = false;
    if(res.locals.user) {
        admin = adminExistsOrNot(res.locals.user);
    }
    let myProperties = false;
    const myWishlists = false;
    const overview = true;

    //////// Get Builder ////////
    // buildings.forEach( el => {
    //     if(el.builder){
    //         console.log(el.builder);
    //     }
    // });
    // if(building[0].builder) {
    //     if(building[0].builder.name) {
    //         console.log(building[0].builder.name);
    //     }
    // }
    // const builder = await Builder.findById(building[0].builder

    res.render('overview', {
        title: 'All Buildings',
        buildings,
        admin,
        myProperties,
        myWishlists,
        overview
        // agentOrOwnerExists
    });
});

exports.getMyProperties = catchAsync(async (req, res) => {
    const building = await Building.find();

    let buildings = [];
    // console.log(res.locals.user._id);
    if(res.locals.user._id) {
        building.forEach(el => {
            el.agentOrOwner.forEach(element => {
                element = JSON.stringify(element);
                if(element === JSON.stringify(res.locals.user._id)) {
                    // console.log(element);
                    buildings.push(el);
                }
            });
        });
    }
    // console.log(item);

    let agentOrOwner = true;
    // if(res.locals.user) {
    //     agentOrOwnerExists = agentOrOwnerExistsOrNot(res.locals.user, building[0]);
    //     console.log(agentOrOwnerExists);
    // }

    let myProperties = true;
    const myWishlists = false;
    const overview = false;
    res.render('overview', {
        title: "My Properties",
        buildings,
        myProperties,
        agentOrOwner,
        myWishlists,
        overview
    });
});

exports.getMinToMaxPrice = catchAsync( async(req, res) => {
    const buildings = await Building.aggregate([
        {
            $match: { price: { $gte: 0 } }
        },
        {
            $sort: { price: 1 }
        }
    ]);

    res.render('overview', {
        title: 'All Buildings',
        buildings
    });
});

exports.getMaxToMinPrice = catchAsync( async(req, res) => {
    const buildings = await Building.aggregate([
        {
            $match: { price: { $gte: 0 } }
        },
        {
            $sort: { price: -1 }
        }
    ]);

    res.render('overview', {
        title: 'All Buildings',
        buildings
    });
});

exports.getMinToMaxRating = catchAsync( async(req, res) => {
    const buildings = await Building.aggregate([
        {
            $match: { ratingsAverage: { $gte: 0 } }
        },
        {
            $sort: { ratingsAverage: 1 }
        }
    ]);

    res.render('overview', {
        title: 'All Buildings',
        buildings
    });
});

exports.getMaxToMinRating = catchAsync( async(req, res) => {
    const buildings = await Building.aggregate([
        {
            $match: { ratingsAverage: { $gte: 0 } }
        },
        {
            $sort: { ratingsAverage: -1 }
        }
    ]);

    res.render('overview', {
        title: 'All Buildings',
        buildings
    });
});

exports.getHouses = catchAsync( async(req, res) => {
    // 1) Get Houses data from thecollection
    const building = await Building.find({slug: req.params.slug});

    const buildingName = building[0].slug;
    const id = building[0]._id;
    const houses = await House.find({building: building[0]._id});
    
    let ghar = [];
    houses.forEach( el => {
        ghar.push(el._id);
    });
    // console.log(ghar);

    const firstFlatType = building[0].propertiesAvailable[0];

    //////////  Stats for Ameneties //////////
    const ameneties = await Amenety.aggregate([
        {
            $match: {building: {$eq: building[0]._id}}
        },
        {
            $group: {
                _id: '$type',
                numAmeneties: { $sum: 1 },
                names: { $push: '$name' }
            }
        },
        {
            $sort: { _id: -1 }
        }
    ]);
   
    let types = [false, false, false, false, false];
    if(ameneties.length > 0) {
        ameneties.forEach( (el, index) => {
            if(el.names.length > 0) {
                types[index] = true;
            }
        });
    }
    // console.log(types);
    // console.log(ameneties);

    let remainingAmeneties = [];
    let test = false;
    let amen = ['Sports', 'Security', 'Others', 'Leisure', 'Environment'];
    amen.forEach( (el, index) => {
        test = false;
        // console.log("amen = ",el);
        ameneties.forEach( element => {
            // console.log("ameneties = ",element._id);
            if(element._id === el) {
                test = true;
            }
        });
        // console.log("test = ", test);
        if(test === false) {
            remainingAmeneties.push(el);
        }
    });
    // console.log(remainingAmeneties);
    
    /////// restrict user ///////
    const admin = adminExistsOrNot(res.locals.user);
    let agent = null;
    let agentOrOwnerExists = false;
    if(res.locals.user) {
        agentOrOwnerExists = agentOrOwnerExistsOrNot(res.locals.user, building[0]);
        if(agentOrOwnerExists) {
            agent = res.locals.user;
            agent = agent._id;
        }
    }

    /////// For Reviews ///////
    const reviews = await Review.find({building: building[0]._id});
    const reviewBuilding = building[0];
    
    let ratingStars = [0, 0, 0, 0, 0];
    reviews.forEach( (el, index) => {
        if(el.rating === 5) {
            ratingStars[0] = ratingStars[0] + 1; 
        } else if(el.rating === 4) {
            ratingStars[1] = ratingStars[1] + 1;
        } else if(el.rating === 3) {
            ratingStars[2] = ratingStars[2] + 1;
        } else if(el.rating === 2) {
            ratingStars[3] = ratingStars[3] + 1;
        } else if(el.rating === 1) {
            ratingStars[4] = ratingStars[4] + 1;
        }
    });
    ratingStars.forEach( (el, index) => {
        ratingStars[index] = Math.floor( (el / reviewBuilding.ratingsQuantity ) * 100);
    });
    // console.log(building[0].imageCover);


    /////// For Builders //////
    const builders = await Builder.find();
    let builder;
    builders.forEach( element => {
        let buildIds = JSON.stringify(building[0]._id);
        element.building.forEach( async el => {
            el = JSON.stringify(el);
            if(el === buildIds) {
                builder = element;
            }
        });
    });

    if(builder) {
        if(builder.about) {
            var builderAbout = builder.about.substring(0, 100);
        }
    }

    res.render('building', {
        title: 'Houses',
        building,
        buildingName,
        houses,
        firstFlatType,
        ameneties,
        length: ameneties.length,
        types,
        remainingAmeneties,
        amen,
        id,
        admin, agent,
        agentOrOwnerExists,
        ghar,
        reviews,
        reviewBuilding, ratingStars,
        builder, builderAbout
    });
});

exports.login = catchAsync(async(req, res, next) => {
    res.render('login', {
        title: 'LogIn'
    });
});

exports.signup = catchAsync(async(req, res, next) => {
    res.render('signup', {
        title: 'SignUp'
    });
});

exports.sellBuilding = catchAsync(async(req, res, next) => {
    const currentUserId = res.locals.user._id;

    res.render('postBuilding', {
        title: 'Sell Your Property',
        currentUserId
    });
});

exports.sellHouseAmen = catchAsync(async(req, res, next) => {
    const building = await Building.find({slug: req.params.slug});
    const buildingId = building[0]._id;
    const buildingName = building[0].slug

    res.render('postHousesAmen', {
        title: 'Sell Your House',
        buildingId,
        buildingName
    });
});

exports.getMe = catchAsync( async( req, res, next) => {
    
    res.render("userSettings", {
        title: "Profile"
    });
});

exports.getMyWishlists = catchAsync(async (req, res, next) => {
    const wishlists = await Wishlist.find({user: req.user});
    if(!wishlists) {
        return next(new AppError('You have no Wishlists', 404));
    }
    console.log(wishlists);

    let houses = [];
    let buildings = [];
    let houseId;
    let buildingId;
    let i;
    for(i=0; i<wishlists.length; i++) {
        building = await Building.findById(wishlists[i].building);
        buildings.push(building);    
    }
    // console.log(buildings);

    // const myProperties = false;
    // const overview = false;
    // const myWishlists = true;
    res.render("myWishlists", {
        title: "My Wishlists",
        buildings
        // myProperties,
        // myWishlists,
        // overview
    });
});

exports.getBuildingsNearMe = catchAsync( async(req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

    if (!lat || !lng) {
        next(
          new AppError(
            'Please provide latitutr and longitude in the format lat,lng.',
            400
          )
        );
    }
    
    const buildings = await Building.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }
        },
    ]);

    // console.log(buildings);
    res.render('overview', {
        title: 'All Buildings',
        buildings
    });
});

exports.getBuildingsWithinDistance = catchAsync(async (req, res, next) => {
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) {
        next(
          new AppError(
            'Please provide latitutr and longitude in the format lat,lng.',
            400
          )
        );
    }
    
    const buildings = await Building.find({
        coordinates: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });

    res.render('overview', {
        title: 'All Buildings',
        buildings
    });
});

exports.getMyReviews = catchAsync( async(req, res, next) => {
    const reviews = await Review.find({user: res.locals.user._id});
    // console.log(reviews);

    res.render('myReviews', {
        title: 'My Reviews',
        reviews
    });
});

exports.searchedDocs = catchAsync(async (req, res, next) => {
    const buildings = await Building.find( { $text: { $search: req.params.string } },
                                    { score: { $meta: "textScore" } } )
                                .sort( { score: { $meta: "textScore" } } );
    
    // console.log(buildings);
    res.render('overview', {
        title: 'All Buildings',
        buildings
    });
});

exports.updateBuilding = catchAsync (async (req, res, next) => {
    let building = await Building.find({slug: req.params.slug});
    building = building[0];
    console.log(building.imageCover);
    console.log(building.images[0]);
    console.log(building.images[1]);
    console.log(building.images[2]);
    
    res.render('updateBuilding', {
        title: 'Update Building',
        building
    });
});

exports.updateHouse = catchAsync( async(req, res, next) => {
    const house = await House.findById(req.params.id);
    const building = await Building.findById(house.building);
    const slug = building.slug;

    res.render('updateHouse', {
        title: 'Update House',
        house,
        slug
    });
});

exports.aboutTheDeveloper = catchAsync( async(req, res, next) => {
    res.render('aboutDeveloper', {
        title: 'About Developer',
    });
});