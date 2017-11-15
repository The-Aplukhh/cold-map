var passport = require('passport');

var user = require('../Database/User/userController.js');
var data = require('../Database/DailyData/dailyDataContoller.js')

module.exports = function (app) {


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
