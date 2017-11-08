var student = require('../Database/Student/studentController.js');
var staff = require('../Database/Staff/staffController.js');
var data=require('../Database/DailyData/dailyDataContoller.js')
module.exports = function (app) {
    app.get('/api/students' , student.handleStudents.getAll);
    app.post('/api/deleteStudent', student.handleStudents.deleteStudent);
    app.post('/api/addStudent' , student.handleStudents.addStudent);
    //staff routes
    app.get('/api/staffs' , staff.handleStaffs.getAll);
    app.post('/api/deleteStaff', staff.handleStaffs.deleteStaff);
    app.post('/api/addStaff' , staff.handleStaffs.addStaff);
    //data routes
    app.get('/api/dailyData' , data.handleData.getAll);
    app.post('/api/addData' , data.handleData.addData);
    app.put('/api/updateData' , data.handleData.updateData); 

}
