var mongoose= require ("mongoose");

var dailyDataSchema = new mongoose.Schema({

	pairData:{
		type     : String,
		required : true

	},
	emotionalHealth:{
		type     : String,
		required : true

	},
	attendance:{
		type     : String,
		required : true

	},
	
	date:{
		type: Date,
		default: Date.now
	},
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Student'
	}
});

var Data = mongoose.model('Data', dailyDataSchema)
module.exports = Data ;
