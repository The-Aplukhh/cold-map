var mongoose= require ("mongoose");

var studentSchema = new mongoose.Schema({

	name:{
		type     : String,
		required : true,

	},
	cohort:{
		type     : Number,
		required : true,

	}
	
	});

var Student = mongoose.model('Student', studentSchema);
module.exports = Student;
