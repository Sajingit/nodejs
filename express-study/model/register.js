//grab the things we need
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
		
	});
}

//Set passport for authentication
passport.use('local', new LocalStrategy(
  function(username, password, done) {
	  
	  console.log("SAJIN TEST");
	  UserDetails.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	UserDetails.findById(id, function(err, user) {
	  done(err, user);
	});
});




