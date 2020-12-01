const mongoose = require('mongoose');
const Building = require('./buildingsModel');

const reviewSchema = new mongoose.Schema({
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
    building: {
        type: mongoose.Schema.ObjectId,
        ref: 'Building',
        required: [true, 'Review must belong to a Building']
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
reviewSchema.index({ building: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next){
    this.populate({
        path: 'building'
    }).populate({
        path: 'user',
        // select: 'name photo'
    });
    
    next();
});

reviewSchema.statics.calAverageRatings = async function(buildingId) {
    const stats = await this.aggregate([
        {
            $match: {
               building: buildingId 
            }
        },
        {
            $group: {
                _id: '$building',
                nRatings: {$sum: 1},
                avgRating: {$avg: '$rating'},
            }
        }
    ]);
    console.log(stats);
    
    if (stats.length > 0) {
        await Building.findByIdAndUpdate(buildingId, {
          ratingsQuantity: stats[0].nRatings,
          ratingsAverage: stats[0].avgRating
        });
      } else {
        await Building.findByIdAndUpdate(buildingId, {
          ratingsQuantity: 0,
          ratingsAverage: 0
        });
      }
};

reviewSchema.post('save', function() {
    //this points to current review

    this.constructor.calAverageRatings(this.building);
});

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne();
    // console.log(this.r);
    next();
});

reviewSchema.post(/^findOneAnd/, async function() {
    // await this.findOne(); does NOT work here, query has already executed
    await this.r.constructor.calAverageRatings(this.r.building._id);
});

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review;