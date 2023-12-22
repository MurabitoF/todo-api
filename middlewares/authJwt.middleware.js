const { verifyJWT } = require('../utils/jwt');

function authJwt(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ code: 401, message: 'Invalid authorization header' });
  }

  const token = authorizationHeader.replace('Bearer ', '');
  if (!token) {
    return res
      .status(401)
      .json({ code: 401, message: 'Authorization token not found' });
  }

  try {
    const decoded = verifyJWT(token);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ code: 401, message: 'Invalid token' });
  }
}

module.exports = authJwt;
