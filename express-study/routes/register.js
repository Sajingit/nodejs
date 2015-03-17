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
	
	//checkUser (req.body);
	
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
		
		//var usernameCount = getUsernameCount (req.body.usename, function(err,a){ console.log(a);return a;});
		//var emailCount = getEmailCount (req.body.email);
		
		//console.log(usernameCount);
		//console.log("GET Email COUNT:: " + emailCount);
		
		saveUserDatas(req.body, res);
		
		email.registerEmail(req.body);
		
		
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
 * Save user datas to mongodb
 */
var saveUserDatas = function(data, res){
	
	var user = require('../model/register');
	
	user.UserCredentials.count({ username: data.username}, function(err, count){
		if (err) throw err;
		console.log(count);
		if(count > 0){
			var usernameErrMsg = 'Username is already in use';
		}else {
			
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
		
		obj = initialFormObjects();console.log(usernameErrMsg);
		var err = [{
				msg: usernameErrMsg	
		}]
		res.render('register', { title: 'Registration form', errors:err, data:obj});
		
	});
}

/**
 * Function used to get username is already in use
 * @username String - Username
 */
var getUsernameCount = function(username, callback){
	
	var user = require('../model/register');
	user.UserDetails.count({ username: username}, callback);

}

/**
 * Function used to get user email is already in use
 * @email String - Email
 */
var getEmailCount = function(email){
	
	var user = require('../model/register');
	
	user.UserDetails.count({ email: email}, function (err, result){
		return result;
	});
	
}




exports.initialFormObjects = initialFormObjects;
module.exports = router;