/* USER
* any type of user
* */

let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true      // removed whitespace at the beginning or end
    },
    contact_number: {
        type: Number,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    user_type: {
        type: String || default 'client'
    },
    event: {
        type: Array
    }
});

let User = mongoose.model('User', UserSchema);
module.exports = User;