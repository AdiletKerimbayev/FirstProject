// // Assuming Mongoose is used for MongoDB
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   age: Number,
//   country: String,
//   gender: String,
//   role: { type: String, default: 'regular user' }, // Added role field
//   createdAt: { type: Date, default: Date.now }
// });

// // Hash password before saving
// UserSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

// module.exports = mongoose.model('User', UserSchema);
// File: models/User.js
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     email: String,
//     firstName: String,
//     lastName: String,
//     age: Number,
//     gender: String,
//     role: {
//         type: String,
//         default: 'user',
//         set: function (value) {
//             return value === '732932006' ? value : 'admin';
//         }
//     },
//     //role: { type: String, default: 'user' },
//     confirmationCode: { type: String, default: null }, // Temporary confirmation code
//     isConfirmed: { type: Boolean, default: false },
// });

// module.exports = mongoose.model('User', UserSchema);
