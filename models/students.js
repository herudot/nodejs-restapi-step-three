const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: false
    }
});

const Students = mongoose.model('students', StudentsSchema);
module.exports = Students;