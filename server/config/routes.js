var passport = require('passport');

var user = require('../Database/User/userController.js');
var data = require('../Database/DailyData/dailyDataContoller.js')

module.exports = function (app) {


    // GET /auth/github
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in GitHub authentication will involve redirecting
    //   the user to github.com.  After authorization, GitHub will redirect the user
    //   back to this application at /auth/github/callback
    app.get('/auth/github',
        passport.authenticate('github', { scope: ['user:email'] }),
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

    app.get('/api/loggedin',(req, res) => {
        console.log('In authenticate')
        console.log('req.session.sessionId', req.session.sessionId)
        console.log('req.session.username', req.session.username)
        res.json(req.session);

    });

    app.get('/api/users', user.handleUsers.getAll);
    app.post('/api/deleteuser', user.handleUsers.deleteUser);
    app.post('/api/adduser', user.handleUsers.addUser);
    //staff routes
    // app.get('/api/staffs', staff.handleStaffs.getAll);
    // app.post('/api/deleteStaff', staff.handleStaffs.deleteStaff);
    // app.post('/api/addStaff', staff.handleStaffs.addStaff);
    //data routes
    app.get('/api/dailyData', data.handleData.getAll);
    app.post('/api/addData', data.handleData.addData);

}
