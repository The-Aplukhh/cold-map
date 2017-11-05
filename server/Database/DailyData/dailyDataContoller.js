var Data = require("./dailyDataModel.js");
module.exports.handleData={
  getAll: function(req,res){
    Data.find().exec(function(err,allData) {
      if(err){
        res.status(500).send(err)
      }else{
        res.json(allData);
      }
    })
  },
  addData:function(req,res){
    var pairData=req.body.pairData;
    var emotionalHealth=req.body.emotionalHealth;
    var attendance=req.body.attendance;
    var id=req.body.userId;
console.log(id)
    
    Data.create({
      pairData:pairData,
      emotionalHealth:emotionalHealth,
      attendance:attendance,
      studentId:id
    },function(err,ok){
      if(err){
        res.json(err);
      }
      else{
        console.log(ok)
        res.json("added successfully!!")
      }
    })
  }
}