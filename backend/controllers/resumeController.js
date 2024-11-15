const Resume = require("../models/Resume");

// Controller to create a new resume
// Assuming you have already imported the Resume model at the top of your file

exports.createResume = async (req, res) => {
  try {
    // Create a new resume instance with the request body
    const resume = new Resume({
      ...req.body, // Spread the body to include all fields
      userId: req.user.id // Associate the resume with the authenticated user
    });

    // Save the resume to the database
    await resume.save();

    // Send a successful response
    res.status(201).send({ success: true, data: resume });
  } catch (err) {
    // Handle errors and send a response
    res.status(400).send({ success: false, error: err.message });
  }
};


// Controller to fetch all resumes
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.send({ success: true, data: resumes });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
};

// Controller to update a resume
exports.updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id }, // Using `_id` instead of `id`
      req.body,
      { new: true }
    );
    res.send({ success: true, data: resume });
  } catch (err) {
    res.status(400).send({ success: false, error: err.message });
  }
};

// Controller to delete a resume
exports.deleteResume = async (req, res) => {
  try {
    await Resume.deleteOne({ _id: req.params.id }); // Using `_id` instead of `id`
    res.send({ success: true, message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
};
