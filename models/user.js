const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "createdAt": {
        type: Date,
        default: Date.now
    },
    "updatedAt": {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema, 'users');