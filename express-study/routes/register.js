//grab the things we need
var express = require('express');
var router  = express.Router();
var email 	= require('../shared/email');
var reg 	= require('../model/register');

router.get('/', function(req, res) {
	
	var obj = initialFormObjects();
	res.render('register', { title: 'Registration form', data:obj  });
	
});


/**
 * Handle post section in registration form
 */
router.post('/', function(req, res) {
	
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
		console.log(errors);
		res.render('register', { title: 'Registration form' , errors:errors, data:req.body });
	}
	else {
		
		//Save user data to mongo userdata table
		reg.saveUserDatas(req.body, function(msg){
			if(msg != 'SUCCESS'){

				var err = [{
					msg: msg	
				}];
				
				obj = req.body;
				
			}else{
				console.log("a");
				var obj = initialFormObjects();
				email.registerEmail(req.body);
			}
			
			res.render('register', { title: 'Registration form', errors:err, data:obj});
			
		});
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