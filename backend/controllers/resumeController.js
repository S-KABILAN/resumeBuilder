// controllers/resumeController.js
const Resume = require("../models/Resume");
const Personal = require("../models/Personal")
const Education = require("../models/Education")


// Create or update resume
exports.createOrUpdateResume = async (req, res) => {
  try {
    const {
      title,
      fullName,
      email,
      phone,
      summary,
      education,
      experience,
      skills,
      projects,
    } = req.body;

    // Check if resume already exists for the user
    let resume = await Resume.findOne({ userId: req.user.id });

    if (resume) {
      // Update existing resume
      resume.title = title;
      resume.fullName = fullName;
      resume.email = email;
      resume.phone = phone;
      resume.summary = summary;
      resume.education = education;
      resume.experience = experience;
      resume.skills = skills;
      resume.projects = projects;
      await resume.save();
      res
        .status(200)
        .json({ success: true, message: "Resume updated", data: resume });
    } else {
      // Create a new resume if none exists
      resume = new Resume({
        userId: req.user.id,
        title,
        fullName,
        email,
        phone,
        summary,
        education,
        experience,
        skills,
        projects,
      });
      await resume.save();
      res
        .status(201)
        .json({ success: true, message: "Resume created", data: resume });
    }
  } catch (err) {
    console.error("Error in resume creation/updating:", err);
    res
      .status(500)
      .json({ success: false, message: "Resume operation failed" });
  }
};

// Get resume
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id }).populate(
      "user",
      "name email picture"
    );
    if (!resume) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }

    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ success: false, message: "Error fetching resume" });
  }
};


//Create personal detail
exports.createOrUpdatePersonal = async (req,res) => {
    try {
        const {name, email, phone, location, github, linkedIn} = req.body

        const createPersonal = await Personal.findOne({userId: req.user.id })

        if (createPersonal) {
          createPersonal.name = name;
          createPersonal.email = email;
          createPersonal.phone = phone;
          createPersonal.location = location;
          createPersonal.github = github;
          createPersonal.linkedIn = linkedIn;

          await createPersonal.save();
          res
            .status(200)
            .json({
              success: true,
              message: "Resume Personal details updated",
              data: createPersonal,
            });
        } else {
          const createPersonal = new Personal({
            userId: req.user.id,
            name,
            email,
            phone,
            location,
            github,
            linkedIn,
          });
          await createPersonal.save();
          res
            .status(201)
            .json({
              success: true,
              message: "Resume personal detail created",
              data: createPersonal,
            });
        }
        

    } catch (err) {
        console.error("Error in resume personal creation/updating:", err);
        res
          .status(500)
          .json({ success: false, message: "Resume personal operation failed" });
    }
}


//personal detail get
exports.getPersonal = async (req,res) => {
    try {
        const personal = await Personal.findOne({userId: req.user.id})

        if(personal){
           return res.status(201).json({
             success: true,
             message: "Resume personal detail geted",
             data: personal,
           }); 
        }
        return res.status(404).json({
          success: false,
          message: "Resume personal detail Not found",
        });

    } catch (error) {
        console.error("Error fetching personal resume detail:", error);
       return res
         .status(500)
         .json({
           success: false,
           message: "Error fetching resume personal details",
         });
    }
}


//Create Education detail
exports.addOrUpdateEducation = async (req, res) => {
  try {
    const { degree, institution, graduationYear, percentage } = req.body;

    // Validate input
    if (!degree || !institution || !graduationYear || !percentage) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Find the resume by user ID and update education details
    const education = await Education.findOneAndUpdate(
      { userId: req.user.id },
      {
        $push: {
          education: { degree, institution, graduationYear, percentage },
        },
      },
      { new: true, upsert: true } // Create a new resume if none exists
    );

    res.status(200).json({
      success: true,
      message: "Education added successfully",
      data: education,
    });
  } catch (error) {
    console.error("Error adding education:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add education" });
  }
};
