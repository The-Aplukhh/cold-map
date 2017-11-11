var OauthKeys =  require('./secrets.js');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var GitHubStrategy = require('passport-github2').Strategy;
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var User = require("./Database/User/userModel");




//=============================================================================
/*									Database								 */
//=============================================================================

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/RbkDB';
var db = mongoose.connect(mongoUri,{ useMongoClient: true });
db = mongoose.connection;

//=============================================================================
/*									Server   								 */
//=============================================================================

passport.serializeUser(function(user, done) {
	done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});
  
  
// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
	clientID: OauthKeys.GITHUB_CLIENT_ID,
	clientSecret: OauthKeys.GITHUB_CLIENT_SECRET,
	callbackURL: "https://localhost/loggedin"
},

	function (accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...

		// To keep the example simple, the user's GitHub profile is returned to
		// represent the logged-in user.  In a typical application, you would want
		// to associate the GitHub account with a user record in your database,
		// and return that user instead.
		User.findOne({ github: profile.id }, function (err, person) {
			if (err) {
				console.log(err);
				done(null, null);
			} if (!err && user != null) {
				console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation)
				done(null, user)
			} else {
				const user = new User({
					name: profile.name,
					github: profile.displayName,
					code: accessToken,
					cohort: "invalid",
					token: refreshToken,
					email: profile.email
				});
				user.save((err) => {
					if (err) {
						console.log('err: ', err);
					} else {
						done(null, user);
					}
				})
			}
		});

	}
));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);




var port = process.env.PORT || 8000
app.listen(port ,function () {
	console.log('listening on port' + port);
});

module.exports = app
