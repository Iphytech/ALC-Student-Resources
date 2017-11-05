const express = require('express');
const router = express.Router();
const Student = require('../models/studentsResources');

// get all the lists of students Resources to the db
router.get('/studentsResources', function(req, res, next){
  Student.find({}).then(function(studnetsInfo){
    res.send(studnetsInfo);
  });
});
//get a particular student with level and department
router.get('/studentsResources/some', function(req, res, next){
  Student.findOne({level:req.query.level, dept:req.query.dept}).then(function(studnetsInfo){
    res.send(studnetsInfo);
  });
});

// Add a new student resources to the db
router.post('/studentsResources', function(req, res, next){
  // var student = new student(req.body);
  // student.save();

  Student.create(req.body).then(function(student){
    res.send(student);
  }).catch(next);
 
});

//update a student resources in the db
router.put('/studentsResources/:id', function(req, res, next){
  Student.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(){
    Student.findOne({_id:req.params.id}).then(function(student){
      res.send(student);
    });

  });
});

//delete a student resources from the db

router.delete('/studentsResources/:id', function(req, res, next){
  Student.findByIdAndRemove({_id:req.params.id}).then(function(student){
    res.send(student);
  });
});

//make it global for use

module.exports = router;