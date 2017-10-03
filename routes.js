'use strict'

let user_service = require('./route/user');
let event_service = require('./route/event');
let authentication_service = require('./route/auth');
let authentication_middleware = require('./extend/auth');

let express = require('express');
let router = express.Router();

// first parameter is the route, second parameter is the callback function
// Return a message
router.get('/', (req, res) => {
  // res.json ends the lifecycle of the request and sends a response back to the client
  // res.json takes care of turning the response into json
  res.json({
    response: 'You sent a /GET to /chaincoffee/',
    oauth: 'we need some proper security'
  });
});

// REGISTER
router.post('/register', user_service.register_user, authentication_service.login);

// LOGIN
router.post('/login', authentication_middleware.user_credentials, authentication_service.login);

// LOGOUT
router.post('/logout', authentication_service.logout);

// USER
router.post('/user', user_service.post_user);
router.get('/user', user_service.list_user);
router.get('/user/:id', user_service.get_user);
router.put('/user/:id', user_service.put_user);
router.delete('/user/:id', user_service.delete_user);

// EVENT
router.post('/event', event_service.post_event, user_service.put_user);
router.get('/event', event_service.list_event);
router.get('/event/:id', event_service.get_event);
router.put('/event/:id', event_service.put_event);
router.delete('/event/:id', event_service.delete_event, user_service.put_user);

module.exports = router;