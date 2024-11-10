const Skill = require("../models/Skill");

exports.createSkill = async (req, res) => {
  try {
    const { skilltype, skillname } = req.body;

    if (!skilltype || !Array.isArray(skillname) || skillname.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Skill type and skill names are required",
      });
    }

    const skill = await Skill.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: {
          skills: { skilltype, skillname, date: Date.now() },
        },
      },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Error adding skills:", error);
    res.status(500).json({ success: false, message: "Failed to add skills" });
  }
};

