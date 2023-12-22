const router = require('express').Router();
const loginValidationSchema = require('../validations/login.validation');
const validate = require('../middlewares/validate.middleware');
const AuthService = require('../services/auth.service');

const authService = new AuthService();

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: Login into the system
 *    description: Use for retreave a token to access the system
 *    requestBody:
 *      required: true
 *      content:
 *        application/json
 *    tags:
 *      - Auth
 *    security:
 *      - bearerAuth: []
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: The login was successfull
 *        schema:
 *          type: json
 *      '400':
 *        description: Body has missing required attributes
 *        schema:
 *          type: json
 *      '401':
 *        description: Invalid credentials
 *        schema:
 *          type: json
 *      '404':
 *        description: User not found
 *        schema:
 *          type: json
 */
router.post(
  '/login',
  loginValidationSchema(),
  validate,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);

      return res.json({ username, token });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
