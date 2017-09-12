/**
 * This module sets up the error message emails for when the program is 
 * running on the server unsupervised.
 */
const config = require('../config');
const nodemailer = require('nodemailer');

const email = (message, err) => {
	'use strict';

	// Nodemailer instance
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		user: config.user,
		pass: config.pass
		}
	});

	// Create message
	const emailMessage = {
		from: config.user,
		to: config.user,
		subject: 'Message from devskills API',
		html: '<p>' + message + '</p>' +
			'<p>' + err + '</p>'           
	};

	// Send the mail
	transporter.sendMail(emailMessage, function(err, info){
		if(err){
			return console.log(err);
		}
		console.log('Message sent: ' + info.response);
	});
}

module.exports = email;