const APIFeatures = require('./../utils/api-features');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/app-error');
const got = require('got');

exports.deleteOne = Model => catchAsync(async(req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
            
    if(!doc) {
        // console.log(req.params.id);
        return next(new AppError('No documents found with that ID', 404));
    }
    
    res.json({
        status: "success",
        data: null
    });
});

exports.updateOne = Model => catchAsync(async(req, res, next) => {
    let newDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if(!newDoc) {
        return next(new AppError('No documents found with that ID', 404));
    }

    if(req.body.address) {
        // const address = "Anand Parmila Kunj-305, Rd no.-4, Nehru Nagar, Patna, Bihar-800013";
        const response = await got(`https://api.opencagedata.com/geocode/v1/json?q=${req.body.address}&key=b5dc8768af2d4f29bfa91550131227ce`);
        lat = JSON.parse(response.body).results[0].geometry.lat;
        lng = JSON.parse(response.body).results[0].geometry.lng;

        newDoc = await Model.findByIdAndUpdate(newDoc._id, {coordinates: [lng, lat]}, {new: true, runValidators: true});
    }

    res.json({
        status: "success",
        data: newDoc
    });
});

exports.createOne = Model => catchAsync(async(req, res) => {
    let doc = await Model.create(req.body);

    if(req.body.address) {
        // const address = "Anand Parmila Kunj-305, Rd no.-4, Nehru Nagar, Patna, Bihar-800013";
        const response = await got(`https://api.opencagedata.com/geocode/v1/json?q=${req.body.address}&key=b5dc8768af2d4f29bfa91550131227ce`);
        lat = JSON.parse(response.body).results[0].geometry.lat;
        lng = JSON.parse(response.body).results[0].geometry.lng;

        doc = await Model.findByIdAndUpdate(doc._id, {coordinates: [lng, lat]}, {new: true, runValidators: true});
    }

    res.json({
        status: "success",
        data: doc
    });
});

exports.getOne = (Model, populateOption) => catchAsync(async(req, res, next) => {
    let query;
    query = await Model.findById(req.params.id);
    
    if(populateOption) query = query.populate(populateOption);

    const doc = await query;

    if(!doc) {
        return next(new AppError('No documents found with that ID', 404));
    }

    res.json({
        status: "success",
        data: doc
    });
});

exports.getAll = Model => catchAsync(async(req, res) => {
    let filter = {};
    if(req.params.buildingId) filter = {building: req.params.buildingId};

    const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields();
    // const docs = await features.query.explain();
    let docs = await features.query;

    
    res.json({
        status: "success",
        results: docs.length,
        data: docs
    });

});

exports.getDocsWithin = Model => catchAsync( async(req, res, next) => {
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
    
    const docs = await Model.find({
        coordinates: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });
    
    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
          data: docs
        }
    });    
});

exports.getDistances = Model => catchAsync( async(req, res, next) => {
    const {latlng, unit } = req.params;
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
    
    const docs = await Model.aggregate([
        {
            $geoNear: {
                near: {
                    // type: 'Point',
                    coordinates: [lng * 1, lat * 1]
                    // [ lng * 1, lat * 1 ]
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier
            }
        },
        {
            $project: {
                distance: 1,
                name: 1
            }
        }
    ]);
    
    res.status(200).json({
        status: 'success',
        data: {
          data: docs
        }
    });    
});

exports.searchDocs = Model => catchAsync(async (req, res, next) => {
    const docs = await Model.find( { $text: { $search: req.body.string } },
                                    { score: { $meta: "textScore" } } )
                                .sort( { score: { $meta: "textScore" } } );

    res.status(200).json({
        status: 'success',
        data: docs
    });    
});
