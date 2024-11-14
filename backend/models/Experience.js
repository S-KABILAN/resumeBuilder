const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  experience: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      jobTitle: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      yearsOfExperience: {
        type: Number, // Changed to Number for efficiency
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Experience", ExperienceSchema);
