const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

// const defaultAvatar = '/assets/images/user-solid.svg';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
    avatar: {
        type: String,
        // default: defaultAvatar
    },
    googleId: String,
    roles: [{
        type: String,
        enum: ['Client', 'Freelancer', 'Admin'],
        default: 'Client'
    }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.password;
            delete ret._id;
            delete ret.__v; 
            return ret;
        }
    }
});

userSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const hash = bcrypt.hashSync(this.password, SALT_ROUNDS);
        this.password = hash;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);