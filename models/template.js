const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        maxLength: 70,
        trim: true
    },
    desc: {
        type: String,
        maxLength: 200,
        trim: true
    },
    fields: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    type: {
        type: String,
        enum: ['default', 'user'],
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v; 
            return ret;
        }
    }
});

module.exports = mongoose.model('Template', templateSchema);