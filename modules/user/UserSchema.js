const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const userSchema = mongoose.Schema({
    twitterId:{type: String},
});

module.exports = mongoose.model('users', userSchema);