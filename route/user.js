/*
* USER
*
* A user is someone that uses the application, this can be any type of user
*
* This file includes the basic crud of a user
* POST, GET, PUT, PATCH, DELETE
*/

let User = require('../model/user');

/* PRIMARY FUNCTIONS */

// route to return all the users
exports.get_user = (req, res) => {
    // check want the user wants to get
    get_user_query(req);

    // send response
    res.json({
        response: 'You sent a /GET to /chaincoffee/user',
        output: 'Returns all the users in the system'
    });
};

// route to create a new user
exports.post_user = (req, res, next) => {

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
                        res.json({
                            response: 'You sent a /POST to /chaincoffee/user to create a new user in the system',
                            output: 'Returns the new created user in the system',
                            new_user: user
                        });
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

// route to get a specific user
exports.put_user = (req, res) => {
    res.json({
        response: 'You sent a /PUT to /chaincoffee/user/' + req.params.uid + ' to update that user in the system',
        output: 'Returns the updated user in the system',
        user_id: req.params.id,
        body: req.body
    });
};

// route to remove a new user
// delete_text: 'delete first_name last_name'
exports.delete_user = (req, res) => {
    res.json({
        response: 'You sent a /DELETE to /chaincoffee/user/' + req.params.uid + ' to delete that user from the system',
        output: 'Returns status as successful or not',
        user_id: req.params.id,
        body: req.body
    });
};

/* SECONDARY FUNCTIONS */

get_user_query = (req) => {
    if (req.query.user_id) {
        // get a specific user
        console.log('GET USER: ', req.query.user_id);
    } else {
        // get all users
        console.log('GET ALL USERS: ');
    }
};


