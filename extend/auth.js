
let User = require('../model/user');

/* =============== PRIMARY FUNCTIONS =============== */

exports.user_credentials = (req, res, next) => {
    /** @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Calls the User.authenticate method passing the {string} req.body.email, {string} req.body.password and callback function
     *      to authenticate the credentials and returns {object} user.
     * Then adds the {object} user to {object} req.user
     * Calls the next function to proceed to login */

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
            console.log('USER CREDENTIALS VERIFIED SUCCESSFULLY');
            req.user = user;
            // continue to login
            next();
        });
    }
};

exports.route_authorization = (req, res, next) => {
    /** @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Set {boolean} current_session by calling check_session and passing the {object} req to return true if there is a session
     * Set {boolean} white_list_route_check to false
     * Set white_list_route_check to true if the {string} req.url is in the {array} white_listed array
     *
     * **** Carry on with authorization ****
     *
     * Call the next function to proceed to any route */

    let current_session = check_session(req);
    let white_list_route_check = false;

    for (let i = 0; i < req.white_listed.length; i++) {
        if (req.url === req.white_listed[i]) {
            white_list_route_check = true;
        }
    }

    // check for white_listed route or active session
    if (white_list_route_check === false && current_session === false) {
        let err = new Error('Unauthorised, please log in.');
        err.status = 401;   // Unauthorized
        next(err);
    }

    next();
};

exports.route_request_authentication = (req, res, next) => {
    /** route_request_authentication - check that the request contains the correct parameters and nothing else
     * @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     *
     *      Calls next to proceed to the route */
};

/* =============== SECONDARY FUNCTIONS =============== */

check_session = (req) => {
    /** @param {object} req
     * Checks if the {object} req.session.user_id is present
     * @return true|false */

    if (req.session && req.session.email) {
        return true;
    } else {
        return false;
    }
};