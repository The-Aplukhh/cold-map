var passport = require('passport');

var student = require('../Database/Student/studentController.js');
var staff = require('../Database/Staff/staffController.js');
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

    app.get('/api/students', student.handleStudents.getAll);
    app.post('/api/deleteStudent', student.handleStudents.deleteStudent);
<<<<<<< 29942f1dbcb94ce1e8fcb5fd8e986a76532b7bc1
    app.post('/api/addStudent', student.handleStudents.addStudent);
=======
    app.post('/api/addStudent' , student.handleStudents.addStudent);
>>>>>>> save morning and noon data
    //staff routes
    app.get('/api/staffs', staff.handleStaffs.getAll);
    app.post('/api/deleteStaff', staff.handleStaffs.deleteStaff);
<<<<<<< 29942f1dbcb94ce1e8fcb5fd8e986a76532b7bc1
    app.post('/api/addStaff', staff.handleStaffs.addStaff);
    //data routes
    app.get('/api/dailyData', data.handleData.getAll);
    app.post('/api/addData', data.handleData.addData);
=======
    app.post('/api/addStaff' , staff.handleStaffs.addStaff);
    //data routes
    app.get('/api/dailyData' , data.handleData.getAll);
    app.post('/api/addData' , data.handleData.addData);
    app.put('/api/updateData' , data.handleData.updateData); 
>>>>>>> save morning and noon data

}
