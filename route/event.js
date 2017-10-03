
let Event = require('../model/event');
let User = require('../model/user');
let query_service = require('../extend/extend_query_params');

/* =============== PRIMARY FUNCTIONS =============== */

// route to get all the events
exports.list_event = (req, res, next) => {
    /** list_event - select all events from the database.
     * @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Calls query_service.add_event_query_params function passing ... to get all the events based on the query parameters
     *      and return {array} event.
     * Then passes {object} event to the callback function.
     * Set {object} data on the response to {array} event.
     * @return {object} data */

    query_service.add_event_query_params()
            .then((event) => {
                // send response
                res.json({
                    response: 'You sent a /GET to /user',
                    message: 'Get data successfully',
                    data: event
                });
            }).catch((err) => {
                next(err);
            });
};

// route to get all the events
exports.get_event = (req, res, next) => {
    /** get_event - select one event from the database.
     * @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Set {string} event_id to {string} req.params.id.
     * Calls the {model} Event.findById method passing the {string} event_id and returns {object} event.
     * Then passes {object} event to the callback function.
     * Set {object} data on the response to {object} event.
     * @return {object} data */

    let event_id = req.params.id;

    Event.findById(event_id, (err, event) => {
        if(err) next(err);

        // send response
        res.json({
            response: 'You sent a /GET to /event',
            message: 'Get data successfully',
            data: event
        });
    });
};

// route to create a new event
exports.post_event = (req, res, next) => {
    /** @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Check that all required data is provided
     * Create entry in database
     * Add req.params.id to req.body.user_id to be able to update user information
     * Add new event to {object} req.event.event
     * Set the {string} req.event.status tp 'append'
     * Call next to go to user_service.put_user */

    if (req.body.user_id &&
        req.body.date &&
        req.body.venue &&
        req.body.town &&
        req.body.distance_from_head_office &&
        req.body.number_of_guests &&
        req.body.start_time &&
        req.body.end_time) {

        // create event object
        let new_event = {
            date: new Date(req.body.date[0],
                    req.body.date[1],
                    req.body.date[2]),
            venue: req.body.venue,
            town: req.body.town,
            distance_from_head_office: req.body.distance_from_head_office,
            number_of_guests: req.body.number_of_guests,
            start_time: new Date(req.body.start_time[0],
                    req.body.start_time[1],
                    req.body.start_time[2],
                    req.body.start_time[3],
                    req.body.start_time[4]),
            end_time: new Date(req.body.end_time[0],
                    req.body.end_time[1],
                    req.body.end_time[2],
                    req.body.end_time[3],
                    req.body.end_time[4])
        };

        Event.create(new_event, (err, event) => {
            if (err) next(err);
            console.log('NEW EVENT CREATED');

            req.event = {};
            req.event.event_id = event._id;            // add the event
            req.event.status = 'append';        // set the status
            req.params.id = req.body.user_id;   // create params.id
            next();
        })

    } else {
        let err = new Error('Precondition Failed - All fields are required');
        err.status = 412;
        next(err);
    }
};

// route to update a specific event
exports.put_event = (req, res, next) => {
    /** put_event - update an event document in the database
     * @param {object} req
     * @param {object} res
     * @param next
     *
     * @description
     * Set {string} event_id to {string} req.params.id.
     * Set {object} event_data to {object} req.body.
     * Call the {model} Event.updateById method passing the the {string} event_id and {object} event_data and returns the
     *      updated {object} event document from the database.
     * Then passes {object} event to the callback function.
     * Set {object} data on the response to the {object} event.
     * @return {object} data */

    let event_id = req.params.id;
    let event_data = {};

    for (let key in req.body) {
        if (key === 'date' ||
            key === 'venue' ||
            key === 'town' ||
            key === 'distance_from_head_office' ||
            key === 'number_of_guests' ||
            key === 'start_time' ||
            key === 'end_time') {
                event_data[key] = req.body[key];
        }
    }

    Event.findById(event_id, (err, event) => {
        if (err) next(err);

        for (let key in event._doc) {
            if (key === 'date') {
                event._doc[key] = new Date(event_data[key][0], event_data[key][1], event_data[key][2]);
            } else if (key === 'start_time' || key === 'end_time') {
                event._doc[key] = new Date(event_data[key][0], event_data[key][1], event_data[key][2], event_data[key][3], event_data[key][4]);
            } else {
                event._doc[key] = event_data[key];
            }
        }

        event.save((err, updated_event) => {
            if (err) next(err);

            res.json({
                response: 'You sent a /PUT to /event/:id',
                message: 'Update successful',
                data: updated_event
            });
        });
    });
};

// route to get a specific event
exports.delete_event = (req, res, next) => {
    /** @param {object} req
     * @param {object} res
     *
     * @description
     * Check for the required data
     * Remove entry from the database
     * Set {string} req.params.id to {string} req.session.user_id
     * Set {string} req.event.status to 'remove'
     * Set {object} req.event.event
     *      Call next to go to user_service.put_user */

    let user_id = req.body.user_id;
    let event_id = req.params.id;
    let delete_text = req.body.delete_text;

    if (req.body.delete_text && delete_text === `delete event ${event_id}`) {

        // check that the user has the event listed or is super-admin
        // User.findById(user_id, (err, user) => {
        //     if (err) next(err);
        //
        //     // check if user has the  event
        //     for (let event in user.event) {
        //         if (event._id === event_id) {
        //
        //         }
        //     }
        //
        // });

        Event.findByIdAndRemove(event_id, (err, event) => {
            if (err) next(err);
            req.params.id = user_id;                // set params id
            req.event = {};
            req.event.status = 'remove';            // set event status
            req.event.event_id = event._id;                // set event

            next();
        })

    } else {
        let err = new Error('Bad Request - Delete text not matching');
        err.status = 400;
        next(err);
    }
};

/* =============== SECONDARY FUNCTIONS =============== */


/* =============== HELPER FUNCTIONS =============== */



