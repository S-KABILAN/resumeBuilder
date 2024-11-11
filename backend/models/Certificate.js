const mongoose = require("mongoose");

const CertificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  certifications: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
      },
      certificationName: {
        type: String,
        required: true,
        trim: true,
      },
      issuingOrganization: {
        type: String,
        required: true,
        trim: true,
      },
      dateObtained: {
        type: Date,
        required: true,
      },
      certificationId: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],

});

module.exports = mongoose.model("Certification", CertificationSchema);
