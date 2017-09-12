'use strict'

let express = require('express');   // import express
let app = express();    // define the express instance
let jsonParser = require('body-parser').json;   // import body-parser's json parser
let logger = require('morgan');

// import router
let routes = require('./routes');

// logger will give us status code for our api responses
app.use(logger('dev'));
// parse the request.body object to json an make is accessible from req.body
app.use(jsonParser());

// all routes are is ./routes.js
app.use('/chaincoffee', routes);


// app.use is used by all requests unless it has a /route defined before the callback function
app.use((req, res, next) => {
  console.log('first piece of middleware');
  next();   // if an argument is passed to next, it goes straight to the error handler
});







// will run on port 3000 unless the app is running on a production environment
let port = process.env.PORT || 3000;

// set the port for the app to listen on
app.listen(port, () => {
  console.log('Express server is listening on port', port);
});
