const mongoose = require('mongoose');

const ExcerciseProgramSchema = new mongoose.Schema({
    name :{
        type: String
    },
    excercises : [{ 
        type: Schema.Types.ObjectId,
        ref: 'excercise'}]
    }
);

module.exports = ExcerciseProgram = mongoose.model('ExcerciseProgram', ExcerciseProgramSchema);

