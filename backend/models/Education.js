const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  education: [
    {
      degree: {
        type: String,
        required: true,
      },
      institution: {
        type: String,
        required: true,
      },
      graduationYear: {
        type: Number,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Education", EducationSchema);
