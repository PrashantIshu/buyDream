const mongoose = require('mongoose');
const slugify = require('slugify');


const residentialHouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A residentialHouse must have a name"],
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
        set: val => Math.round(val * 10) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        //required: [true, "A building must have its price"]
    },
    priceUnit: {
        type: String
    },
    pricePerUnit: {
        type: Number
    },
    pricePerUnitUnit: {
        type: String
    },
    priceWhole: {
        type: Number
    },
    description: {
        type: String,
        trim: true,
        minlength: [100, 'A description must have more or equal then 10 characters']
    },
    images: [String],
    imageCover: {
        type: String,
        //required: [true, 'A tour must have a cover image']
    },
    flatType: {
        type: Number,
        //required: [true, "A building must have flat types"]
    },
    sqftArea: {
        type: Number,
        //requied: [true, "The houses must have sqft Areas"]
    },
    bedrooms: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    addedDate: {
        type: Date
    },
    locationAdvantages: [
        {
            type: String
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
residentialHouseSchema.index({ slug: 1 });
residentialHouseSchema.index({ name: 1 });
residentialHouseSchema.index({ coordinates: '2dsphere' });
residentialHouseSchema.index( {address: "text"} );

// Populate User in Building (Parent Referencing)
residentialHouseSchema.pre('save', function(next) {
    this.populate({
        path: 'agentOrOwner',
        select: '_id'
    });

    next();
});

// Virtual Populate Review in Building (Virtual Child Referencing)
residentialHouseSchema.virtual('reviews', {
    ref: 'ResidentialHouseReview',
    foreignField: 'residentialHouse',
    localField: '_id'
});

//Document middleware for slugs // only works for .create() or .save()
residentialHouseSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

// Populating Builder
residentialHouseSchema.pre(/^find/, function(next){
    this.populate({
        path: 'builder'
    });
    
    next();
});


residentialHouseSchema.pre('findOneAndUpdate', async function(next) {
    const docToUpdatePre = await this.model.findOne(this.getQuery());
    if(docToUpdatePre) {
        if(docToUpdatePre.pricePerUnit && docToUpdatePre.sqftArea) {
            this._update.price = docToUpdatePre.pricePerUnit * docToUpdatePre.sqftArea;
            this._update.priceWhole = this._update.price;
            if(this._update.price >= 10000000) {
                this._update.priceUnit = "Cr";
                this._update.price = this._update.price / 10000000;
            } else {
                this._update.priceUnit = "Lakh";
                this._update.price = this._update.price / 100000;
            }
        }
    }    
    
    next();
});

const ResidentialHouse = new mongoose.model("ResidentialHouse", residentialHouseSchema); 

module.exports = ResidentialHouse;