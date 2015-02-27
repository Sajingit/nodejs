//var express = require('express');

var feedbackEmail = function(req, res){	
	
	var nodemailer = require("nodemailer");
	
	//create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	 service: "Gmail",
	 auth: {
		 user: 'redloupmenswear@gmail.com',
	     pass: 'dresscode'
	 }
	});
	
	//setup e-mail data with unicode symbols
	var mailOptions = {
	 from: "Fred Foo ✔ <saleemsajin@gmail.com>", // sender address
	 to: "sajin.don.143@gmail.com", // list of receivers
	 subject: "Hello ✔", // Subject line
	 text: "Hello world ✔", // plaintext body
	 html: "<b>Hello world ✔</b> "+req.body.firstname // html body
	}
	
	//send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
	 if(error){
	     console.log(error);
	 }else{
	     console.log("Message sent: " + response.message);
	 }
	
	 // if you don't want to use this transport object anymore, uncomment following line
	 //smtpTransport.close(); // shut down the connection pool, no more messages
	});

	//res.end();
}

exports.feedbackEmail = feedbackEmail;