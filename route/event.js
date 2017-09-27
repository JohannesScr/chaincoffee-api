

/* =============== PRIMARY FUNCTIONS =============== */

// route to get all the events
exports.get_event = (req, res) => {
    // check want the user wants to get
    get_event_query(req);

    // send response
    res.json({
        response: 'You sent a /GET request to /chaincoffee/event'
    });
};

// route to create a new event
exports.post_event = (req, res) => {
    res.json({
        response: 'You sent a /POST request to /chaincoffee/event',
        body: req.body
    });
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
exports.delete_event = (req, res) => {
    res.json({
        response: 'You sent a /DELETE request to /chaincoffee/event/' + req.params.id,
        event_id: req.params.id
    });
};

/* =============== SECONDARY FUNCTIONS =============== */

get_event_query = (req) => {
    if (req.query.event_id) {
        // get specific event
        console.log('GET EVENT: ', req.query.event_id);
    } else {
        // get all events
        console.log('GET ALL EVENTS: ');
    }
};

/* =============== HELPER FUNCTIONS =============== */



