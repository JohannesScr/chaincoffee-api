
let User = require('../model/user');

exports.user_credentials = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        let err = new Error('Email and password are required.');
        err.status = 401;   // unauthorized
        next(err);
    } else {
        User.authenticate(req.body.email, req.body.password, (error, user) => {
            if (error || !user) {
                let err = new Error('Incorrect email or password.');
                err.status = 401;
                next(err);
            }

            // continue to login
            req.user = user;
            next();
        });
    }
};