const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A User must have a name'],
    },
    email: {
        type: String,
        required: [true, 'A User must have a name'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'A User must have a password'],
        minlength: 8,
        // select: false
    },
    confirmPassword: {
        type: String,
        required: [true],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not same'
        }
    },
    role: {
        type: String,
        enum: ['admin', 'owner', 'agent', 'user', 'builder'],
        default: 'user'
    },
    photo : {
        type: String,
        default: 'default.jpg'
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    contactEmail: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: Number,
        minlength: 10
    }
    // building: [
    //     {
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'Building'
    //     }
    // ]
});

userSchema.pre('save', async function(next) {
    var bcrypt = require('bcryptjs');

    this.password = await bcrypt.hash(this.password, 12);

    this.confirmPassword = undefined;
    
    next();
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000; 
    next();
});

// userSchema.pre('save', function(next) {
//     this.populate({
//         path: 'building'
//     });
//     next();
// });

userSchema.pre(/^find/, function(next) {
    this.find({active: {$ne: false}});
    next();
});

userSchema.methods.correctPassword = async function(password, hash) {
    const result = await bcrypt.compare(password, hash);
    return result;
};

userSchema.methods.passwordChanged = function(JWTtimeStamp) {
    if(this.passwordChangedAt) {
        const passwordChangedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        // console.log(passwordChangedTimestamp, JWTtimeStamp);

        return JWTtimeStamp < passwordChangedTimestamp;
    }
    
    return false;
};

userSchema.methods.createPasswordResetToken = () => {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); //encrypting resetToke to store in database.

    console.log({resetToken}, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 6 * 1000;
    
    return resetToken;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;