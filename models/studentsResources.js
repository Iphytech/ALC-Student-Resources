const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const Schema = mongoose.Schema;

//create students resources models and schema

const studentsResources = new Schema({
  name: {
    type: String,
    required: [true, 'You must provide your name please']
  },
  regNo: {
    type: String,
    required: [true, 'Your reg No is your identity, please provide it']
  },
  dept: {
    type: String,
    required: [true, 'please provide it']
  },
  level: {
    type: String,
    required: [true, 'its necessary please']
  },
  age: {
    type: String,
    required: [true, 'its private ']
  },
  state: {
    type: String,
    required: [true, 'you might be my sister/brother, who knows?']
  },
  faculty: {
    type: String,
    required: [true, 'from which faculty please']
  },
  phoneNumber: {
    type: String,
    required: [true, 'please provide it']
  }
});

const Student = mongoose.model('student', studentsResources);
module.exports = Student;
