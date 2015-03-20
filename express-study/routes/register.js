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
	
	//var user = require('../model/register');
	
	//user.UserCredentials.find([{ username: req.body.username }, { email: req.body.email }], function(err, count){
		//console.log(count);
	//});
	
	//return false;
	
	
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
		
		saveUserDatas(req.body, res);
		
		
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
	
	var user  = require('../model/register');
	var email = require('../shared/email');
	var err	  = {};
	var duplicateMsg = null;
	
	user.UserDetails.count({ username: data.username}, function(err, count){
		
		if (err) throw err;

		if(count > 0){
			console.log("1");
			var duplicateMsg = 'Username is already in use';
			
		}else {
			console.log("2");
			user.UserDetails.count({ email: data.email}, function(err, count){
				if (err) throw err;
				console.log("COUNT::");console.log(count);
				if(count > 0){
					console.log("3");
					var duplicateMsg = 'Email is already in use';
					var name = 'sajin';
					
				}else{
					
					console.log("4");	  
					var userDetail = user.UserDetails({
						username: data.username,
						password: data.password,
						fname: data.fname,
						lname: data.lname,
						email: data.email,
						comments: data.comments
					});
					
					// call the built-in save method to save to the database
					userDetail.save(function(err) { console.log("5");
					  if (err) throw err;
	
					  console.log('User Details saved successfully!');
					  email.registerEmail(data);
					});
				}
			});
		}
		
		var obj = initialFormObjects();console.log('Name::');console.log(name);console.log(duplicateMsg);
		
		if(duplicateMsg){
			
			var err = [{
				msg: duplicateMsg	
			}];
			
			obj = data;
			
		}
		
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