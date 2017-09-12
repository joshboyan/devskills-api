const config = require('./config');
const nodemailer = require('nodemailer');

const email = (message, err) => {
  'use strict';

  // Nodemailer instance
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.user,
      pass: config.pass
    }
  });

  // Create message
  var message = {
        from: config.user,
        to: config.user,
        subject: 'Message from devskills API',
        html: '<p>' + message + '</p>' +
              '<p>' + err + '</p>'           
    };

    // Send the mail
    transporter.sendMail(message, function(err, info){
        if(err){
            return console.log(err);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = email;