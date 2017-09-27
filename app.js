'use strict'
/* =============== APP =============== */
let express = require('express');   // import express
let jsonParser = require('body-parser').json;   // import body-parser's json parser
let mongoose = require('mongoose');
let session = require('express-session');

/* =============== EXPRESS =============== */
let app = express();    // define the express instance

/* =============== DEV =============== */
let logger = require('morgan');

/* =============== LOCAL =============== */
let routes = require('./routes');
let authentication_service = require('./route/authentication');

/* =============== MONGODB =============== */
mongoose.Promise = global.Promise;      // handle gloabal promises
mongoose.connect('mongodb://localhost:27017/chaincoffee', { useMongoClient: true });  // connect to localhost Mongodb

let db = mongoose.connection;     // create connection to Mongo

db.on('error', console.error.bind(console, 'Mongo connection error: '));    // prevision for any errors

db.once('open', function() {
    console.log('Mongo connection successful');   // prints message to confirm connection. mongoose stores interim requests and stores when the db is ready
});

/* =============== MIDDLEWARE =============== */

// white listed routes
let white_listed_routes = [
        '/login'
];

app.use((req, res, next) => {
   req.white_listed = white_listed_routes;
   next();
});

// logger will give us status code for our api responses
app.use(logger('dev'));

// parse the request.body object to json an make is accessible from req.body
app.use(jsonParser());

// use sessions for tracking logins
app.use(session({
    secret: 'chain coffee loves good coffee',
    resave: true,
    saveUninitialized: false
}));

// route user authentication
// app.use(authentication_service.route_authentication);

/* =============== ROUTES =============== */
// all routes are is ./routes.js
app.use(routes);

/* =============== ERROR HANDLER =============== */

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

/* =============== PORT AND LISTEN =============== */

// will run on port 3000 unless the app is running on a production environment
let port = process.env.PORT || 3000;

// set the port for the app to listen on
app.listen(port, () => {
  console.log('Express server is listening on port', port);
});
