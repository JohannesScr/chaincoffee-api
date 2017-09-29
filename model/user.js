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

// authenticate input against database documents
// statics lets you add methods directly to the model
UserSchema.statics.authenticate = (email, password, callback) => { // callback added in route
    /** @param {string} email
     * @param {string} password
     * @param @function callback
     *
     * @description
     * This method on the UserSchema.
     * Calls the User.findOne method passing the {string} email in an object to find the document with a matching email and returns the {object} user.
     * Then checks for errors and an {object} user.
     * Then calls the bcrypt.compare method passing the {string} password and {string} user.password hashes the {string} password.
     *      compares the two hashes and returns a true or false depending on the match
     * Then calls the callback function if the result is true it sends the {object} user to the callback function
     * @return callback(null, user) */

    User.findOne({ email: email})
            .exec((error, user) => { // execute, then run the callback function to process results
                if (error) {
                    // db error
                    callback(error);

                } else if (!user) {
                    let err = new Error('User not found.');
                    err.status = 401;   // unauthorized
                    callback(err);

                }

                bcrypt.compare(password, user.password, (error, result) => {
                    if (result === true) {
                        callback(null, user);   // null represents the error value
                    } else {
                        callback();
                    }
                });
            });
};

// hash password before saving to the database
UserSchema.pre('save', function (next) {
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