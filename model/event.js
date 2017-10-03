/* EVENT
* an event is a function or event at which a client would like a coffee service to be present
* */

let mongoose = require('mongoose');

let EventSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date
    },
    venue: {
        type: String,
        trim: true
    },
    town: {
        type: String,
        trim: true
    },
    distance_from_head_office: {
        type: Number,
        trim: true
    },
    number_of_guests: {
        type: Number,
        trim: true
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    }
});

let Event = mongoose.model('Event', EventSchema);
module.exports = Event;