const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    building: {
        type: mongoose.Schema.ObjectId,
        ref: 'Building'
    },
    independentHouse: {
        type: mongoose.Schema.ObjectId,
        ref: 'ResidentialHouse'
    }
});

wishlistSchema.pre('save', function(next) {
    this.populate({
        path: 'building',
        path: 'independentHouse',
        path: 'user'
    });

    next();
});
wishlistSchema.index({ user: 1, building: 1, independentHouse: 1  }, { unique: true });

const Wishlist = new mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;