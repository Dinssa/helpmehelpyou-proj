const mongoose = require('mongoose');

defaultIcons = [
    'fa-solid fa-leaf',
    'fa-solid fa-seeding',
];

const templateSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        maxLength: 70,
        trim: true
    },
    icon: {
        type: String,
        default: function() {
            return defaultIcons[Math.floor(Math.random() * defaultIcons.length)];
        }
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
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