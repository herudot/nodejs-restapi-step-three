const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routers = require('./routers');
const app = express();

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser : true, useFindAndModify: false});
mongoose.Promise = global.Promise;

// Implementation of body-parser
app.use(bodyParser.json());

// Implementation of routers
app.use('/api', routers);

// Implementation of Error using middleware
app.use(function(err, req, res, next){
    res.status(422).send({err: err.message});
});

app.listen( process.env.SERVER_PORT, function(req, res){
    console.log('Express server is running well.');
});
