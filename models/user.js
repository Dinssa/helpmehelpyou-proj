const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;

// User model (basic implementation, only fields for authentication)

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Always saves as lowercase, so we don't have to worry about case sensitivity when logging in
        trim: true // Removes whitespace (only at beginning and end of string)
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 3
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true, // Include virtual properties when converting document to JSON
        transform: (doc, ret) => {
            delete ret.password; // Delete the password property when converting document to JSON
            delete ret._id; // Delete the _id property when converting document to JSON
            delete ret.__v; // Delete the __v property when converting document to JSON
            return ret;
        }
    }
});

// Just before saving out user, after validation and right before saving to DB, we want to hash the password
// We'll use bcrypt to hash the password, but mongoose provides us with a pre hook so we can execute a callback function just before the user is created

userSchema.pre('save', function (next) {
    // 'this' will be set to the current document about to be saved
    // We need to check if the password has been modified, because we don't want to hash it again (hash a hash) if it hasn't been modified
    if (this.isModified('password')) {
        // Hash the password
        const hash = bcrypt.hashSync(this.password, SALT_ROUNDS);
        // Reassign the password to the hashed version
        this.password = hash;
    }
    // Call next() so that the next middleware in the chain can run
    next();
});


// ! Always make sure to export the model last
// We assign the model to a variable so we can use it in other files, and use model methods to CRUD our data
module.exports = mongoose.model('User', userSchema); // Export the model with the schema attached