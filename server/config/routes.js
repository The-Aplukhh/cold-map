var student = require('../Database/Student/studentController.js');
module.exports = function (app) {
    app.get('/api/students' , student.handleStudents.getAll);
    app.post('/api/deleteStudent', student.handleStudents.deleteStudent);
    app.post('/api/addStudent' , student.handleStudents.addStudent); 
}
