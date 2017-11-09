var mongoose = require("mongoose");

var dailyDataSchema = new mongoose.Schema({

  pairData: {
    type: String
  },
  night: {
    type: String
  },
  attendance: {
    type: String
  },
  morning: {
    type: String,
    required: true
  },
  noon: {
    type: String
  },
  date: {
    type: Date
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
	studentName: {
		type : String
	}
});

var Data = mongoose.model('Data', dailyDataSchema)
module.exports = Data;
