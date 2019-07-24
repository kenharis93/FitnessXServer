const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoConn');


const connectDB = async () => {
    try{
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    console.log("Mongo DB Connected Successfully")
}
catch (err){
    console.log("Unable to Connect to Mongo DB")
    process.exit();
}
}


module.exports = connectDB;