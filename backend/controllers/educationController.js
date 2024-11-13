const Education = require("../models/Education");

// Create a new Education entry
const createEducation = async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch a specific Education entry by ID
const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id).populate(
      "userId"
    );
    if (!education) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all Education entries
const getAllEducation = async (req, res) => {
  try {
    const educations = await Education.find().populate("userId");
    res.json(educations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific Education entry by ID
const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!education) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    res.json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific Education entry by ID
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ message: "Education entry not found" });
    }
    res.json({ message: "Education entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEducation,
  getEducationById,
  getAllEducation,
  updateEducation,
  deleteEducation,
};
