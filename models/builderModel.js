const mongoose = require('mongoose');
const validator = require('validator');

const builderSchema = new mongoose.Schema({
    experience: {
        type: Number
        // required: [true, "The ameneties must have a type"],
    },
    name: {
        type: String,
        required: [true, "The builder must have a name"],
        unique: true
    },
    totalProjects: {
        type: Number
        // required: [true, "The ameneties must belong to a building"]
    },
    projectsCompleted: {
        type: Number
        // required: [true, "The Builder must belong to a building"]
    },
    operatingIn: {
        type: String
    },
    contactEmail: {
        type: String,
        required: [true, 'A Builder must have a email'],
        // unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: Number,
        minlength: 10
    }, 
    about: {
        type: String
    },
    logo: {
        type: String,
        default: 'default.jpg'
    },
    building: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Building',
            required: [true, "The builder must belong to a building"]
        }
    ],
});

builderSchema.index({ name: 1 }, { unique: true });
builderSchema.index({ name: 1, building: 1 }, { unique: true });

const Builder = new mongoose.model('Builder', builderSchema);

module.exports = Builder;