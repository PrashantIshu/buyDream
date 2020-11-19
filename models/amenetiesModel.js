const mongoose = require('mongoose');

const amenetiesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "The ameneties must have a type"],
        enum: ['Leisure', 'Sports', 'Security', 'Environment', 'Others'],
        default: 'others',
        trim: true
    },
    name: {
        type: String,
        required: [true, "The ameneties must have a name"],
        unique: true
    },
    building: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Building',
            required: [true, "The ameneties must belong to a building"]
        }
    ],
    slug: String
});

amenetiesSchema.index({ name: 1, type: 1 }, { unique: true });
amenetiesSchema.index({ name: 1 }, { unique: true });

const Amenety = new mongoose.model('Amenety', amenetiesSchema);

module.exports = Amenety;