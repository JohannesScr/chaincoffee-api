
/* =============== PRIMARY FUNCTIONS =============== */

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
    req.session.user_id = user.id;
    req.session.user_type = user.user_type;
    console.log('USER LOGGED IN SUCCESSFULLY');
    res.json({
        message: 'User logged in successfully',
        data: user,
        session: req.session.user_id
    });
};

exports.logout = (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy((err) => {
            if (err) next(err);

            res.json({
                message: 'User logged out successfully'
            })
        });
    }
};

/* =============== SECONDARY FUNCTIONS =============== */

