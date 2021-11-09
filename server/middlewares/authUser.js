const jwt = require('jsonwebtoken');

function authUser(req, res, next) {
  try {
    const token = req.header('token');
    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });

    const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ errorMessage: 'Unauthorized' });
  }
}

module.exports = authUser;
