const Skill = require("../models/Skill");

exports.createSkill = async (req, res) => {
  try {
    const skills = Array.isArray(req.body) ? req.body : [req.body];
    //console.log(skills);
   
    
    for (const skill of skills){
       const { skillType, skillName } = skill;

       if (!skillType || !skillName) {
         return res.status(400).json({
           success: false,
           message: "Skill type and skill names are required",
         });
       }
      
           await Skill.findOneAndUpdate(
             { userId: req.user.id },
             {
               $push: {
                 skills: { skillType, skillName, date: Date.now() },
               },
             },
             { new: true, upsert: true }
           );
    }
    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: skills,
    });
  } catch (error) {
    console.error("Error adding skills:", error);
    res.status(500).json({ success: false, message: "Failed to add skills" });
  }
};


exports.updateSkills = async (req, res) => {
  try {
    const { skillId } = req.params; // Get skillId from URL parameter
    const { skilltype, skillname } = req.body; // Get skilltype and skillname from body

    // Validate input
    if (!skilltype || !Array.isArray(skillname) || skillname.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Skill type and skill names are required",
      });
    }

    // Find the resume and update the skillname array for the specified skillId
    const skill = await Skill.findOneAndUpdate(
      { userId: req.user.id, "skills._id": skillId }, // Match by skillId
      {
        $set: {
          "skills.$.skilltype": skilltype,
          "skills.$.skillname": skillname,
        },
      }, // Update the skill's type and name
      { new: true }
    );

    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill.skills, // Return the updated skills array
    });
  } catch (error) {
    console.error("Error updating skills:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update skills" });
  }
};



// Delete a specific skill by skillId
exports.deleteSkill = async (req, res) => {
  try {
    const { skillId } = req.params; // Get skillId from the URL parameter

    // Find the skill and remove it from the skills array
    const skill = await Skill.findOneAndUpdate(
      { userId: req.user.id }, // Match by userId to ensure the right user is updating
      { $pull: { skills: { _id: skillId } } }, // Pull the skill with the given skillId
      { new: true }
    );

    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      data: skill.skills, // Return the updated skills array
    });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({ success: false, message: "Failed to delete skill" });
  }
};


exports.getSkills = async (req, res) => {
  try {
    // Find the user's skills
    const skill = await Skill.findOne({ userId: req.user.id });

    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skills not found" });
    }

    res.status(200).json({
      success: true,
      message: "Skills retrieved successfully",
      data: skill.skills, // Return the skills array
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve skills" });
  }
};
