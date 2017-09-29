
/* =============== PRIMARY FUNCTIONS =============== */

exports.route_authentication = (req, res, next) => {
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
        err.status = 403;   // forbidden
        next(err);
    }

    // todo retrieve the user information from the db if necessary

    next();
};

exports.login = (req, res) => {
    /** @param {object} req
     * @param {object} res
     *
     * @description
     * Before this function is called user_credentials have already been validated and additional information stripped
     * Set a {object} user to {object} req.user
     * Delete the {object} req.user
     * Set the {string} req.session.id to user.id
     * Set {object} res.user to {object} user to remove all protected data
     * @return {object} res */

    let user = {
        id: req.user._id,                   // _id is from MongoDB
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        user_type: req.user.user_type
    };
    // remove user to remove protected information
    delete req.user;

    // only a cookie is sent containing the session_id
    // just by adding a property to req.session express will create or update a session
    // cookie and session created automatically
    req.session.user_id = req.user.id;
    res.json({
        message: 'User logged in',
        user: user,
        session: req.session.user_id
    });
};

/* =============== SECONDARY FUNCTIONS =============== */

check_session = (req) => {
    /** @param {object} req
     * Checks if the {object} req.session.user_id is present
     * @return true|false */

    if(!req.session.user_id) {
        return false;
    }
};