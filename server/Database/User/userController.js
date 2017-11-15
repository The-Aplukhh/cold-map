var User = require("./userModel.js");
module.exports.handleUsers={
  getAll: function(req,res){
    User.find().exec(function(err,allUsers) {
      if(err){
        res.status(500).send(err)
      }else{
        res.json(allUsers);
      }
    })
  },
  addUser:function(req,res){
    var name=req.body.name;
    var cohort=req.body.cohort;
    var email=req.body.email;
    User.create({
      name:name,
      cohort:cohort,
      email:email
    },function(err,ok){
      if(err){
        res.json(err);
      }
      else{
        console.log(ok);
        res.json("added successfully!!");
      }
    })
  },
  deleteUser:function(req,res){
    var id=req.body.name;
    User.remove({name:name},function(err,user){
      if(err){
        res.json(err)
      }
      else{
        res.json(user);
      }
    })
  }
}
