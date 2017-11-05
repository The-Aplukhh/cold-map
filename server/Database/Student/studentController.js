var Student = require("./studentModel.js");
module.exports.handleStudents={
  getAll: function(req,res){
    Student.find().exec(function(err,allStudents) {
      if(err){
        res.status(500).send(err)
      }else{
        res.json(allStudents);
      }
    })
  },
  addStudent:function(req,res){
    var name=req.body.name;
    var cohort=req.body.cohort;
    var email=req.body.email;
    Student.create({
      name:name,
      cohort:cohort,
      email:email
    },function(err,ok){
      if(err){
        res.json(err);
      }
      else{
        console.log(ok)
        res.json("added successfully!!")
      }
    })
  },
  deleteStudent:function(req,res){
    var id=req.body.name;
    Student.remove({name:name},function(err,student){
      if(err){
        res.json(err)
      }
      else{
        res.json(student);
      }
    })
  }
}
