const jwt = require('jsonwebtoken');

function generateJWT(username) {
  const token = jwt.sign({ username }, process.env.JWT_KEY, {
    expiresIn: '2h',
  });
  return token;
}
function verifyJWT(token) {
  return jwt.verify(token, process.env.JWT_KEY);
}

module.exports = {
  generateJWT,
  verifyJWT,
};
