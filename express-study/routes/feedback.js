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
	
	var email = require('../shared/email');
	
	if(firstname == '' || email == '' || comment == ''){
		var message = "Please fill all the required fields";
	}else {
		email.feedbackEmail(req, res);
	}
	
	res.render('feedback', { title: 'Feed back form submit', message: message });
});





router.get('/email', function(req, res) {
	
	email.feedbackEmail(req, res);
	
});



module.exports = router;
