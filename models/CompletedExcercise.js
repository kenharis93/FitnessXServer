const mongoose = require('mongoose');

const CompletedExcerciseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    excercise :{
        type: String
    },
    sets :{
        type: String
    },
    reps :{
        type: String
    },
    weight :{
        type: String
    },
    date :{
        type: Date,
        default: Date.now
    }
});

module.exports = CompletedExcercise = mongoose.model('completedExcercise', CompletedExcerciseSchema);

