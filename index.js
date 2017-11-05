const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const methodOverride = require('method-override');

//setup our express app
const app = express();

//set port 
app.set('port', (process.env.PORT || 8081));

//connect to mongodb
 var mongoose = (function() {
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://iphytech:nillysmooth?@ds121495.mlab.com:21495/testapp');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
console.log("connection succeeded");
});
return db;	
})();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));

//error handling

app.use(function(err, req, res, next){
  // console.log(err);
  res.status(422).send({error: err.message});
});

//initialize routes
app.use('/api', require('./routes/api'));

//listen to a requests

app.listen(app.get('port'), function(){
console.log('now listening to a requests');
})
