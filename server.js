const express = require('express');
const excercise = require('./routes/api/excercise');
const connectDB = require('./config/db');
const cors = require('cors');
//create an express app
const app = express();
connectDB();

//set the middleware to parse data
app.use(express.json({ extended: false }));

app.use(cors());

//app.use('/api/tasks', require('./routes/api/task'));
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/excercises', excercise);
app.use('/api/completedExcercise', require('./routes/api/completedExcercise'));
app.use('/api/excerciseProgram', require('./routes/api/excerciseProgram'));
app.use('/api/goalExcercise', require('./routes/api/goalExcercise'));


//which port to listen on
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { 
    console.log('server started')
});
