const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    skills: [
        {
            skilltype: {
                type: String,
                required: true,
            },
            skillname: [{
                type: String,
                required: true
            }]
        }
    ]
})

module.exports = mongoose.model("Skill",skillSchema)