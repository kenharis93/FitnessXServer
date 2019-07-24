const express = require('express');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Excercise = require('../../models/Excercise');



const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Add to DB
router.post('/', async (req, res) => {
    try{
        const newExcercise = new Excercise ({
            name: req.body.name,
            type: req.body.type,
            image: req.body.image,
            video: req.body.video
        });
        const excercise2 = await newExcercise.save();
        res.send(excercise2);
        console.log("Added to DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
//Get Excercise List
router.get('/',  async (req, res, next) => {
    try{

        const excercise2 = await Excercise.find();
        res.send(excercise2);
        console.log("Found in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Get Task by id
router.get('/:id',  async (req, res) => {
    try{

        const excercise2 = await Excercise.findOne({
            user: req.user.id,
            _id: req.params.id
        });
        if(!excercise2) {
            return res.status(404).send('No task found');
        }
        res.send(excercise2);
        console.log("Found in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//Update task from DB
router.put('/update/',  async (req, res) => {
    try{
        //Find the task
        let excercise2 = await Excercise.findOne({ name: req.body.name, _id:req.body.id });
        if (!excercise2){
            return res.status(404).send('Task not found');
        }
        //Update found task
        const { id, name, type, image, video } = req.body;
        excercise2 = await Excercise.findOneAndUpdate(
        { _id: id },
        { name: name, type: type, image: image, video: video }
        );
        res.send(excercise2);
        console.log("Found and Updated in DB");
    }
    catch (err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
//Delete Task from DB
router.delete('/delete/',  async (req, res) => {
    try{
        await Excercise.findOneAndRemove({ name: req.body.name, _id:req.body.id });
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