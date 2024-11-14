const Resume = require("../models/Resume")

exports.createResume = async (req, res) => {
  const { formData, layout, name, userId } = req.body;
  try {
    const newResume = new Resume({ formData, layout, name, userId });
    await newResume.save();
    res.status(201).json({ success: true, resume: newResume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

