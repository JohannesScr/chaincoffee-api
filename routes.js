'use strict'

let user_service = require('./route/user');
let event_service = require('./route/event');
let authentication_service = require('./route/login');

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

// LOGIN
router.post('/login', authentication_service.login);

// LOGOUT
router.post('/logout', (req, res) => {});

// USER
router.get('/user', user_service.get_user);
router.post('/user', user_service.post_user);
router.put('/user/:id', user_service.put_user);
router.delete('/user/:id', user_service.delete_user);

// todo refactor
// /GET /chaincoffee/user/:uid/event
// route to return all the events associated to that user
// router.get('/user/:uid/event', (req, res) => {
//   res.json({
//     response: 'You sent a /GET request to /chaincoffee/user' + req.params.uid + '/event to get all the events of this user on the system',
//     output: 'Return all the events associated to user' + req.params.uid,
//     user_id: req.params.uid
//   });
// });

// todo refactor
// /GET /chaincoffee/user/:uid/event/:eid
// route to return a specific event associated to that user
// router.get('/user/:uid/event', (req, res) => {
//   res.json({
//     response: 'You sent a /GET request to /chaincoffee/user' + req.params.uid + '/event/' + req.params.eid + ' to get all the events of this user on the system',
//     output: 'Return event '+ req.params.eid +' associated to user' + req.params.uid,
//     user_id: req.params.uid,
//     event_id: req.params.eid
//   });
// });

// EVENT
router.get('/event', event_service.get_event);
router.post('/event', event_service.post_event);
router.put('/event/:id', event_service.put_event);
router.delete('/event/:id', event_service.delete_event);

// todo refactor
// /POST /chaincoffee/event/:eid/event-quote
// /POST /chaincoffee/event/:eid/event-cancel
// /POST /chaincoffee/event/:eid/event-confirm
// route to update a specific event's status
// router.post('/event/:eid/event-:status', (req, res, next) => {
//   if(req.params.status.search(/^(quote|cancel|confirm)$/) === -1) {   // ^ nothing else in from and $ nothing else at the end
//     let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   } else {
//     next();
//   }
//   },(req, res) => {
//   res.json({
//     response: 'You sent a /PUT request to /chaincoffee/event/' + req.params.eid + '/event-' + req.params.status,
//     event_id: req.params.eid,
//     event_status: req.params.status,
//     body: req.body
//   });
// });


module.exports = router;