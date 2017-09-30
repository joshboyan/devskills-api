const User = require('../models/user');

// Middelware for authenticating valid JWT keys
const isAuthenticated = (req, res, next) => {
	User.findOne({
    key: req.param('key')
  }, (err, user) => {
    if(err) throw err;

    if(!user) {
      res.send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
			console.log('found user ', user);
			next();
		}
	});
};

module.exports = isAuthenticated;
