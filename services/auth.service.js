const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { generateJWT } = require('../utils/jwt');

class AuthService {
  constructor() {
    if (!AuthService.instance) {
      AuthService.instance = this;
    }
    return AuthService.instance;
  }

  async login(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
      throw Boom.notFound(`User with the username: "${username}" not found`);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw Boom.badRequest(`Username or password incorrect`);
    }
    const token = generateJWT(user.username);
    return token;
  }
}

module.exports = AuthService;
