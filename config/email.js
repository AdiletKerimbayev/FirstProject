// File: /config/email.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465, // For secure SSL
    secure: true, // Use SSL
    auth: {
        user: 'adiletkerimbayev@yandex.com', // Replace with your Yandex email
        pass: 'dfwnfdbkpmxcznjw', // Replace with your Yandex password or App Password
    },
});

module.exports = transporter;