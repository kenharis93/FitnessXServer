const express = require('express');
const config = require('config');
const router = express.Router();
const Excercise = require('../../models/Excercise');

const Program = require('../../models/GoalExcercise');

router.post('/', async (req, res) => {
    try{
        const newProgram = new Program({
            name: req.body.id,
            excercises: req.excercise.id,
        });

        const program = await newProgram.save();
        res.send(program);
        console.log("Added to DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Get Program List
router.get('/', async (req, res) => {
    try{

        const program = await Program.find();
        res.send(program);
        console.log("Found in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Get Program by id
router.get('/:id',  async (req, res) => {
    try{

        const program = await Program.findOne({
            name: req.body.name
        });
        if(!program) {
            return res.status(404).send('No task found');
        }
        res.send(program);
        console.log("Found in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Update Program from DB
router.put('/update/',  async (req, res) => {
    try{
        //Find the task
        let program = await Program.findOne({ name: req.body.name});
        if (!program){
            return res.status(404).send('Task not found');
        }
        //Update found task
        const { id, name, excercises} = req.body;
        program = await Program.findOneAndUpdate(
        { _id: id },
        { name: name, excercises: excercises }
        );
        res.send(program);
        console.log("Found and Updated in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Delete Program from DB
router.delete('/delete/',  async (req, res) => {
    try{
        await Program.findOneAndRemove({ name: req.body.name, _id:req.body.id });
        //const Task2 = await Task.findByIdAndRemove(req.params.id);
        res.send("The Task has been removed from the DB");
        console.log("Found and Deleted in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports = router;