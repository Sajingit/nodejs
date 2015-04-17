//grab the things we need
var express = require('express');
var router  = express.Router();
var passport = require('passport');


router.get('/', function(req, res) {
	
	var obj = initialFormObjects();
	res.render('login', { title: 'Login form', data:obj  });
	
});


router.post('/',
		  passport.authenticate('local', { successRedirect: '/',
		                                   failureRedirect: '/loginfailure',
		                                   failureFlash: true 
		                                   })
		);





/*router.post('/', function(req, res) {
	
	console.log(req.body);
	req.assert('username', 'Please fill your username').notEmpty();
	req.assert('password', 'Please fill your password').notEmpty();
	
	//Get error objects
	var errors = req.validationErrors();
	
	if(errors){
		res.render('login', { title: 'Login form' , errors:errors, data:req.body });
		
	}else{
		
		
		
		res.render('register', { title: 'Registration form', errors:err, data:obj});
	}
	
	//var obj = initialFormObjects();
	//res.render('login', { title: 'Login form', data:obj  });
	//
	
});*/

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

module.exports = router;