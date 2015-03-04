
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


var registerEmail = function(data){	
	
	var nodemailer = require("nodemailer");
	
	//create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	 service: "Gmail",
	 auth: {
		 user: 'redloupmenswear@gmail.com',
	     pass: 'dresscode'
	 }
	});
	
	var comments = '';
	if(data.comment)
		comments = "Comments: " + data.comment;
	
	//setup e-mail data with unicode symbols
	var mailOptions = {
		from: data.fname + " <" + data.email + ">", // sender address
		to: "sajin@qburst.com", // list of receivers
		subject: "New user registration from local", // Subject line
		text: "Hello world ✔", // plaintext body
		html: "<b>User Details</b> "+ 
			  "User name : " + data.username + "<br>" + // html body
			  "Password : " + data.password + "<br>" +
			  "First name : " + data.fname + "<br>" +
			  "Last name : " + data.lname + "<br>" + comments
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
exports.registerEmail = registerEmail;