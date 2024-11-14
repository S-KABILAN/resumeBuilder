const Experience = require("../models/Experience");

exports.createExperience = async (req, res) => {
  try {
    const experiences = Array.isArray(req.body) ? req.body : [req.body]; // Handle if it's an array

    for (const experience of experiences) {
      const { jobTitle, companyName, yearsOfExperience, description } =
        experience;

      if (!jobTitle || !companyName || !yearsOfExperience || !description) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      await Experience.findOneAndUpdate(
        { userId: req.user.id },
        {
          $push: {
            experience: {
              jobTitle,
              companyName,
              yearsOfExperience,
              description,
              userId: req.user.id,
            },
          },
        },
        { new: true, upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Experience added successfully",
      experiences
    });
  } catch (error) {
    console.error("Error adding experience:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add experience",
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
