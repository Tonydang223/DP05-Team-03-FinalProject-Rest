const jwt = require('jsonwebtoken');

function userAuthPermission(per) {
  return async function userAuth(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log('token', token);

      if (!token) return res.status(401).json({ message: 'Unauthorized' });

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async function (err, data) {
        if (err)
          return res
            .status(401)
            .json({ message: 'The token was exired! You need to log in again.' });
        if (per && Array.isArray(per) && !per.includes(data.role))
          return res.status(403).json({ message: 'Permission denied!' });
        req.usr = data;
        next();
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
}

module.exports = { userAuthPermission };
