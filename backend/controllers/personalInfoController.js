const Personal = require("../models/Personal");

// Create a new Personal entry
const createPersonal = async (req, res) => {
  try {
    const { name, email, phone, location, linkedin, github } = req.body;

    if (!name || !email || !phone || !linkedin || !github) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const personal = await Personal.create({
      name,
      email,
      phone,
      location,
      linkedin,
      github,
      userId: req.user?.id, // Use optional chaining to avoid errors if req.user is undefined
    });

    res.status(201).json({
      success: true,
      message: "Personal Details added successfully",
      personal,
    });
  } catch (error) {
    console.error("Error creating personal details:", error); // Log the actual error
    res.status(400).json({ message: "Failed to submit", error: error.message });
  }
};

// Fetch a specific Personal entry by ID
const getPersonalById = async (req, res) => {
  try {
    const personal = await Personal.findById(req.params.id).populate("userId");
    if (!personal) {
      return res.status(404).json({ message: "Personal entry not found" });
    }
    res.json(personal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all Personal entries
const getAllPersonal = async (req, res) => {
  try {
    const personals = await Personal.find().populate("userId");
    res.json(personals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a specific Personal entry by ID
const updatePersonal = async (req, res) => {
  try {
    const personal = await Personal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!personal) {
      return res.status(404).json({ message: "Personal entry not found" });
    }
    res.json(personal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific Personal entry by ID
const deletePersonal = async (req, res) => {
  try {
    const personal = await Personal.findByIdAndDelete(req.params.id);
    if (!personal) {
      return res.status(404).json({ message: "Personal entry not found" });
    }
    res.json({ message: "Personal entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPersonal,
  getPersonalById,
  getAllPersonal,
  updatePersonal,
  deletePersonal,
};
