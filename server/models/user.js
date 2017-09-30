const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	key: {
		type: String,
		required: true
	}
});

UserSchema.pre('save', function(next) {
	const user = this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.compareKey = function (key, cb) {
    bcrypt.compare(key, this.key, function (err, isMatch) {
        if(err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
