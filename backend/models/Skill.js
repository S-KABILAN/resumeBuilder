const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skills: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: mongoose.Types.ObjectId,
        }, // Unique ID for each skill
        skillType: { type: String, required: true },
        skillName: { type: [String], required: true },
        date: { type: Date, default: Date.now }, // Track date added/updated
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
