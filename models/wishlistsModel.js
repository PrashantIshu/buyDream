const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    building: {
        type: mongoose.Schema.ObjectId,
        ref: 'Building'
    }
});

wishlistSchema.pre('save', function(next) {
    this.populate({
        path: 'building',
        path: 'user',
    });

    next();
});
wishlistSchema.index({ user: 1, building: 1 }, { unique: true });

const Wishlist = new mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;