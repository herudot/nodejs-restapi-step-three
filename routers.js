const express = require('express');
const router = express.Router();
const Students = require('./models/students');

// GET method request
router.get('/students', function(req, res){
    Students.find({}).then(function(result){
        res.send(result);
    });
});

// POST method request
router.post('/student', function(req, res, next){
    Students.create(req.body).then(function(result){
        res.send(result);
    }).catch(next);
});

// PUT method request
router.put('/student/:id', function(req, res, next){
    Students.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(result){
        Students.findOne({_id: req.params.id}).then(function(result){
            res.send(result);
        });
    });
});

router.delete('/student/:id', function(req, res, next){
    Students.findByIdAndDelete({_id: req.params.id}).then(function(result){
        res.send(result);
    });
});

module.exports = router;
