var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('feedback', { title: 'Feed back form' });
});

router.post('/', function(req, res) {
	
	var firstname = req.body.firstname;
	var email 	  = req.body.email;
	var comment   = req.body.comment;
	var message	  = '';
	
	if(firstname == '' || email == '' || comment == '')
		var message = "Please fill all the required fields s";
	
	res.render('feedback', { title: 'Feed back form submit', message: message });
});


router.get('/email', function(req, res) {
	
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
	 html: "<b>Hello world ✔</b>" // html body
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

	res.end();
});



module.exports = router;
