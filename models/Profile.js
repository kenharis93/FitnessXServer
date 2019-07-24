const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Age: {
        type: String,
        required: true,
        unique: true
    },
    Weight: {
        type: String,
        required: true
    }
});

const Profile = mongoose.model('profile', UserSchema);

module.exports = Profile;