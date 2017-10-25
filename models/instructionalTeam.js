var mongoose= require ("mongoose");

var staffSchema = new mongoose.Schema({

	username:{
		type     : String,
		required :true

	},
    password: {
        type: String,
       required : true
    }
});

var Staff = mongoose.model('Staff', staffSchema)
module.exports = Staff ;
