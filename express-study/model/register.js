//grab the things we need
var mongoose = require('mongoose');

//Create user auth schema
var UserCredentialSchema = mongoose.Schema({
	
	username: String,
	password: String
	
});

//Create user model
var UserCredentials = mongoose.model('UserCredentials', UserCredentialSchema, 'usercredentials');  


//Create user details schema
var UserDetailsSchema = mongoose.Schema({
	user_id: String,
	fname: String,
	lname: String,
	email: String,
	comments: String
	
});

//Create user model
var UserDetails = mongoose.model('UserDetails', UserDetailsSchema, 'userdetails');


// make this 'UserModel' model available to our users in our Node applications
exports.UserCredentials = UserCredentials; 
exports.UserDetails = UserDetails; 




