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
		
		saveUserDatas(req.body);
		
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


/**
 * Initialize form objects to null
 */
var saveUserDatas = function(data){
	
	var user = require('../model/register');
	
	var userCredential = user.UserCredentials({
		username: data.username,
		password: data.password
	});
	
	// call the built-in save method to save to the database
	userCredential.save(function(err,response) {
		if (err) throw err;
		  
		
		var userDetail = user.UserDetails({
			user_id:response.id,
			fname: data.fname,
			lname: data.lname,
			email: data.email,
			comments: data.comments
		});
		
		// call the built-in save method to save to the database
		userDetail.save(function(err) {
		  if (err) throw err;

		  console.log('User Details saved successfully!');
		});
		
	});
	
}


exports.initialFormObjects = initialFormObjects;
module.exports = router;