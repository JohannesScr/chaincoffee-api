'use strict'

let express = require('express');
let router = express.Router();

// /GET /chaincoffee/
// first parameter is the route, second paramter is the callback function
// Return a message
router.get('/', (req, res) => {
  // res.json ends the lifecycle of the request and sends a response back to the client
  // res.json takes care of turning the response into json
  res.json({
    response: 'You sent a /GET to /chaincoffee/',
    oauth: 'we need some proper security'
  });
});

// /GET /chaincoffee/user
// route to return all the users
router.get('/user', (req, res) => {
  res.json({
    response: 'You sent a /GET to /chaincoffee/user',
    output: 'Returns all the users in the system'
  });
});


// /POST /chaincoffee/user
// route to create a new user
router.post('/user', (req, res) => {
  res.json({
    response: 'You sent a /POST to /chaincoffee/user to create a new user in the system',
    output: 'Returns the new created user in the system',
    body: req.body
  });
});

// /GET /chaincoffee/user/:uid
// route to get a specific user
router.get('/user/:uid', (req, res) => {
  res.json({
    response: 'You sent a /GET to /chaincoffee/user/' + req.params.uid,
    output: 'Returns a specific user in the system',
    user_id: req.params.uid
  });
});

// /PUT /chaincoffee/user/:uid
// route to get a specific user
router.put('/user/:uid', (req, res) => {
  res.json({
    response: 'You sent a /PUT to /chaincoffee/user/' + req.params.uid + ' to update that user in the system',
    output: 'Returns the updated user in the system',
    user_id: req.params.uid,
    body: req.body
  });
});

// /DELETE /chaincoffee/user/:uid
// route to remove a new user
// delete_text: 'delete first_name last_name'
router.delete('/user/:uid', (req, res) => {
  res.json({
    response: 'You sent a /DELETE to /chaincoffee/user/' + req.params.uid + ' to delete that user from the system',
    output: 'Returns status as successful or not',
    user_id: req.params.uid,
    body: req.body
  });
});

// /GET /chaincoffee/user/:uid/event
// route to return all the events associated to that user
router.get('/user/:uid/event', (req, res) => {
  res.json({
    response: 'You sent a /GET request to /chaincoffee/user' + req.params.uid + '/event to get all the events of this user on the system',
    output: 'Return all the events associated to user' + req.params.uid,
    user_id: req.params.uid
  });
});

// /GET /chaincoffee/user/:uid/event/:eid
// route to return a specific event associated to that user
router.get('/user/:uid/event', (req, res) => {
  res.json({
    response: 'You sent a /GET request to /chaincoffee/user' + req.params.uid + '/event/' + req.params.eid + ' to get all the events of this user on the system',
    output: 'Return event '+ req.params.eid +' associated to user' + req.params.uid,
    user_id: req.params.uid,
    event_id: req.params.eid
  });
});

// /GET /chaincoffee/event
// route to get all the events
router.get('/event', (req, res) => {
  res.json({
    response: 'You sent a /GET request to /chaincoffee/event'
  });
});

// /POST /chaincoffee/event
// route to create a new event
router.post('/event', (req, res) => {
  res.json({
    response: 'You sent a /POST request to /chaincoffee/event',
    body: req.body
  });
});

// /GET /chaincoffee/event/:eid
// route to get a specific event
router.get('/event/:eid', (req, res) => {
  res.json({
    response: 'You sent a /GET request to /chaincoffee/event/' + req.params.eid,
    event_id: req.params.eid
  });
});

// /PUT /chaincoffee/event/:eid
// route to update a specific event
router.put('/event/:eid', (req, res) => {
  res.json({
    response: 'You sent a /PUT request to /chaincoffee/event/' + req.params.eid,
    event_id: req.params.eid,
    body: req.body
  });
});

// /DELETE /chaincoffee/event/:eid
// route to get a specific event
router.get('/event/:eid', (req, res) => {
  res.json({
    response: 'You sent a /DELETE request to /chaincoffee/event/' + req.params.eid,
    event_id: req.params.eid
  });
});

// /POST /chaincoffee/event/:eid/event-quote
// /POST /chaincoffee/event/:eid/event-cancel
// /POST /chaincoffee/event/:eid/event-confirm
// route to update a specific event's status
router.post('/event/:eid/event-:status', (req, res, next) => {
  if(req.params.status.search(/^(quote|cancel|confirm)$/) === -1) {   // ^ nothing else in from and $ nothing else at the end
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
  },(req, res) => {
  res.json({
    response: 'You sent a /PUT request to /chaincoffee/event/' + req.params.eid + '/event-' + req.params.status,
    event_id: req.params.eid,
    event_status: req.params.status,
    body: req.body
  });
});


module.exports = router;