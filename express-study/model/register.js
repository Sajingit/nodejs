//grab the things we need
var mongoose = require('mongoose');

//Create user auth schema
var UserDetailsSchema = mongoose.Schema({
	
	username: String,
	password: String,
	fname: String,
	lname: String,
	email: String,
	comments: String
	
});

//Create user model
var UserDetails = mongoose.model('UserDetails', UserDetailsSchema, 'userdetails');  

// make this 'UserDetails' model available to Node applications
//exports.UserDetails = UserDetails; 



/**
 * Save user datas to mongodb
 */
exports.saveUserDatas = function(data, callback){
	
	//var email = require('../shared/email');
	
	UserDetails.count({ username: data.username}, function(err, count){
		
		if (err) throw err;

		if(count > 0){
			callback('Username is already in use');
			
		}else {
			UserDetails.count({ email: data.email}, function(err, count){
				if (err) throw err;
				
				if(count > 0){
					callback('Email is already in use');
				}else{
					
					var userDetail = UserDetails({
						username: data.username,
						password: data.password,
						fname: data.fname,
						lname: data.lname,
						email: data.email,
						comments: data.comments
					});
					
					// call the built-in save method to save to the database
					userDetail.save(function(err) { 
					  if (err) throw err;
					  //email.registerEmail(data);
					  callback('SUCCESS');
					});
				}
			});
		}
		
		//var obj = initialFormObjects();console.log('Name::');console.log(name);console.log(duplicateMsg);
		
		//if(duplicateMsg){
			
			//var err = [{
				//msg: duplicateMsg	
			//}];
			
			//obj = data;
			
		//}
		
		//res.render('register', { title: 'Registration form', errors:err, data:obj});
		
	});
}




