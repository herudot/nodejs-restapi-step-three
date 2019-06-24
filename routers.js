const express = require('express');
const router = express.Router();
const Students = require('./models/students');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const {SignupValidation, LoginValidation} = require('./validation');

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
    // Create variable to shorting the code
    const {name, email, password, date, body} = req.body;

    // Validate the values of detail user
    const{ error } = SignupValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the user is already exist in the database
    const emailExist = await User.findOne({email: email});
    if(emailExist) return res.status(400).send('Email already Exist !');

    // Encrypt password Value into Hash format
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Insert into database
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword
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
