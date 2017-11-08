var Data = require("./dailyDataModel.js");
module.exports.handleData = {
  getAll: function(req, res) {
    Data.find().exec(function(err, allData) {
      if (err) {
        res.status(500).send(err)
      } else {
        res.json(allData);
      }
    })
  },
  addData: function(req, res) {


    var morning = req.body.pairData;
    var studentName = req.body.emotionalHealth;
    var attendance = req.body.attendance;
    var id = req.body.userId;
    var date = new Date;
    date = date.toDateString()

    Data.create({
      morning: morning,
      attendance: attendance,
      studentId: id,
      studentName: studentName,
      date: date
    }, function(err, ok) {
      if (err) {
        console.log(err)
        res.json(err);
      } else {
        console.log(ok)
        res.json("added successfully!!")
      }
    })
  },
  updateData: function(req, res) {
    var x = new Date
    x = x.toDateString()
    Data.findOneAndUpdate({
      "studentName": req.body.Name,
      "date": x
    }, {
      "noon": req.body.noon
    }, function(err, data) {
      if (err) {
        res.json(err)
      } else {
        res.json("added successfully!!")
      }
    })
  }
}
