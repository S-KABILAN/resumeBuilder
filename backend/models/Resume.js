const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      website: String,
    },
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        location: String,
        startDate: String,
        endDate: String,
        graduationYear: String,
        gpa: String,
        description: String,
        isVisible: { type: Boolean, default: true },
        useYearOnly: { type: Boolean, default: false },
        isCurrentlyStudying: { type: Boolean, default: false },
      },
    ],
    experience: [
      {
        jobTitle: String,
        companyName: String,
        location: String,
        startDate: String,
        endDate: String,
        yearsOfExperience: String,
        description: String,
        isVisible: { type: Boolean, default: true },
        isCurrentJob: { type: Boolean, default: false },
        useYearOnly: { type: Boolean, default: false },
      },
    ],
    skills: [
      {
        skillType: String,
        skillName: String,
        level: String,
        isVisible: { type: Boolean, default: true },
      },
    ],
    languages: [
      {
        language: String,
        proficiency: String,
        isVisible: { type: Boolean, default: true },
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        technologiesUsed: String,
        url: String,
        startDate: String,
        endDate: String,
        isVisible: { type: Boolean, default: true },
      },
    ],
    certifications: [
      {
        certificationName: String,
        issuingOrganization: String,
        dateObtained: String,
        certificationId: String,
        url: String,
        isVisible: { type: Boolean, default: true },
      },
    ],
    achievements: [
      {
        title: String,
        date: String,
        description: String,
        isVisible: { type: Boolean, default: true },
      },
    ],
    // Custom sections added by user
    customSections: [
      {
        id: String,
        title: String,
        content: String,
        isVisible: { type: Boolean, default: true },
      },
    ],
    // Section visibility and order configuration
    sectionConfig: [
      {
        id: String,
        type: { type: String }, // standard or custom
        label: String,
        enabled: { type: Boolean, default: true },
        active: { type: Boolean, default: true },
      },
    ],
    layout: { type: String, required: true },
    // Template customization fields
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
      fontSize: {
        type: String,
        default: "medium",
      },
      spacing: {
        type: String,
        enum: ["tight", "normal", "relaxed"],
        default: "normal",
      },
      contentSpacing: {
        type: String,
        default: "standard",
      },
      sectionOrder: {
        type: [String],
        default: [
          "education",
          "experience",
          "skills",
          "languages",
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
