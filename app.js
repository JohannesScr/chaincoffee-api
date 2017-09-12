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


// error handler for routes
// catch 404 and pass to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found'); // use javascript's native error constructor to create an error
  err.status = 404;                 // part of the error constructor and will get passed to the error handler
  next(err);                        // calling next with a parameter signals that there was an error
  // then it will call the error handler and pass the err parameter onto the handler
});

// if express encouters an error, it stops everything it is doing and passes the error to the first error handler it finds
// an error handler has 4 arguments in its call-back function
// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);    // if there is an err status else use 500 (Internal Server Error)
  res.json({
    error: {
      message: err.message          // err.message = new Error('text in here')
    }
  });
});

// will run on port 3000 unless the app is running on a production environment
let port = process.env.PORT || 3000;

// set the port for the app to listen on
app.listen(port, () => {
  console.log('Express server is listening on port', port);
});
