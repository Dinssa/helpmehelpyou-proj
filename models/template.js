const mongoose = require('mongoose');

defaultIcons = [
    'fa-solid fa-leaf',
    'fa-solid fa-seedling',
];

const optionsSchema = new mongoose.Schema({
    placeholder: {
        type: String,
        maxLength: 70,
        trim: true
    },
    min: {
        type: Number,
        min: 0
    },
    max: {
        type: Number,
        min: 0
    },
    step: {
        type: Number,
        min: 0
    },
    options: {
        type: [String],
        trim: true
    },
    multiple: {
        type: Boolean,
        default: false
    },
    accept: {
        type: String,
        trim: true
    },
    pattern: {
        type: String,
        trim: true
    },
    rows: {
        type: Number,
        min: 0
    },
    cols: {
        type: Number,
        min: 0
    },
    size: {
        type: Number,
        min: 0
    },
    checked: {
        type: Boolean,
        default: false
    },
    value: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: false,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const fieldSchema = new mongoose.Schema({
    label: {
        type: String,
        maxLength: 70,
    },
    text: {
        type: String,
    },
    type: {
        type: String,
        enum: ['text', 'number', 'date', 'time', 'email', 'tel', 'url', 'password', 'color', 'range', 'file', 'checkbox', 'radio', 'hidden', 'textarea', 'select', 'plaintext', 'heading', 'subheading', 'paragraph', 'divider'],
        required: true
    },
    options: {
        type: optionsSchema,
        default: {}
    },
    required: {
        type: Boolean,
        default: false
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

fieldSchema.virtual('name').get(function() {
    return `${this.type}${this._id}`;
});


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
        type: [fieldSchema],
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