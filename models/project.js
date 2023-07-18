const mongoose = require('mongoose');

const linksSchema = new mongoose.Schema({
  website: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/.test(v);
      },
      message: props => `${props.value} is not a valid url.`
    }
  },
  email: {
      type: String,
      validate: {
          validator: function(v) {
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
              },
          message: props => `${props.value} is not a valid email address.`
      },
  },
  google_drive: {
      type: String,
      validate: {
        validator: function(v) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/.test(v);
        },
        message: props => `${props.value} is not a valid url`
      }
  },
  facebook: {
      type: String,
      validate: {
        validator: function(v) {
          return /^(https?:\/\/)?(www\.)?facebook\.com\//.test(v);
        },
        message: props => `${props.value} is not a valid Facebook URL`
      }
    },
  instagram: {
      type: String,
      validate: {
        validator: function(v) {
          return /^https?:\/\/(www\.)?instagram\.com\//.test(v);
        },
        message: props => `${props.value} is not a valid Instagram URL`
      }
    },
  twitter: {
      type: String,
      validate: {
        validator: function(v) {
          return /^https?:\/\/(www\.)?twitter\.com\//.test(v);
        },
        message: props => `${props.value} is not a valid Twitter URL`
      }
    },
  other_link: {
      type: String,
      validate: {
        validator: function(v) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/.test(v);
        },
        message: props => `${props.value} is not a valid url.`
      }
  },
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
  }
);

const projectSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        maxLength: 90,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    desc: { 
        type: String,
        maxLength: 200,
        trim: true
    },
    forms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    }],
    links: linksSchema,    
    archived: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model('Project', projectSchema);