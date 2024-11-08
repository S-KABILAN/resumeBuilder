const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  summary: { type: String },
  education: [{ institution: String, degree: String, year: String }],
  experience: [
    {
      company: String,
      position: String,
      duration: String,
      description: String,
    },
  ],
  skills: [String],
  projects: [{ name: String, description: String, link: String }],
});

module.exports = mongoose.model("Resume", resumeSchema);
