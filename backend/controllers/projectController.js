const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { title, description, technologiesUsed } = req.body;

    if (!title || !description || !technologiesUsed) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user and add the new project to the project array
    const userProjects = await Project.findOneAndUpdate(
      { userId: req.user.id }, // Ensure it belongs to the authenticated user
      {
        $push: {
          project: {
            title,
            description,
            technologiesUsed,
          },
        },
      },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: userProjects,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const userProjects = await Project.find({ userId: req.user.id });

    if (!userProjects || userProjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found",
      });
    }

    res.status(200).json({
      success: true,
      data: userProjects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params; // The project ID to be updated
    const { title, description, technologiesUsed } = req.body;

    if (!title || !description || !technologiesUsed) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const updatedProject = await Project.findOneAndUpdate(
      {
        userId: req.user.id, // Ensure the project belongs to the authenticated user
        "project._id": projectId, // Match the project by its ID
      },
      {
        $set: {
          "project.$.title": title,
          "project.$.description": description,
          "project.$.technologiesUsed": technologiesUsed,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
    });
  }
};


exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params; // Get the project ID from the URL parameter

    const deletedProject = await Project.findOneAndUpdate(
      { userId: req.user.id, "project._id": projectId }, // Ensure the project belongs to the authenticated user
      { $pull: { project: { _id: projectId } } }, // Pull the project with matching ID
      { new: true }
    );

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
    });
  }
};
