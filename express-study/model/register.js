//grab the things we need
var mongoose = require('mongoose');

//Create user auth schema
var userAuthSchema = mongoose.Schema({
	
	username: String,
	password: String
	
});

//Create user model
var UserAuthModel = mongoose.model('UserAuthModel', userAuthSchema);  


//Create user details schema
var userDetailsSchema = mongoose.Schema({
	
	fname: String,
	lname: String,
	email: String,
	comments: String
	
});

//Create user model
var collectionName = 'gillubaby'
var UserDetailsModel = mongoose.model('UserSajin', userDetailsSchema, collectionName);


// make this 'UserModel' model available to our users in our Node applications
exports.UserAuthModel = UserAuthModel; 
exports.UserDetailsModel = UserDetailsModel; 
