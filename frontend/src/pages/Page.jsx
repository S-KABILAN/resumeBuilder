import { useState } from "react";
import Sidebar from "../components/ui/sidebar";
import TopNav from "../components/ui/topnav";
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

const Page = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [activeSection, setActiveSection] = useState("PersonalInfo");
  const [selectedLayout, setSelectedLayout] = useState("Layout2");

  // Separate states for each form section
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  });

  const [education, setEducation] = useState([
    { degree: "", institution: "", graduationYear: "" },
  ]);
  const [experience, setExperience] = useState([
    { jobtitle: "", companyname: "", yearsofexperience: 0, description: "" },
  ]);
  const [skills, setSkills] = useState([{ skill: "", skillLevel: "" }]);
  const [projects, setProjects] = useState([
    { title: "", description: "", technologies: "" },
  ]);
  const [certifications, setCertifications] = useState([
    {
      certificationName: "",
      issuingOrganization: "",
      dateObtained: "",
      certificationId: "",
    },
  ]);

  const handleMenuClick = (item) => setSelectedItem(item);
  const handleSectionChange = (section) => setActiveSection(section);

  const handlePersonalInfoChange = (field, value) =>
    setPersonalInfo({ ...personalInfo, [field]: value });

const handleEducationChange = (section, field, value, index) => {
  setEducation((prevData) =>
    prevData.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
  );
};

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setExperience(updatedExperience);
  };

  const handleSkillsChange = (index, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  const handleProjectsChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
  };

  const handleCertificationsChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    };
    setCertifications(updatedCertifications);
  };

  const addEducation = () =>
    setEducation([
      ...education,
      { degree: "", institution: "", graduationYear: "" },
    ]);
  const removeEducation = (index) =>
    setEducation(education.filter((_, i) => i !== index));
    console.log(education)

  const addExperience = () =>
    setExperience([
      ...experience,
      { jobtitle: "", companyname: "", yearsofexperience: "", description: "" },
    ]);
  const removeExperience = (index) =>
    setExperience(experience.filter((_, i) => i !== index));

  const addSkill = () => setSkills([...skills, { skill: "", skillLevel: "" }]);
  const removeSkill = (index) =>
    setSkills(skills.filter((_, i) => i !== index));

  const addProject = () =>
    setProjects([
      ...projects,
      { title: "", description: "", technologies: "" },
    ]);
  const removeProject = (index) =>
    setProjects(projects.filter((_, i) => i !== index));

  const addCertification = () =>
    setCertifications([
      ...certifications,
      {
        certificationName: "",
        issuingOrganization: "",
        dateObtained: "",
        certificationId: "",
      },
    ]);
  const removeCertification = (index) =>
    setCertifications(certifications.filter((_, i) => i !== index));

  const handleSubmitPersonalInfo = async () => {
    try {
      await PersonalInfoSubmit(personalInfo);
      console.log("Personal Info Submitted", personalInfo);
    } catch (error) {
      console.error(error.message || "Failed to submit personal info.");
    }
  };

  const handleSubmitEducation = async () => {
    try {
      await educationCreate(education);
      console.log("Education Submitted", education);
    } catch (error) {
      console.error(error.message || "Failed to submit education.");
    }
  };

  const handleSubmitExperience = async () => {
    try {
      await experienceCreate(experience);
    } catch (error) {
      console.error(error.message || "Failed to submit experience")
    }
  }

  const renderContent = () => {
    switch (selectedItem) {
      case "Home":
        return <div>Welcome to the Home Page</div>;
      case "Create Resume":
        return (
          <div>
            <TopNav
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            <div className="flex mt-4 h-[90vh]">
              <div className="w-1/2 pr-6 overflow-y-auto h-full">
                {renderResumeSectionForm(activeSection)}
              </div>
              <div className="w-1/2 pl-6 border-l border-gray-300 overflow-y-auto h-full">
                {renderResumePreview()}
              </div>
            </div>
          </div>
        );
      case "Resume Templates":
        return <ResumeTemplates onSelectTemplate={setSelectedLayout} />;
      case "My Resumes":
        return <div>View your saved resumes</div>;
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
            formData={personalInfo}
            onFormChange={handlePersonalInfoChange}
            onSubmit={handleSubmitPersonalInfo}
          />
        );
      case "Education":
        return (
          <EducationForm
            formData={education}
            onFormChange={handleEducationChange}
            addEducation={addEducation}
            removeEducation={removeEducation}
            onSubmit={handleSubmitEducation}
          />
        );
      case "Experience":
        return (
          <ExperienceForm
            formData={experience}
            onFormChange={handleExperienceChange}
            addExperience={addExperience}
            removeExperience={removeExperience}
            onSubmit={handleSubmitExperience}
          />
        );
      // Repeat similarly for Experience, Skills, Projects, and Certifications
      default:
        return null;
    }
  };

  const renderResumePreview = () => {
    return selectedLayout === "Layout2" ? (
      <ResumePreviewLayout2
        formData={{
          personalInfo,
          education,
          experience,
          skills,
          projects,
          certifications,
        }}
      />
    ) : (
      <ResumePreviewLayout1
        formData={{
          personalInfo,
          education,
          experience,
          skills,
          projects,
          certifications,
        }}
      />
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar onMenuClick={handleMenuClick} />
      <main className="flex-grow p-6">{renderContent()}</main>
    </div>
  );
};

export default Page;
