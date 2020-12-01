const mongoose = require('mongoose');
const slugify = require('slugify');


const buildingsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A building must have a name"],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have more or equal then 10 characters']
    },
    coordinates: {
        type: [Number]
    },
    address: {
        type: String
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7 
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        //required: [true, "A building must have its price"]
    },
    priceSameUnit: [
        {
            type: Number
        }
    ],
    priceSameUnitSum: {
        type: Number
    },
    priceUnit: {
        type: String
    },
    description: {
        type: String,
        trim: true,
    },
    buildingNumber: Number,
    images: [String],
    imageCover: {
        type: String,
        //required: [true, 'A tour must have a cover image']
    },
    propertiesAvailable: {
        type: [Number],
        //required: [true, "A building must have flat types"]
    },
    sqftAreasAvailable: {
        type: [Number],
        //requied: [true, "The houses must have sqft Areas"]
    },
    locationAdvantages: [
        {
            type: String
        }
    ],
    allPrices: [
        {
            type: Number
        }
    ],
    lakhPrices: [
        {
            type: Number
        }
    ],
    crorePrices: [
        {
            type: Number
        }
    ],
    slug: String,
    agentOrOwner: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    builder: {
        type: mongoose.Schema.ObjectId,
        ref: 'Builder'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Creating Indexes
buildingsSchema.index({ price: 1, ratingsAverage: -1 });
buildingsSchema.index({ slug: 1 });
buildingsSchema.index({ name: 1 });
// buildingsSchema.index({ location: '2dsphere' });
buildingsSchema.index({ coordinates: '2dsphere' });
buildingsSchema.index( {address: "text"} );


// Populate User in Building (Parent Referencing)
buildingsSchema.pre('save', function(next) {
    this.populate({
        path: 'agentOrOwner',
        select: '_id'
    });

    next();
});

// Virtual Populate Review in Building (Virtual Child Referencing)
buildingsSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'building',
    localField: '_id'
});

// Virtual Populate Ameneties in Building (Virtual Child Referencing)
buildingsSchema.virtual('ameneties', {
    ref: 'Amenety',
    foreignField: 'building',
    localField: '_id',
    select: 'type name'
});

// Virtual Populate Houses in Building (Virtual Child Referencing)
buildingsSchema.virtual('houses', {
    ref: 'House',
    foreignField: 'building',
    localField: '_id',
    select: 'flatType sqftArea price'
});

//Document middleware for slugs // only works for .create() or .save()
buildingsSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

// Populating Builder
buildingsSchema.pre(/^find/, function(next){
    this.populate({
        path: 'builder'
    });
    
    next();
});


const Building = new mongoose.model("Building", buildingsSchema); 

module.exports = Building;