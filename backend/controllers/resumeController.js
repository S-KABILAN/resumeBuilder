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
    const userId = req.query.userId;
    const resumes = await Resume.find({ userId: userId });
    res.send({ success: true, data: resumes });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
};

// Controller to update a resume
exports.updateResume = async (req, res) => {
  

      const { id } = req.params;
      const resumeData = req.body;

   try {
     const updatedResume = await Resume.findByIdAndUpdate(id, resumeData, {
       new: true,
     });
     if (!updatedResume) {
       return res.status(404).json({ message: "Resume not found" });
     }
     res.json({ message: "Resume updated successfully", data: updatedResume });
   } catch (error) {
     console.error(error);
     res
       .status(500)
       .json({ message: "Error updating resume", error: error.message });
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
