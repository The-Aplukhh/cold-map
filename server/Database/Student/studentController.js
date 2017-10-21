var Student = require('./studentModel.js');
module.exports.handleStudents={
  getAll: function(req,res){
    Student.find().exec(function(err,allStudents) {
      if(err){
        res.status(500).send(err);
      }else{

        res.json(allStudents);
      }
    })
  },

  addStudent:function(req,res){

    var name=req.body.name;
    var cohort=req.body.cohort;
    
    Student.create({
      name:name,
      cohort:cohort
      
    },function(err,ok){
      if(err){
        res.json(err);
      }
      else{
        console.log(ok)
        res.json("sucessfully added!!")
      }

    })
  },

  deleteStudent:function(req,res){
    var name=req.body.name;
    Student.remove({name:name},function(err,ok){
      if(err){
        res.json(err)
      }
      else{
        res.json(ok)
      }
    })
  }
}
