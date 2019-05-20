const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const userSchema = mongoose.Schema({
    twitterId:{type: String},
    username:{type: String},
    displayName:{type: String}
});

module.exports = mongoose.model('users', userSchema);