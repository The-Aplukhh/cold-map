var express = require('express');
var mongoose = require('mongoose');
var app = express();
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

//=============================================================================
/*									Database								 */
//=============================================================================

var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/RbkDB';
var db = mongoose.connect(mongoUri,{ useMongoClient: true });
db = mongoose.connection;

//=============================================================================
/*									Server   								 */
//=============================================================================

var port = process.env.PORT || 8000
app.listen(port ,function () {
	console.log('listening on port' + port);
})

module.exports = app
