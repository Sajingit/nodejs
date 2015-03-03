var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('register', { title: 'Feed back form' });
});


router.post('/', function(req, res) {
	
	  req.assert('username', 'Usename field is empty').notEmpty();
	  req.assert('password', 'Password field is empty').notEmpty();
	  req.assert('repassword', 'Confirm-Password field is empty').notEmpty();
	  req.assert('fname', 'First name field is empty').notEmpty();
	  req.assert('lname', 'Last name field is empty').notEmpty();
	  req.assert('email', 'Email is empty').notEmpty();
	  
	  req.assert('repassword', 'Passwords do not match').equals(req.body.password);
	  req.assert('email', 'Valid email required').isEmail();
	  
	  //req.assert('email', 'required').notEmpty();
	  
	  var errors = req.validationErrors(true);
	  
	  //var mappedErrors = req.validationErrors(true);
	  
	  console.log(errors);//return false;
	  
	  //console.log(mappedErrors);//return false;
	  if(errors)
		  res.render('register', { title: 'Feed back form' , errors:errors });
	  else
		  res.render('register', { title: 'Feed back form' , error:{} });
});




module.exports = router;