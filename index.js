const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

//setup our express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/studentsInfo');
mongoose.Promise = global.Promise;

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

// app.get('/', function(req, res){
// console.log('get request is working');
// res.send({ name:'ifunaya'});
// })

//listen to a requests

app.listen(process.env.port || 7000, function(){
console.log('now listening to a requests');
})