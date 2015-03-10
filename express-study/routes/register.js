//grab the things we need
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {
	
	var obj = initialFormObjects();
	res.render('register', { title: 'Registration form', data:obj  });
});


/**
 * Handle post section in registration form
 */
router.post('/', function(req, res) {
	
	var email = require('../shared/email');
	var User = require('../model/register');
	
	//Form validation
	req.assert('username', 'Usename field is empty').notEmpty();
	req.assert('password', 'Password must be at least 6 characters').notEmpty();
	req.assert('repassword', 'Confirm password must be at least 6 characters').len(6);
	req.assert('fname', 'First name field is empty').notEmpty();
	req.assert('lname', 'Last name field is empty').notEmpty();
	req.assert('email', 'Valid email required').isEmail();
	
	if(req.body.password && req.body.repassword)
		req.assert('repassword', 'Passwords do not match').equals(req.body.password);
	
	//Get error objects
	var errors = req.validationErrors();
	
	if(errors){
		
		res.render('register', { title: 'Registration form' , errors:errors, data:req.body });
	}
	else {
		
		var newUser = User.UserAuthModel({
			
		username: req.body.username,
		password: req.body.password
		
		});
		
		var newUserDetails = User.UserDetailsModel({
			
			fname: req.body.fname,
			lname: req.body.lname,
			email: req.body.email,
			comments: req.body.comments
			
		});
		
		
		
		// call the built-in save method to save to the database
		newUser.save(function(err,room) {
		  if (err) throw err;
		  
		  console.log("Room::" + room )
		  console.log('User saved successfully!');
		});
		
		// call the built-in save method to save to the database
		newUserDetails.save(function(err) {
		  if (err) throw err;

		  console.log('User Details saved successfully!');
		});
		
		email.registerEmail(req.body);
		
		obj = initialFormObjects();
		res.render('register', { title: 'Registration form' , error:{}, data:obj });
	}
});


/**
 * Initialize form objects to null
 */
var initialFormObjects = function(){
	
	obj = {
			username:'',
			password:'',
			repassword:'',
			fname:'',
			lname:'',
			email:'',
	}
	
	return obj;
	
}

exports.initialFormObjects = initialFormObjects;
module.exports = router;