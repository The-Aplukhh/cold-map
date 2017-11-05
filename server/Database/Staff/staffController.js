var Staff = require("./staffModel.js");
module.exports.handleStaffs={
  getAll: function(req,res){
    Staff.find().exec(function(err,allStaffs) {
      if(err){
        res.status(500).send(err)
      }else{
        res.json(allStaffs);
      }
    })
  },
  addStaff:function(req,res){
    var username=req.body.username;
    var email=req.body.email
    
    Staff.create({
      username:username,
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
  deleteStaff:function(req,res){
    var id=req.body.username;
    Student.remove({username:username},function(err,Staff){
      if(err){
        res.json(err)
      }
      else{
        res.json(Staff);
      }
    })
  }
}
