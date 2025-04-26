const Resume = require("../models/Resume");

// Controller to create a new resume
exports.createResume = async (req, res) => {
  try {
    // Create a new resume instance with the request body
    const resume = new Resume({
      ...req.body, // Spread the body to include all fields
      userId: req.user.id, // Associate the resume with the authenticated user
    });

    // Save the resume to the database
    await resume.save();

    // Send a successful response
    res.status(201).send({ success: true, data: resume });
  } catch (err) {
    console.error("Error creating resume:", err);
    // Handle errors and send a response
    res.status(400).send({ success: false, error: err.message });
  }
};

// Controller to fetch all resumes for a user
exports.getAllResumes = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all resumes associated with the authenticated user
    const resumes = await Resume.find({ userId });

    // Send a successful response with the data
    res.status(200).send({ success: true, data: resumes });
  } catch (err) {
    console.error("Error fetching resumes:", err);
    res.status(500).send({ success: false, error: err.message });
  }
};

// Controller to update a resume
exports.updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const resumeData = req.body;
    const userId = req.user.id;

    // Find the resume and verify it belongs to the authenticated user
    const resume = await Resume.findById(id);

    if (!resume) {
      return res
        .status(404)
        .send({ success: false, error: "Resume not found" });
    }

    // Verify ownership
    if (resume.userId.toString() !== userId) {
      return res
        .status(403)
        .send({
          success: false,
          error: "Not authorized to update this resume",
        });
    }

    // Update the resume
    const updatedResume = await Resume.findByIdAndUpdate(id, resumeData, {
      new: true, // Return the updated document
      runValidators: true, // Run mongoose validators
    });

    // Send a successful response
    res.status(200).send({ success: true, data: updatedResume });
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).send({ success: false, error: error.message });
  }
};

// Controller to delete a resume
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the resume and verify it belongs to the authenticated user
    const resume = await Resume.findById(id);

    if (!resume) {
      return res
        .status(404)
        .send({ success: false, error: "Resume not found" });
    }

    // Verify ownership
    if (resume.userId.toString() !== userId) {
      return res
        .status(403)
        .send({
          success: false,
          error: "Not authorized to delete this resume",
        });
    }

    // Delete the resume
    await Resume.findByIdAndDelete(id);

    // Send a successful response
    res
      .status(200)
      .send({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).send({ success: false, error: error.message });
  }
};

// Controller to get a single resume by ID
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the resume
    const resume = await Resume.findById(id);

    if (!resume) {
      return res
        .status(404)
        .send({ success: false, error: "Resume not found" });
    }

    // Verify ownership
    if (resume.userId.toString() !== userId) {
      return res
        .status(403)
        .send({
          success: false,
          error: "Not authorized to access this resume",
        });
    }

    // Send a successful response
    res.status(200).send({ success: true, data: resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).send({ success: false, error: error.message });
  }
};
