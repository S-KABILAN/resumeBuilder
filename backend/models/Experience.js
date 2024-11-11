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
      jobtitle: {
        type: String,
        required: true,
      },
      companyname: {
        type: String,
        required: true,
      },
      yearsofexperience: {
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
