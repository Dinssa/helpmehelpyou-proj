const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HelpMeHelpYou',
      version: '1.0.0',
      description: 'GA Project 4 - HelpMeHelpYou'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'bearertoken'
        }
      }
    },
    securtiy: [
      {
        bearerAuth: []
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
                  },
                  owner: {
                    type: 'string',
                    format: 'uuid'
                  },
                },
                required: ['name', 'fields', 'type']
            },
            FormInput: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  maxLength: 70
                },
                fields: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      label: {
                        type: 'string',
                        maxLength: 70
                      },
                      type: {
                        type: 'string',
                        enum: ['text', 'number', 'email', 'date', 'checkbox', 'radio', 'select', 'textarea']
                      },
                      required: {
                        type: 'boolean'
                      },
                      options: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    },
                    required: ['label', 'type']
                  }
                }
              },
              required: ['name', 'fields']
            },
            ProjectInput: {
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
                    type: 'string'
                  }
                },
                website: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                },
                google_drive: {
                  type: 'string'
                },
                facebook: {
                  type: 'string'
                },
                instagram: {
                  type: 'string'
                },
                twitter: {
                  type: 'string'
                },
                other_link: {
                  type: 'string'
                },
                archived: {
                  type: 'boolean',
                  default: false
                }
              },
              required: ['name'],
              additionalProperties: false
            },
            TemplateInput: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  required: true
                },
                desc: {
                  type: 'string'
                },
                fields: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      label: {
                        type: 'string',
                        required: true
                      },
                      type: {
                        type: 'string',
                        enum: ['text', 'number', 'email', 'date', 'checkbox', 'radio', 'select', 'textarea'],
                        required: true
                      },
                      required: {
                        type: 'boolean'
                      },
                      options: {
                        type: 'array',
                        items: {
                          type: 'string'
                        }
                      }
                    },
                    required: ['label', 'type']
                  },
                  required: true
                },
                type: {
                  type: 'string',
                  enum: ['default', 'user'],
                  required: true
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