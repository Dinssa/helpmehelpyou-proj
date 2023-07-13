const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const serverHost = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
const serverUrl = `http://${serverHost}:${port}`;

const userModel = require('../models/user');
const projectModel = require('../models/project');
const templateModel = require('../models/template');
const formModel = require('../models/form');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HelpMeHelpYou',
      version: '1.0.0',
      description: 'GA Project 4 - HelpMeHelpYou'
    },
    servers: [
      {
        url: serverUrl
      }
    ],
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    firstName: {
                        type: 'string'
                    },
                    lastName: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    avatar: {
                        type: 'string'
                    },
                    googleId: {
                        type: 'string'
                    },
                    roles: {
                        type: 'array',
                        items: {
                            type: 'string'
                        }
                    }
                },
                required: ['firstName', 'email', 'password']
              },
              Project: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  desc: {
                    type: 'string'
                  },
                  forms: {
                    type: 'array',
                    items: {
                      type: 'string',
                    }
                  },
                  website: {
                    type: 'string',
                    pattern: '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$'
                  },
                  email: {
                    type: 'string',
                    format: 'email'
                  },
                  google_drive: {
                    type: 'string',
                    pattern: '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$'
                  },
                  facebook: {
                    type: 'string',
                    pattern: '^https:\\/\\/www\\.facebook\\.com\\/'
                  },
                  instagram: {
                    type: 'string',
                    pattern: '^https?:\\/\\/(www\\.)?instagram\\.com\\/'
                  },
                  twitter: {
                    type: 'string',
                    pattern: '^https?:\\/\\/([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$'
                  },
                  other_link: {
                    type: 'string',
                    pattern: '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$'
                  },
                  archived: {
                    type: 'boolean'
                  }
                },
                required: ['name']
              },
              Form: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    maxLength: 70
                  },
                  fields: {
                    type: 'array',
                    items: {type: 'string'}
                  },
                  url: {
                    type: 'string',
                    pattern: '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$'
                  },
                  owner: {
                    type: 'string',
                    format: 'uuid'
                  },
                  sharedWith: {
                    type: 'array',
                    items: {
                      type: 'string',
                      format: 'uuid'
                    }
                  },
                  submissions: {
                    type: 'array',
                    items: {}
                  }
                },
                required: ['name', 'fields', 'url', 'owner']
              },
              Template: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    maxLength: 70
                  },
                  desc: {
                    type: 'string',
                    maxLength: 200
                  },
                  fields: {
                    type: 'array',
                    items: {type: 'string'}
                  },
                  type: {
                    type: 'string',
                    enum: ['default', 'user']
                  },
                  createdAt: {
                    type: 'string',
                    format: 'date-time'
                  },
                  updatedAt: {
                    type: 'string',
                    format: 'date-time'
                  }
                },
                required: ['name', 'fields', 'type']
              }
        }
    }
  },
  apis: ['./routes/api/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = function(app) {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};