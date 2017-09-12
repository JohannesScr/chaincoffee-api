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
    response: 'You sent a /GET to /chaincoffee/user'
  });
});

// /POST /chaincoffee/user
// route to create a new user
router.post('/user', (req, res) => {
  res.json({
    response: 'You sent a /POST to /chaincoffee/user',
    body: req.body
  });
});

// /GET /chaincoffee/user/:uid
// route to get a specific user
router.get('/user/:uid', (req, res) => {
  res.json({
    response: 'You sent a /GET to /chaincoffee/user/' + req.params.uid
  });
});

// /DELETE /chaincoffee/user/:uid
// route to remove a new user
router.delete('/user/:uid', (req, res) => {
  res.json({
    response: 'You sent a /DELETE to /chaincoffee/user/' + req.params.uid
  });
});


module.exports = router;