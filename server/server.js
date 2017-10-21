var express = require('express');
var graphqlHTTP=require("express-graphql");
var mongoose = require('mongoose');
var app = express();
var schema=require("./graphql");
app.use('/graphql', graphqlHTTP(req => ({
  schema,
  pretty: true
})));
app.get('/', (req, res) => {
  res.send('Hello World..');
});

//=============================================================================
/*									Database								 */
//=============================================================================

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/RbkDB'
var db = mongoose.connect(mongoUri,{ useMongoClient: true });
db = mongoose.connection

db.once('open',function () {
	console.log('mongoDB is open'); 
})

//=============================================================================
/*									Server   								 */
//=============================================================================
var port = process.env.PORT || 8000
app.listen(port ,function () {
	console.log('listening at ' + port);
})


module.exports = app
