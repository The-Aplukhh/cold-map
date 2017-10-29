import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import schema from './graphql';

var app = express();

// GraphqQL server route

app.use('/graphql', graphqlHTTP(req => ({
	schema,
	pretty: true,
	graphiql: true
})));


//=============================================================================
/*									Database								 */
//=============================================================================

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/RbkDB'
var db = mongoose.connect(mongoURI,{ useMongoClient: true });
db = mongoose.connection

db.once('open',function () {
	console.log('mongoDB is open'); 
})

//=============================================================================
/*									Server   								 */
//=============================================================================
var port = process.env.PORT || 3000
app.listen(port ,function () {
	console.log('listening at ' + port);
})


module.exports = app;
