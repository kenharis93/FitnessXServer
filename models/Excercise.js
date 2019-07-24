const mongoose = require('mongoose');

const ExcerciseSchema = new mongoose.Schema({
    name :{
        type: String
    },
    type :{
        type: String
    },
    image :{
        type: String
    },
    video :{
        type: String
    }
});

module.exports = Excercise = mongoose.model('Excercise', ExcerciseSchema);

