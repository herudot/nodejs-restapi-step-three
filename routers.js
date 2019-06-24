const express = require('express');
const router = express.Router();
const Students = require('./models/students');
const User = require('./models/User');

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

// DELETE method request
router.delete('/student/:id', function(req, res, next){
    Students.findByIdAndDelete({_id: req.params.id}).then(function(result){
        res.send(result);
    });
});

// Create Endpoint of authentication "register/signup, login, logout"______________________________
// Register / Signup
router.post('/signup', async function(req, res){
    const {name, email, password, date, body} = req.body;
    const user = new User({
        name: name,
        email: email,
        password: password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.post('/login/:username/:password', function(req, res, next){
    res.send('Login request');
});

router.post('/logout', function(req, res, next){
    res.send('Logout request');
});


module.exports = router;
