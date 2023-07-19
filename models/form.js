const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const submissionsSchema = new mongoose.Schema({
    fields: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

const formSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        maxLength: 70,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fields: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    uuid: {
        type: String,
        default: uuidv4,
        set: function(uuid) {
            return uuid.substr(0, 6);
        },
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sharedWith: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    submissions: [submissionsSchema],
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

formSchema.virtual('archived').get(function() {
    const project = mongoose.model('Project').findOne({ forms: this._id });
    return project ? project.archived : false;
});

formSchema.virtual('shortUrl').get(function() {
    return `${process.env.SHORT_URL}/form?f=${this.uuid}`;
});

module.exports = mongoose.model('Form', formSchema);