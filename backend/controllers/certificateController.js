const Certification = require("../models/Certificate");

exports.createCertification = async (req, res) => {


  try {

    const certificates = Array.isArray(req.body) ? req.body : [req.body];

    for(const certificate of certificates){
      const {
        certificationName,
        issuingOrganization,
        dateObtained,
        certificationId,
      } = certificate;

      // Validate input
      if (
        !certificationName ||
        !issuingOrganization ||
        !dateObtained ||
        !certificationId
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      await Certification.findOneAndUpdate(
        { userId: req.user.id }, // Find the user by ID
        {
          $push: {
            certifications: {
              certificationName,
              issuingOrganization,
              dateObtained,
              certificationId,
            },
          },
        },
        { new: true, upsert: true } // Create a new entry if it doesn't exist
      );

    }
    // Add the certification to the user's certifications array
    
    res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certificates,
    });
  } catch (error) {
    console.error("Error creating certification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create certification",
    });
  }
};

exports.getAllCertifications = async (req, res) => {
  try {
    // Find all certifications of the user
    const userCertifications = await Certification.find({
      userId: req.user.id,
    });

    if (!userCertifications || userCertifications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No certifications found",
      });
    }

    res.status(200).json({
      success: true,
      data: userCertifications,
    });
  } catch (error) {
    console.error("Error fetching certifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch certifications",
    });
  }
};

exports.updateCertification = async (req, res) => {
  try {
    const { certificationId } = req.params; // Certification ID to be updated
    const {
      certificationName,
      issuingOrganization,
      dateObtained,
      certificationId: certId,
    } = req.body;

    if (
      !certificationName ||
      !issuingOrganization ||
      !dateObtained ||
      !certId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find and update the specific certification
    const updatedCertification = await Certification.findOneAndUpdate(
      {
        userId: req.user.id, // Ensure the certification belongs to the authenticated user
        "certifications._id": certificationId, // Match the certification by its ID
      },
      {
        $set: {
          "certifications.$.certificationName": certificationName,
          "certifications.$.issuingOrganization": issuingOrganization,
          "certifications.$.dateObtained": dateObtained,
          "certifications.$.certificationId": certId,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedCertification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: updatedCertification,
    });
  } catch (error) {
    console.error("Error updating certification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update certification",
    });
  }
};


exports.deleteCertification = async (req, res) => {
  try {
    const { certificationId } = req.params; // Get the certification ID from the URL parameter

    // Remove the certification from the array
    const deletedCertification = await Certification.findOneAndUpdate(
      { userId: req.user.id, "certifications._id": certificationId }, // Ensure it belongs to the authenticated user
      { $pull: { certifications: { _id: certificationId } } }, // Pull the certification with matching ID
      { new: true }
    );

    if (!deletedCertification) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
      data: deletedCertification,
    });
  } catch (error) {
    console.error("Error deleting certification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete certification",
    });
  }
};
