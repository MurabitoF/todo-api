const { checkSchema } = require('express-validator');

const taskValidationSchema = () =>
  checkSchema({
    name: {
      isString: true,
      notEmpty: { errorMessage: 'Name is required' },
    },
    description: { isString: true, optional: true },
    completed: { isBoolean: true, optional: true },
  });

module.exports = taskValidationSchema;
