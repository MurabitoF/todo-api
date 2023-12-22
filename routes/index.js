const router = require('express').Router();
const taskRouter = require('./task.router');
const authRouter = require('./auth.router');
const authJwt = require('../middlewares/authJwt.middleware');

function routerApi(app) {
  app.use('/api/v1', router);
  router.use('/tasks', authJwt, taskRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
