
let q = require('q');
let User = require('../model/user');
let Event = require('../model/event');

/* =============== PRIMARY FUNCTIONS =============== */

exports.add_user_query_params = () => {
    /** add_query_params - for all list routes to add specific query parameters from the in the api call to get specific
     *      data as needed.
     * @param {string} sql
     * @param {object} query
     *
     *
     * @return {object} sql */

    let d = q.defer();

    // get all users
    console.log('GET ALL USERS: ');
    User.find({})                      // find({}) to get all the results
            .exec((err, user) => {   // then execute the callback function
                if (err) d.reject(err);
                d.resolve(user);
            });

    return d.promise;
};

exports.add_event_query_params = () => {
    /** add_query_params - for all list routes to add specific query parameters from the in the api call to get specific
     *      data as needed.
     * @param {string} sql
     * @param {object} query
     *
     *
     * @return {object} sql */

    let d = q.defer();

    // get all events
    console.log('GET ALL USERS: ');
    Event.find({})                      // find({}) to get all the results
            .exec((err, event) => {   // then execute the callback function
                if (err) d.reject(err);
                d.resolve(event);
            });

    return d.promise;
};

/* =============== SECONDARY FUNCTIONS =============== */