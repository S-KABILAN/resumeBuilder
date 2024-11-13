const Experience = require("../models/Experience");

exports.createExperience = async (req, res) => {
  try {
    const { jobtitle, companyname, yearsofexperience, description } = req.body;

    // Log the values for debugging
    console.log("Request body:", req.body);

    // Ensure all fields are provided and valid
    

    // Parse yearsofexperience to ensure it's a valid number
    

    // Check if userId is available
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    console.log("Authenticated user ID:", req.user.id); // Log user ID for debugging

    // Add experience to the user's experience array
    const experience = await Experience.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: {
          experience: {
            jobtitle,
            companyname,
            //yearsofexperience: yearsofexperienceParsed, // Use parsed value
            description,
          },
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Experience added successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Error adding experience:", error); // Log full error
    res.status(500).json({
      success: false,
      message: "Failed to add experience",
      error: error.message, // Include error message for debugging
      errorDetails: error, // Include full error object for better insight
    });
  }
};

//get all experience
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.findOne({ userId: req.user.id });

    if (!experiences) {
      return res.status(404).json({
        success: false,
        message: "No experiences found",
      });
    }

    res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    console.error("Error retrieving experiences:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve experiences",
    });
  }
};


//update experience
exports.updateExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;
    const { jobtitle, companyname, yearsofexperience, description } = req.body;

    // Log userId and experienceId for debugging
    console.log("User ID:", req.user.id);
    console.log("Experience ID:", experienceId);

    // Check if experience exists
    const experienceExists = await Experience.findOne({
      userId: req.user.id,
      "experience._id": experienceId,
    });

    if (!experienceExists) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    const updatedExperience = await Experience.findOneAndUpdate(
      { userId: req.user.id, "experience._id": experienceId },
      {
        $set: {
          "experience.$.jobtitle": jobtitle,
          "experience.$.companyname": companyname,
          "experience.$.yearsofexperience": yearsofexperience,
          "experience.$.description": description,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: updatedExperience,
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update experience",
    });
  }
};


exports.deleteExperience = async (req, res) => {
  try {
    const { experienceId } = req.params;

    const updatedExperience = await Experience.findOneAndUpdate(
      { userId: req.user.id },
      {
        $pull: { experience: { _id: experienceId } },
      },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      data: updatedExperience,
    });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};
