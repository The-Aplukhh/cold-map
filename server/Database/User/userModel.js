var mongoose= require ("mongoose");
var userSchema = new mongoose.Schema({

	name:{
		type     : String,
		required : true

	},
	github:{
		type:	String,
		required: true
	},
	code: {
		type:	String,
		required: true
	},
	token:{
		type:	String,
	},
	cohort:{
		type     : String,
	},
	email:{
		type     : String
	}
	
	});

var User = mongoose.model('Student', userSchema);
module.exports = User;
