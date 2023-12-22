const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const routerApi = require('../routes');
const {
  errorHandler,
  boomErrorHandler,
} = require('../middlewares/errorHandler.middleware');
require('dotenv').config();

function createServer() {
  const app = express();
  app.use(express.json());

  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Task API',
        description: 'Task API Information',
        version: '1.0.0',
      },
    },
    basePath: '/api-docs',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  routerApi(app);

  app.use(boomErrorHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createServer;
