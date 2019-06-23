const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routers = require('./routers');
const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/sinau-nodejs',{useNewUrlParser : true, useFindAndModify: false});
mongoose.Promise = global.Promise;

// Implementation of body-parser
app.use(bodyParser.json());

// Implementation of routers
app.use('/api', routers);

// Implementation of Error using middleware
app.use(function(err, req, res, next){
    res.status(422).send({err: err.message});
});

app.listen( process.env.port || 5000, function(req, res){
    console.log('Express server is running well.');
});
