// server/models/Resume.js
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  objective: { type: String, required: true },
  education: [
    {
      institution: String,
      degree: String,
      startYear: Number,
      endYear: Number,
    },
  ],
  experience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      link: String,
    },
  ],
  certifications: [
    {
      title: String,
      issuer: String,
      issueDate: Date,
    },
  ],
  contactInfo: {
    phone: String,
    address: String,
    linkedIn: String,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
