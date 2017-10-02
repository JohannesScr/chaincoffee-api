
let Event = require('../model/event');
let User = require('../model/user');

/* =============== PRIMARY FUNCTIONS =============== */

// route to get all the events
exports.get_event = (req, res) => {
    // check want the user wants to get
    get_event_query(req.query);

    // send response
    res.json({
        response: 'You sent a /GET request to /chaincoffee/event'
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
        req.body.distance_from_stellenbosch &&
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
            distance_from_stellenbosch: req.body.distance_from_stellenbosch,
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

            req.event.event = event;            // add the event
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
exports.put_event = (req, res) => {
    res.json({
        response: 'You sent a /PUT request to /chaincoffee/event/' + req.params.id,
        event_id: req.params.id,
        body: req.body
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

    if (req.body.delete_text) { // && check the match pattern

        // check that the user has the event listed or is super-admin
        User.findById(req.body.user_id, (err, user) => {
            if (err) next(err);

            // WIP

        });

        Event.findByIdAndRemove(req.params.id, (err, event) => {
            if (err) next(err);
            req.params.id = user.session.user_id;   // set params id
            req.event.status = 'remove';            // set event status
            req.event.event = event;                // set event

            next();
        })

    } else {
        let err = new Error('Bad Request - Delete text not matching');
        err.status = 400;
        next(err);
    }

    res.json({
        response: 'You sent a /DELETE request to /event' + req.params.id,
        event_id: req.params.id
    });
};

/* =============== SECONDARY FUNCTIONS =============== */

get_event_query = (query) => {
    if (query.event_id) {
        // get specific event
        console.log('GET EVENT: ', query.event_id);
    } else if (query.user_id) {
        // get specific user's event
        console.log('GET EVENT: ', query.event_id);
    } else {
        // get all events
        console.log('GET ALL EVENTS: ');
    }
};

/* =============== HELPER FUNCTIONS =============== */



