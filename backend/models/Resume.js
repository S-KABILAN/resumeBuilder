const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User ",
      required: true,
    }, // Reference to User
    name: { type: String, required: true },
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
    // Custom sections added by user
    customSections: [
      {
        id: String,
        title: String,
        content: String,
      },
    ],
    // Section visibility and order configuration
    sectionConfig: [
      {
        id: String,
        type: { type: String }, // standard or custom
        label: String,
        enabled: { type: Boolean, default: true },
      },
    ],
    layout: { type: String, required: true },
    // New template customization fields
    templateSettings: {
      colors: {
        primary: { type: String, default: "#2563eb" },
        secondary: { type: String, default: "#1e40af" },
        accent: { type: String, default: "#3b82f6" },
        text: { type: String, default: "#1f2937" },
        background: { type: String, default: "#ffffff" },
      },
      font: {
        type: String,
        default: "ui-sans-serif, system-ui, sans-serif",
      },
      spacing: {
        type: String,
        enum: ["tight", "normal", "relaxed"],
        default: "normal",
      },
      sectionOrder: {
        type: [String],
        default: [
          "education",
          "experience",
          "skills",
          "projects",
          "certifications",
        ],
      },
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
