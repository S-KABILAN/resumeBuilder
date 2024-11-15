import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // to generate unique IDs
import Sidebar from "../components/ui/sidebar";
import TopNav from "../components/ui/topnav";
import { useEffect } from "react";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import CertificationsForm from "../components/forms/CertificationsForm";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";

import ResumePreviewLayout1 from "../components/ResumePreviewLayout1";
import ResumePreviewLayout2 from "../components/ResumePreviewLayout2";
import ResumeTemplates from "../components/ResumeTemplates";

import { PersonalInfoSubmit } from "../services/routes/personal";
import { educationCreate } from "../services/routes/education";
import { experienceCreate } from "../services/routes/experience";
import { skillCreate } from "../services/routes/skill";
import { projectCreate } from "../services/routes/project";
import { certificateCreate } from "../services/routes/certificate";
import { getAllResumes, resumeCreate, updateResume } from "../services/routes/resume";

const Page = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [activeSection, setActiveSection] = useState("PersonalInfo");
  const [selectedLayout, setSelectedLayout] = useState("Layout2");

  const [formData, setFormData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    },
    education: [{ degree: "", institution: "", graduationYear: "" }],
    experience: [
      {
        jobTitle: "",
        companyName: "",
        yearsOfExperience: "",
        description: "",
      },
    ],
    skills: [{ skillType: "", skillName: "" }],
    projects: [{ title: "", description: "", technologiesUsed: "" }],
    certifications: [
      {
        certificationName: "",
        issuingOrganization: "",
        dateObtained: "",
        certificationId: "",
      },
    ],
  });

  const [savedResumes, setSavedResumes] = useState([]);
  const [editingResumeId, setEditingResumeId] = useState(null);
  const [loadingResumes, setLoadingResumes] = useState(true); // New state for loading resumes
  const [errorLoadingResumes, setErrorLoadingResumes] = useState(null); // State for error handling

  const resetFormData = () => {
    setFormData({
      personal: {
        name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
      },
      education: [{ degree: "", institution: "", graduationYear: "" }],
      experience: [
        {
          jobTitle: "",
          companyName: "",
          yearsOfExperience: "",
          description: "",
        },
      ],
      skills: [{ skillType: "", skillName: "" }],
      projects: [{ title: "", description: "", technologiesUsed: "" }],
      certifications: [
        {
          certificationName: "",
          issuingOrganization: "",
          dateObtained: "",
          certificationId: "",
        },
      ],
    });
    setEditingResumeId(null); // Clear editing state
    setSelectedItem("Create Resume"); // Redirect to "Create Resume" page
  };

  // Function to fetch all resumes
  const fetchAllResumes = async () => {
    setLoadingResumes(true); // Set loading state to true
    setErrorLoadingResumes(null); // Reset error state
    try {
      const resumes = await getAllResumes(); // Fetch resumes
      setSavedResumes(resumes.data); // Assuming resumes are in `data`
    } catch (error) {
      setErrorLoadingResumes(error.message || "Failed to fetch resumes");
    } finally {
      setLoadingResumes(false); // Set loading state to false
    }
  };

  // useEffect to fetch resumes when "My Resumes" is selected
  useEffect(() => {
    if (selectedItem === "My Resumes") {
      fetchAllResumes();
    }
  }, [selectedItem]);

  // Save a new resume or update an existing one
  const saveResume = async () => {
    const defaultName =
      formData.personal.name ||
      `Resume - ${new Date().toLocaleDateString()} - ${uuidv4().slice(0, 4)}`;

    const resumeData = {
      name: defaultName,
      personal: formData.personal,
      education: formData.education,
      experience: formData.experience,
      skills: formData.skills,
      projects: formData.projects,
      certifications: formData.certifications,
      layout: selectedLayout,
    };

    try {
      let response;
      if (editingResumeId) {
        response = await updateResume(editingResumeId, resumeData);
        // Update the existing resume in the savedResumes state
        setSavedResumes((prevResumes) =>
          prevResumes.map((resume) =>
            resume.id === editingResumeId
              ? { ...resume, ...resumeData }
              : resume
          )
        );
      } else {
        response = await resumeCreate(resumeData);
        // Add the new resume to the savedResumes state
        setSavedResumes((prevResumes) => [
          ...prevResumes,
          { id: response.data.id, ...resumeData }, // Assuming the response contains an id for the new resume
        ]);
      }
      setSelectedItem("My Resumes");
    } catch (error) {
      console.error("Error saving resume:", error.message || error);
    }
  };

  const handleResumeCreate = async () => {
    try {
      const response = await resumeCreate(formData);
      console.log("Resume created successfully:", response.data);
      // You can update state or UI here after success
    } catch (error) {
      console.error("Error creating resume:", error.message || error);
      // Show error message to the user
    }
  };
  // Load a resume into the form for editing
  const loadResumeForEditing = (resumeId) => {
    const resume = savedResumes.find((resume) => resume.id === resumeId);
    if (resume) {
      setFormData(resume.formData);
      setSelectedLayout(resume.layout);
      setEditingResumeId(resumeId);
      setSelectedItem("Create Resume");
    }
  };

  const handleMenuClick = (item) => {
    setSelectedItem(item);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleFormChange = (section, field, value, index = null) => {
    if (section === "personal") {
      setFormData({
        ...formData,
        personal: { ...formData.personal, [field]: value },
      });
    } else if (section === "education" && index !== null) {
      const updatedEducation = [...formData.education];
      updatedEducation[index] = { ...updatedEducation[index], [field]: value };
      setFormData({ ...formData, education: updatedEducation });
    } else if (section === "experience" && index !== null) {
      const updatedExperience = [...formData.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };
      setFormData({ ...formData, experience: updatedExperience });
    } else if (section === "skills" && index !== null) {
      const updatedSkills = [...formData.skills];
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };
      setFormData({ ...formData, skills: updatedSkills });
    } else if (section === "projects" && index !== null) {
      const updatedProjects = [...formData.projects];
      updatedProjects[index] = { ...updatedProjects[index], [field]: value };
      setFormData({ ...formData, projects: updatedProjects });
    } else if (section === "certifications" && index !== null) {
      const updatedCertifications = [...formData.certifications];
      updatedCertifications[index] = {
        ...updatedCertifications[index],
        [field]: value,
      };
      setFormData({ ...formData, certifications: updatedCertifications });
    } else {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    }
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", institution: "", graduationYear: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          jobTitle: "",
          companyName: "",
          yearsOfExperience: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { skill: "", skillLevel: "" }],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", technologies: "" },
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        {
          certificationName: "",
          issuingOrganization: "",
          dateObtained: "",
          certificationId: "",
        },
      ],
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = formData.certifications.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const handleSubmitPersonalInfo = async () => {
    try {
      const response = await PersonalInfoSubmit(formData.personal); // Ensure `formData.personal` has the correct fields

      if (response.success) {
        // Check for a success response if `PersonalInfoSubmit` returns it
        console.log("Personal Info Submitted", formData.personal);
      } else {
        console.error(response.message || "Submission did not succeed.");
      }
    } catch (error) {
      console.error(error.message || "Failed to submit personal information.");
    }
  };

  const handleSubmitEducation = async () => {
    try {
      const response = await educationCreate(formData.education);
      if (response.success) {
        console.log("Education Info Submitted", formData.education);
      }
    } catch (error) {
      console.error(error.message || "Failed to submit education information.");
    }

    // Add logic to handle education submission
  };

  const handleSubmitExperience = async () => {
    try {
      const response = await experienceCreate(formData.experience);
      if (response.success) {
        console.log("Experience info submitted", formData.experience);
      }
    } catch (error) {
      console.log(error.message || "Failed to submit experience information");
    }
    console.log("Experience Submitted", formData.experience);
    // Add logic to handle experience submission
  };

  const handleSubmitSkills = async () => {
    try {
      const response = await skillCreate(formData.skills);
      if (response.success) {
        console.log("Skills info submitted", formData.skills);
      }
    } catch (error) {
      console.log(error.message || "Failed to submit skills information");
    }
    // Add logic to handle skills submission
  };

  const handleSubmitProjects = async () => {
    try {
      const response = await projectCreate(formData.projects);
      if (response.success) {
        console.log("Project info submitted", formData.projects);
      }
    } catch (error) {
      console.log(error.message || "Failed to sumbit project information");
    }
    // Add logic to handle projects submission
  };

  const handleSubmitCertifications = async () => {
    try {
      const response = await certificateCreate(formData.certifications);
      if (response.success) {
        console.log("Certificate info submitted", formData.certifications);
      }
    } catch (error) {
      console.log(
        error.message || "Failed to submit certification information"
      );
    }

    console.log("Certifications Submitted", formData.certifications);
    // Add logic to handle certifications submission
  };

  const handleLayoutSelect = (layout) => {
    setSelectedLayout(layout);
    setSelectedItem("Create Resume"); // Redirect to "Create Resume" page
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "Home":
        return <div>Welcome to the Home Page</div>;
      case "Create Resume":
        return (
          <div className="h-full">
            <TopNav
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            <div className="flex mt-4 h-[85vh]">
              {/* Form Section */}
              <div className="w-1/2 pr-4 overflow-y-auto h-full">
                {renderResumeSectionForm(activeSection)}
                <button
                  onClick={saveResume}
                  className="mt-4 bg-blue-500 text-white p-2 rounded"
                >
                  {editingResumeId ? "Update Resume" : "Save Resume"}
                </button>
              </div>

              {/* Preview Section */}
              <div className="w-1/2 pl-4 border-l border-gray-300 h-full overflow-y-auto">
                {renderResumePreview()}
              </div>
            </div>
          </div>
        );
      case "Resume Templates":
        return (
          <ResumeTemplates
            onSelectTemplate={handleLayoutSelect}
            formData={formData}
          />
        );

      case "My Resumes":
        return (
          <div>
            <h2>Your Saved Resumes</h2>
            <button
              onClick={resetFormData}
              className="mt-4 px-4 py-2 bg-green-600 text-white"
            >
              New Resume
            </button>
            {loadingResumes ? ( // Show loading state
              <p>Loading resumes...</p>
            ) : errorLoadingResumes ? ( // Show error message if any
              <p>Error: {errorLoadingResumes}</p>
            ) : (
              <ul>
                {savedResumes.map((resume) => (
                  <li
                    key={resume._id} // Use _id for the key
                    className="flex justify-between items-center"
                  >
                    <span>{resume.name}</span>
                    <button
                      onClick={() => loadResumeForEditing(resume._id)} // Use _id for editing
                      className="px-2 py-1 bg-gray-300"
                    >
                      Edit
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "Settings":
        return <div>Adjust your settings</div>;
      default:
        return <div>Home Page</div>;
    }
  };

  const renderResumeSectionForm = (section) => {
    switch (section) {
      case "PersonalInfo":
        return (
          <PersonalInfoForm
            formData={formData.personal}
            onFormChange={(field, value) =>
              handleFormChange("personal", field, value)
            }
            onSubmit={handleSubmitPersonalInfo}
          />
        );
      case "Education":
        return (
          <EducationForm
            formData={formData.education}
            onFormChange={handleFormChange}
            addEducation={addEducation}
            removeEducation={removeEducation}
            onSubmit={handleSubmitEducation}
          />
        );
      case "Experience":
        return (
          <ExperienceForm
            formData={formData.experience}
            onFormChange={handleFormChange}
            addExperience={addExperience}
            removeExperience={removeExperience}
            onSubmit={handleSubmitExperience}
          />
        );
      case "Skills":
        return (
          <SkillsForm
            formData={formData.skills}
            onFormChange={handleFormChange}
            addSkill={addSkill}
            removeSkill={removeSkill}
            onSubmit={handleSubmitSkills}
          />
        );
      case "Projects":
        return (
          <ProjectsForm
            formData={formData.projects}
            onFormChange={handleFormChange}
            addProject={addProject}
            removeProject={removeProject}
            onSubmit={handleSubmitProjects}
          />
        );
      case "Certifications":
        return (
          <CertificationsForm
            formData={formData.certifications}
            onFormChange={handleFormChange}
            addCertification={addCertification}
            removeCertification={removeCertification}
            onSubmit={handleSubmitCertifications}
          />
        );
      default:
        return null;
    }
  };

  const renderResumePreview = () => {
    switch (selectedLayout) {
      case "Layout1":
        return <ResumePreviewLayout1 formData={formData} />;
      case "Layout2":
        return <ResumePreviewLayout2 formData={formData} />;
      default:
        return <ResumePreviewLayout1 formData={formData} />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onMenuClick={handleMenuClick} />
      <main className="flex-grow p-6">{renderContent()}</main>
    </div>
  );
};

export default Page;
