
let User = require('../model/user');

exports.user_credentials = (req, res, next) => {
    /** @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Calls the User.authenticate method passing the {string} req.body.email, {string} req.body.password and callback function
     *      to authenticate the credentials and returns {object} user.
     * Then adds the {object} user to {object} req.user
     * Calls the next function to proceed to login*/

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

            // add user to request object
            req.user = user;
            // continue to login
            next();
        });
    }
};