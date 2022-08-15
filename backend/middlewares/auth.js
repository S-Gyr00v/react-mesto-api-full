const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const extractBearer = (header) => header.replace('Bearer ', '');
const userAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = extractBearer(authorization);
  let payload;
  try {
    payload = jwt.verify(token, 'very secret');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload;
  next();
};

module.exports = {
  userAuthorization,
};
