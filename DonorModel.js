const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
   //user_id goes to users as donar_id
    donor_id: String,
    donor_name: String,
    user_id: { type: ObjectId, ref: "User", unique: true },
    age: String,
    name: { type: String, required: true },
    phone: { type: String, required: true }, //TODO unique: true
    email: { type: String },
    address: { type: String },
    gender: String,
    email: String,   
    phone: {type: String, required},  
    blood_info: {
        group: { type: String, enum: ["A", "B", "O", "AB", ""] },
        rh_factor: { type: String, enum: ["+", "-"] },
        is_verified: [Boolean],
        verified_by: [{ type: ObjectId, ref: "Organization" }]
      },
    donated_date: [Date],
    donation_num: Number,
    availability: String,
    status: String,
    source: String,

});