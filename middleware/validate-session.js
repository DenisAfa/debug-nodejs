const jwt = require('jsonwebtoken');
const { User } = require('../db');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    console.log(sessionToken);
    if (!sessionToken)
      return res
        .status(403)
        .json({ auth: false, message: 'No token provided.' });
    else {
      jwt.verify(sessionToken, 'lets_play_sum_games_man', (err, decoded) => {
        if (decoded) {
          User.findOne({ where: { id: decoded.id } }).then(
            (user) => {
              req.user = user;
              console.log(`user: ${user.username}`);
              next();
            },
            () => {
              res.status(401).json({ error: 'not authorized' });
            }
          );
        } else {
          res.status(400).json({ error: 'not authorized' });
        }
      });
    }
  }
};
