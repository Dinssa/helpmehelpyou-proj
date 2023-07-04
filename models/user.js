const mongoose = require('mongoose');

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
            return ret;
        }
    }
});




// Always make sure to export the model last
// We assign the model to a variable so we can use it in other files, and use model methods to CRUD our data
module.exports = mongoose.model('User', userSchema); // Export the model with the schema attached