
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