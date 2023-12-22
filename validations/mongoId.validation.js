const { param } = require('express-validator');

const mongoIdValidationSchema = () =>
  param('id').isMongoId().withMessage('Id is invalid');

module.exports = mongoIdValidationSchema;
