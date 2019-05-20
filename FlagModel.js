const mongoose = require('mongoose');

const flagSchema = mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    donar_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Donar'},
    flaged_date: {type: Date}
});