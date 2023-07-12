const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        maxLength: 70,
        trim: true
    },
    fields: {
        type: [mongoose.Schema.Types.Mixed],
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/.test(v);
          },
          message: props => `${props.value} is not a valid URL`
        }
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

formSchema.virtual('archived').get(function() {
    const project = mongoose.model('Project').findOne({ forms: this._id });
    return project ? project.archived : false;
});

module.exports = mongoose.model('Form', formSchema);