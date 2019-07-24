const express = require('express');
const config = require('config');
const user = require('../../models/User');
const auth = require('../../middleware/auth');
const excercise = require('../../models/Excercise');

const router = express.Router();

const CompletedExcercise = require('../../models/CompletedExcercise');

router.post('/', auth, async (req, res) => {
    try{
        const latestComplete = new CompletedExcercise({
            user: req.user.id,
            excercise: req.body.excercise,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight
        });

        const complete = await latestComplete.save();
        res.send(complete);
        console.log("Added to DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Get GoalExcercise List
router.get('/', auth, async (req, res) => {
    try{

        const complete = await CompletedExcercise.find({user: req.user.id});
        res.send(complete);
        console.log("Found in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Get Task by id
router.get('/:id', auth, async (req, res) => {
    try{
        const complete = await CompletedExcercise.findOne({
            user: req.user.id,
            excercise: req.excercise.id,
            _id: req.params.id
        });
        if(!complete) {
            return res.status(404).send('No task found');
        }
        res.send(complete);
        console.log("Found in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Delete Task from DB
router.delete('/delete/', auth, async (req, res) => {
    try{
        await CompletedExcercise.findOneAndRemove({ 
            user: req.body.id, 
            excercise: req.excercise.id, 
            _id:req.body.id });
        res.send("The Task has been removed from the DB");
        console.log("Found and Deleted in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.put('/update/', auth, async (req, res) => {
    try{
        //Find the task
        let complete = await CompletedExcercise.findOne({ user: req.user.id, 
            excercise: req.excercise.id, 
            _id:req.body.id});
        if (!complete){
            return res.status(404).send('Task not found');
        }
        //Update found task
        const { id, sets, reps, weight } = req.body;
        complete = await CompletedExcercise.findOneAndUpdate(
        { _id: id },
        { sets: sets, 
            reps: reps, 
            weight: weight }
        );
        res.send(complete);
        console.log("Found and Updated in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
