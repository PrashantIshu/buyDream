const mongoose = require('mongoose');
const ResidentialHouse = require('./residentialHouseModel');

const residentialHouseReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review cannot be empty"]
    },
    rating: {
        type: Number,
        max: 5,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    residentialHouse: {
        type: mongoose.Schema.ObjectId,
        ref: 'ResidentialHouse',
        required: [true, 'Review must belong to a ResidentialHouse']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user'] 
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Restricting same user to post more than one review on a particular tour
residentialHouseReviewSchema.index({ residentialHouse: 1, user: 1 }, { unique: true });

residentialHouseReviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'residentialHouse',
        select: '_id'
    }).populate({
        path: 'user',
        // select: 'name photo'
    });
    
    next();
});

residentialHouseReviewSchema.statics.calAverageRatings = async function(residentialHouseId) {
    const stats = await this.aggregate([
        {
            $match: {
                residentialHouse: residentialHouseId 
            }
        },
        {
            $group: {
                _id: '$residentialHouse',
                nRatings: {$sum: 1},
                avgRating: {$avg: '$rating'},
            }
        }
    ]);
    console.log(stats);
    
    if (stats.length > 0) {
        await ResidentialHouse.findByIdAndUpdate(residentialHouseId, {
          ratingsQuantity: stats[0].nRatings,
          ratingsAverage: stats[0].avgRating
        });
      } else {
        await ResidentialHouse.findByIdAndUpdate(residentialHouseId, {
          ratingsQuantity: 0,
          ratingsAverage: 0
        });
      }
};

residentialHouseReviewSchema.post('save', function() {
    //this points to current review

    this.constructor.calAverageRatings(this.residentialHouse);
});

// findByIdAndUpdate
// findByIdAndDelete
residentialHouseReviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    // console.log(this.r);
    next();
});

residentialHouseReviewSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calAverageRatings(this.r.residentialHouse._id);
});

const ResidentialHouseReview = new mongoose.model('ResidentialHouseReview', residentialHouseReviewSchema);

module.exports = ResidentialHouseReview;