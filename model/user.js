/* USER
* any type of user
* */

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let UserSchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
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
        type: String,
        default: 'client'
    },
    event: {
        type: Array
    }
});

// hash password before saving to the database
UserSchema.pre('save', (next) => {
    let user = this;    // this refers to the object instance we created

    bcrypt.hash(user.password, 10, (err, hash) => {  // 10 number of times to run the encryption algorithm

        if (err) {
            next(err);
        }

        user.password = hash;
        next();
    });
});

let User = mongoose.model('User', UserSchema);
module.exports = User;