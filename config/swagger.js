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
                }
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