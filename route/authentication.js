
/* =============== PRIMARY FUNCTIONS =============== */

exports.route_authentication = (req, res, next) => {
    let current_session = check_session(req, res);
    let check = false;

    for (let i = 0; i < req.white_listed.length; i++) {
        if (req.url === req.white_listed[i]) {
            check = true;
        }
    }

    // check for white_listed route or active session
    if (check === false && current_session === false) {
        let err = new Error('Unauthorised, please log in.');
        err.status = 403;   // forbidden
        next(err);
    }

    // todo retireve teh user informatio from the db if necessary

    next();
};

exports.login = (req, res) => {

    let user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        user_type: req.user.user_type
    };

    delete req.user;

    // only a cookie is sent containing the session_id
    // just by adding a property to req.session express will create or update a session
    // cookie and session created automatically
    req.session.user_id = user._id;     // _id is from MongoDB
    res.json({
        message: 'User logged in',
        user: user

    });
};

/* =============== SECONDARY FUNCTIONS =============== */

check_session = (req, res) => {
    if(!req.session.user_id) {
        return false;
    }
};