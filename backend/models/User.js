const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  resumeData: {
    personalDetails: {
      fullName: String,
      email: String,
      phone: String,
    },
    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    skills: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
