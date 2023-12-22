const { checkSchema } = require('express-validator');

const loginValidationSchema = () =>
  checkSchema({
    username: {
      isString: true,
      notEmpty: { errorMessage: 'Name is required' },
    },
    password: {
      isString: true,
      notEmpty: { errorMessage: 'Password is required' },
    },
  });

module.exports = loginValidationSchema;
