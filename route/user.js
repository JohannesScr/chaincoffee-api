/*
* USER
*
* A user is someone that uses the application, this can be any type of user
*
* This file includes the basic crud of a user
* POST, GET, PUT, PATCH, DELETE
*/

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
exports.post_user = (req, res) => {
    res.json({
        response: 'You sent a /POST to /chaincoffee/user to create a new user in the system',
        output: 'Returns the new created user in the system',
        body: req.body
    });
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


