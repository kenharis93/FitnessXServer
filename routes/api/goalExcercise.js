const express = require('express');
const config = require('config');
const user = require('../../models/User');
const auth = require('../../middleware/auth');
const excercise = require('../../models/Excercise');

const router = express.Router();

const GoalExcercise = require('../../models/GoalExcercise');

router.post('/', auth, async (req, res) => {
    try{
        const newGoal = new GoalExcercise({
            user: req.user.id,
            excercise: req.excercise.id,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight
        });

        const goal = await newGoal.save();
        res.send(goal);
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

        const goal = await GoalExcercise.find({user: req.user.id});
        res.send(goal);
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
        const goal = await GoalExcercise.findOne({
            user: req.user.id,
            excercise: req.excercise.id,
            _id: req.params.id
        });
        if(!goal) {
            return res.status(404).send('No task found');
        }
        res.send(goal);
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
        await GoalExcercise.findOneAndRemove({ 
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
        let goal = await GoalExcercise.findOne({ user: req.user.id, 
            excercise: req.excercise.id, 
            _id:req.body.id});
        if (!goal){
            return res.status(404).send('Task not found');
        }
        //Update found task
        const { id, sets, reps, weight } = req.body;
        goal = await GoalExcercise.findOneAndUpdate(
        { _id: id },
        { sets: sets, 
            reps: reps, 
            weight: weight }
        );
        res.send(goal);
        console.log("Found and Updated in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
