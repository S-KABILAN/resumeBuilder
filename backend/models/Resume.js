const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link resume to a user
  name: { type: String, required: true }, // Name or label for the resume
  formData: {
    personal: {
      name: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
    },
    education: [
      {
        degree: String,
        institution: String,
        graduationYear: String,
      },
    ],
    experience: [
      {
        jobTitle: String,
        companyName: String,
        yearsOfExperience: String,
        description: String,
      },
    ],
    skills: [
      {
        skillType: String,
        skillName: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        technologiesUsed: String,
      },
    ],
    certifications: [
      {
        certificationName: String,
        issuingOrganization: String,
        dateObtained: String,
        certificationId: String,
      },
    ],
  },
  layout: { type: String, default: "Layout1" }, // Selected layout
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resume", resumeSchema);
