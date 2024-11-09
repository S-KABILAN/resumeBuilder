const mongoose = require('mongoose')

const PersonalSchema = new mongoose.Schema({
    userId: 
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("Personal",PersonalSchema)