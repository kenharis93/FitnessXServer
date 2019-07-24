const mongoose = require('mongoose');

const GoalExcerciseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    excercise :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'excercise'
    },
    sets :{
        type: String
    },
    reps :{
        type: String
    },
    weight :{
        type: String
    }
});

module.exports = GoalExcercise = mongoose.model('goalExcercise', GoalExcerciseSchema);

