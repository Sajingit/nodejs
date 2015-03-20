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
exports.UserDetails = UserDetails; 




