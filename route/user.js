/*
* USER
*
* A user is someone that uses the application, this can be any type of user
*
* This file includes the basic crud of a user
* POST, GET, PUT, PATCH, DELETE
*/

let User = require('../model/user');
let q = require('q');

/* =============== PRIMARY FUNCTIONS =============== */
// route to register a user on the system
exports.register_user = (req, res, next) => {
    /** @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Validates that all the correct data was sent in the {object} req.body
     * Create a {object} new_user with only the relevant information
     *      {string}req.body.first_name, {string} req.body.last_name, {string} req.body.email, {number} req.body.contact_number,
     *      {string} req.body.password, {string} req.body.user_type, {array} req.body.event
     * Calls the User.create method passing the {object} new_user and a callback function and returns the callback function with {object} user.
     * Then calls the callback function passing the {object} user
     * Then adds the {object} user to the {object} req.user
     * Calls the next function to proceed to login */

    // validate request body
    if (req.body.first_name &&
            req.body.last_name &&
            req.body.email && req.body.confirm_email &&
            req.body.password && req.body.confirm_password &&
            req.body.contact_number) {

        if (req.body.email === req.body.confirm_email) {
            if (req.body.password === req.body.confirm_password) {

                // create new user from the request body
                let new_user = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    contact_number: req.body.contact_number,
                    password: req.body.password,
                    user_type: req.body.user_type,
                    event: req.body.event
                };

                // hash their password
                // use the schema's 'create' method to insert our document into Mongo
                User.create(new_user, (error, user) => {
                    if (error) {
                        next(error);
                    } else {
                        // add user to request object
                        req.user = user;
                        // call next function
                        console.log('USER CREATED SUCCESSFULLY');
                        next();
                        // call middleware authentication_service.login
                    }
                });

            } else {
                let err = new Error('Passwords do not match');
                err.status = 400;
                next(err);
            }
        } else {
            let err = new Error('Emails do not match');
            err.status = 400;
            next(err);
        }

    } else {
        let err = new Error ('All fields are required.');
        err. status = 400;
        next(err);
    }
};

// route to return all the users
exports.get_user = (req, res, next) => {
    /** @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Call get_user_query function passing the {object} req to return the {array} user
     * Then callback function passing the {array} user
     * Then add {array} user to {object} res.user
     * @return {object} res */

    // check want the user wants to get
    get_user_query(req.query)
            .then((user) => {
                // send response
                res.json({
                    response: 'You sent a /GET to /user',
                    message: 'Get data successfully',
                    data: user
                });
            })
            .catch((err) => {
                next(err);
            });
};

// route to create a new user
exports.post_user = (req, res, next) => {
    /** @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Validates that all the correct data was sent in the {object} req.body
     * Create a {object} new_user with only the relevant information
     *      {string}req.body.first_name, {string} req.body.last_name, {string} req.body.email, {number} req.body.contact_number,
     *      {string} req.body.password, {string} req.body.user_type, {array} req.body.event
     * Calls the User.create method passing the {object} new_user and a callback function and returns the callback function with {object} user.
     * Then calls the callback function passing the {object} user
     * Then adds the {object} user to the {object} res.user
     * @return {object} res */

    // validate request body
    if (req.body.first_name &&
        req.body.last_name &&
        req.body.email && req.body.confirm_email &&
        req.body.password && req.body.confirm_password &&
        req.body.contact_number) {

        if (req.body.email === req.body.confirm_email) {
            if (req.body.password === req.body.confirm_password) {

                // create new user from the request body
                let new_user = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    contact_number: req.body.contact_number,
                    password: req.body.password,
                    user_type: req.body.user_type,
                    event: req.body.event
                };

                // hash their password
                // use the schema's 'create' method to insert our document into Mongo
                User.create(new_user, (err, user) => {
                    if (err) next(err);

                    console.log('USER CREATED SUCCESSFULLY');
                    res.json({
                        response: 'You sent a /POST to /user to create a new user in the system',
                        data: user
                    });
                });

            } else {
                let err = new Error('Passwords do not match');
                err.status = 400;
                next(err);
            }
        } else {
            let err = new Error('Emails do not match');
            err.status = 400;
            next(err);
        }

    } else {
        let err = new Error ('All fields are required.');
        err. status = 400;
        next(err);
    }
};

// route to get a specific user
exports.put_user = (req, res, next) => {
    /** @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Check that the request has the correct data
     * Check that the user has the correct authorization rights
     * Call the {model} User.findById method to find the user with the {string} req.params.id
     * Check and update the general user data
     * Check for {object} req.event to update the users associated events array
     * Check and update password ...
     * Check and update email ...
     * @return {object} res*/
    if (req.params.id && req.body !== {}) {
        // if (req.session.user_type === 'super admin'|| req.session.user_id === req.params.id) {

            let user_update_data = req.body;

            User.findById(req.params.id, (err, user) => {
                if (err) next(err);

                // general user information
                for (let key in user) {
                    if (key === 'first_name' || key === 'last_name' || key === 'contact_number' || key === 'user_type') {
                        if (user_update_data[key]) {
                            user[key] = user_update_data[key];
                        }
                    }
                }

                // events
                if (req.event) {
                    // update the user
                    user = update_event(req.event, user);
                }

                // password
                // todo ^^

                // email
                // todo ^^

                user.save((err, user) => {
                    if (err) next(err);

                    res.json({
                        response: 'You sent a /PUT to /user' + req.params.id + ' to update that user in the system',
                        message: 'User successfully updated',
                        data: user,
                    });
                });
            })

        // } else {
        //     let err = new Error('Unauthorized session tokens');
        //     err.status = 401;
        //     next(err);
        // }
    } else {
        let err = new Error('user_id and update information required');
        err.status = 400;
        next(err);
    }
};

// route to remove a new user
// delete_text: 'delete first_name last_name'
exports.delete_user = (req, res, next) => {
    /** @param {object} req
     * req.params.id: {string}
     * req.body: {
     *      delete_user_id: {string}
     *      delete_text: {string}
     *      }
     * req.session: {
     *      user_type: {string},
     *      user_id: {string}
     *      }
     * @param {object} res
     * @param next
     *
     * @description
     * Check that {string} req.params.id and req.body.delete_text is present
     * Call {model} User.findById passing {string} req.params.id to call callback function passing {object} user from the database
     * Check that the {string} req.body.delete_text matches the {object} user's first and last name
     * Check for session tokens
     * Call {model} User.findByIdAndRemove method passing req.params.id and callback function to return {object} deleted_user
     * Add {object} deleted_user first and last name to {object} res
     * @return res */

    // if (req.params.id && req.body.delete_text) {
    //     // fetch user
    //     let user_to_be_deleted;
    //     User.findById(req.params.id, (error, user) => {
    //         if (error) next(error);
    //         user_to_be_deleted = user;
    //
    //         // if user name and surname match
    //         if (req.body.delete_text.toLowerCase() === `delete ${user_to_be_deleted.first_name} ${user_to_be_deleted.last_name}`.toLowerCase()) {
    //             // if super admin or session.user_id equals the deleted user's id
    //             // only super admin or the user themselves can remove the user from the system
    //             if (req.session.user_type || req.session.user_id === user_to_be_deleted._id) {
    //                 User.findByIdAndRemove(user_to_be_deleted._id, (err, deleted_user) => {
    //                     if (err) next(err);
    //                     console.log('USER DELETED SUCCESSFULLY');
    //                     res.json({
    //                         response: 'You sent a /DELETE to /user to delete a user from the system',
    //                         message: 'User successfully deleted from the database',
    //                         first_name: deleted_user.first_name,
    //                         last_name: deleted_user.last_name
    //                     });
    //                 });
    //             } else {
    //                 let err = new Error('Unauthorized session tokens');
    //                 err.status = 400;
    //                 next(err);
    //             }
    //             // else err
    //         } else {
    //             let err = new Error('Delete text not matching');
    //             err.status = 400;
    //             next(err);
    //         }
    //
    //     });
    // } else {
    //     let err = new Error('Please enter a user_id to be removed');
    //     err.status = 400;
    //     next(err);
    // }

    // todo get sessions sorted to implement ^^
    delete_user(req, next, (deleted_user) => {
        console.log('USER DELETED SUCCESSFULLY');
        res.json({
            response: 'You sent a /DELETE to /user to delete a user from the system',
            message: 'User successfully deleted from the database',
            first_name: deleted_user.first_name,
            last_name: deleted_user.last_name
        });
    });
};

/* =============== SECONDARY FUNCTIONS =============== */

get_user_query = (query) => {
    /** @param {object} query
     *
     * @description
     * Create deferred promise {object} d by calling {object} q.defer method, because the request to the database is asynchronous
     * Set {number} user_id to {number} req.body.user_id
     * Call {model} User.findById method passing {number} user_id to return {object} user
     * Call {object} d.resolve method passing the {object} user
     * @return d.promise */

    let d = q.defer();

    if (query.user_id) {
        // get a specific user
        console.log('GET USER: ', query.user_id);
        let user_id = query.user_id;

        User.findById(user_id, (err, user) => {   // then execute the callback function
            if (err) d.reject(err);
            d.resolve(user);
        });
    } else {
        // get all users
        console.log('GET ALL USERS: ');
        User.find({})                      // find({}) to get all the results
                .exec((err, user) => {   // then execute the callback function
                    if (err) d.reject(err);
                    d.resolve(user);
                });
    }

    return d.promise;
};

update_event = (event, user, next) => {
    /** @param {object} event
     * @param {object} user
     * @param next
     *
     * @description
     * Create a {object} d deferred promise, as this process is asynchronous
     * Check for the {object} req.event
     * Check for the {string} req.event.status 'append' or 'remove'
     * If 'append' add {string} event._id to the {array} user.event
     * If '' remove  {string} event._id from the {array} user.evet
     * @return {object} user */

    // APPEND
    if (event.status === 'append') {
        user.event.push(event._id);
    }

    // REMOVE
    if (event.status === 'remove') {
        if (user.event.indexOf(event._id) !== -1) {
            // check that the event id is present in the user's event array
            // remove that event id
            user.event.splice(user.event.indexOf(event._id), 1);

        } else {
            let err = new Error('Event id not found on user');
            err.status = 404;
            next(err);
        }
    }

    return user;
};

/*  =============== TEMP FUNCTIONS ===============  */
delete_user = (req, next, callback) => {
    /** @param {object} req
     * @param next
     * @param {function} callback
     *
     * @description
     * Call {model} User.findByIdAndRemove method passing the {string} req.body.delete_user_id and a callback function
     * Then pass the callback function the {object} err and returned {object} user and call the callback function
     *      passing the {object} user */
    if (req.params.id && req.body.delete_text) {
        User.findById(req.params.id, (err, user) => {
            if (err) next(err);
            let user_to_be_deleted = user;
            if (req.body.delete_text.toLowerCase() === `delete ${user_to_be_deleted.first_name} ${user_to_be_deleted.last_name}`.toLowerCase()) {
                User.findByIdAndRemove(req.params.id, (err, deleted_user) => {
                    if (err) next(err);
                    callback(deleted_user);
                });
            } else {
                let err = new Error('Delete text not matching');
                err.status = 400;
                next(err);
            }
        });
    } else {
        let err = new Error('Please enter a parameter id to be removed and delete text');
        err.status = 400;
        next(err);
    }
};

