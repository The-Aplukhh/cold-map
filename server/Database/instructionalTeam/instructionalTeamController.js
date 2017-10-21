var Staff= require ('./instructionalTeamModel');

module.exports.handleStaffs={
  getAll: function(req,res){
    Staff.find().exec(function(err,allStaffs) {
      if(err){
        res.status(500).send(err);
      }else{

        res.json(allStaffs);
      }
    })
  },

  addStaff:function(req,res){

    var username=req.body.usernaame;
    var password=req.body.password;
    
    Staff.create({
      username:username,
      password:password
      
    },function(err,ok){
      if(err){
        res.json(err);
      }
      else{
        console.log(ok)
        res.json("sucessfully added!!")
      }

    })
  }
}

