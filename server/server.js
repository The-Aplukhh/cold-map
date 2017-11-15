var OauthKeys = require('./secrets.js');
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
var db = mongoose.connect(mongoUri, { useMongoClient: true });
db = mongoose.connection;


db.on('error', function () {
	console.log('mongoose connection error');
});

db.once('open', function () {
	console.log('mongoose connected successfully');
});

//=============================================================================
/*									Server   								 */
//=============================================================================

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});


// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
	clientID: OauthKeys.GITHUB_CLIENT_ID,
	clientSecret: OauthKeys.GITHUB_CLIENT_SECRET,
	callbackURL: "http://localhost:8000/auth/github/callback",
	scope: [ 'user:email' ],
},

	function (accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...

		// To keep the example simple, the user's GitHub profile is returned to
		// represent the logged-in user.  In a typical application, you would want
		// to associate the GitHub account with a user record in your database,
		// and return that user instead.
		console.log('-----------------rofile', profile);
		User.findOne({ github: profile.id }, function (err, user) {
			if (err) {
				console.log(err);
				return done(null, null);
			} if (!err && user != null) {
				console.log('%s %s is a %s.', user.name.first, user.name.last, user.occupation)
				return done(null, user)
			} else {
				const newUser = new User({
					name: profile.username,
					github: profile.id,
					code: accessToken,
					cohort: "invalid",
					token: refreshToken,
					email: profile.email
				});
				newUser.save((err) => {
					if (err) {
						console.log('err: ', err);
					} else {
						return done(null, newUser);
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


// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
	passport.authenticate('github', { scope: ['user:email' ] }),
	function (req, res) {
		// The request will be redirected to GitHub for authentication, so this
		// function will not be called.
	});

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
	passport.authenticate('github', { failureRedirect: '/login' }),
	function (req, res) {
		res.redirect('localhost/logedin');
	});

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/api/loggedin', (req, res) => {
	console.log('In authenticate')
	console.log('req.session', req.session)
	console.log('req.user', req.user);
	console.log('req.session.username', req.session.username)
	res.json(req.user);

});


require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);




var port = process.env.PORT || 8000
app.listen(port, function () {
	console.log('listening on port' + port);
});

module.exports = app
