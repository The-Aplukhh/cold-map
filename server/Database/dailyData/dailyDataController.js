var Data = require ('./dailyDataModel');

module.exports = {

	insert : function (req, res) {
		
		console.log(req.body, 'we are here to see what inside the body ')
				var newData = new Data ({
					pairData: req.body.pairData,
					emotionalHealth:req.body.emotionalHealth,
					attendance:req.body.attendance
		        
				});
			newData.save(function(err, newData){
				console.log(newData, ' newData')
	    		if(err){
	       		 	res.status(500).send(err);
	    		}else{
	    			res.json(newData)
	    		};
			});
		// })
	},

	getAllDataByStudentId : function (req, res) {
		console.log(req.params.id);
		Data.find({studentId:req.params.id}).exec(function (err, alldata) {
			if(err){
				res.status(500).send('err');
			}else{
				console.log(alldata);
				res.status(200).send(alldata);
			}
		});
	}
}
