import { useState } from "react";
import Sidebar from "../components/ui/sidebar";
import TopNav from "../components/ui/topnav";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import CertificationsForm from "../components/forms/CertificationsForm";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";

const Page = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [activeSection, setActiveSection] = useState("Education");

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
    skills: [{ skill: "", skillLevel: "" }],
    projects: [{ title: "", description: "", technologies: "" }],
    certifications: [
      {
        certificationName: "",
        issuingOrganization: "",
        dateObtained: "",
        certificationId: "",
      },
    ],
  });

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
    }
  else if (section === "education" && index !== null) {
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


  const renderContent = () => {
    switch (selectedItem) {
      case "Home":
        return <div>Welcome to the Home Page</div>;
      case "Create Resume":
        return (
          <div>
            <TopNav
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />
            <div className="flex mt-6">
              <div className="w-1/2 pr-6">
                {renderResumeSectionForm(activeSection)}
              </div>
              <div className="w-1/2 pl-6 border-l border-gray-300">
                {renderResumePreview()}
              </div>
            </div>
          </div>
        );
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
            formData={formData.personal}
            onFormChange={(field, value) =>
              handleFormChange("personal", field, value)
            }
          />
        );
      case "Education":
        return (
          <EducationForm
            formData={formData.education}
            onFormChange={handleFormChange}
            addEducation={addEducation}
            removeEducation={removeEducation}
          />
        );
      case "Experience":
        return (
          <ExperienceForm
            formData={formData.experience}
            onFormChange={handleFormChange}
            addExperience={addExperience}
            removeExperience={removeExperience}
          />
        );
      case "Skills":
        return (
          <SkillsForm
            formData={formData.skills}
            onFormChange={handleFormChange}
            addSkill={addSkill}
            removeSkill={removeSkill}
          />
        );
      case "Projects":
        return (
          <ProjectsForm
            formData={formData.projects}
            onFormChange={handleFormChange}
            addProject={addProject}
            removeProject={removeProject}
          />
        );
      case "Certifications":
        return (
          <CertificationsForm
            formData={formData.certifications}
            onFormChange={handleFormChange}
            addCertification={addCertification}
            removeCertification={removeCertification}
          />
        );
      default:
        return null;
    }
  };

  const renderResumePreview = () => {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {formData.personal?.name || "John Doe"}
          </h1>
          <p className="text-lg text-gray-600">
            {formData.personal.email || "johndoe@example.com"}
          </p>
          <p className="text-lg text-gray-600">
            {formData.personal?.phone || "(123) 456-7890"}
          </p>
          <p className="text-lg text-gray-600">
            {formData.personal?.location || "City, Country"}
          </p>
          <div className="flex">
            <p className="text-lg text-gray-600">
              {formData.personal?.github || "GitHub"}
            </p> 
            <p>|</p>
            <p className="text-lg text-gray-600">
              {formData.personal?.linkedin || "LinkedIn"}
            </p>
            
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mt-4">
              <p className="text-lg font-semibold">{edu.degree || "Degree"}</p>
              <p className="text-md text-gray-600">
                {edu.institution || "Institution"}
              </p>
              <p className="text-md text-gray-600">
                {edu.graduationYear || "Graduation Year"}
              </p>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mt-4">
              <p className="text-lg font-semibold">
                {exp.jobTitle || "Job Title"}
              </p>
              <p className="text-md text-gray-600">
                {exp.companyName || "Company"}
              </p>
              <p className="text-md text-gray-600">
                {exp.yearsOfExperience || "Years of Experience"}
              </p>
              <p className="text-md text-gray-600">
                {exp.description || "Job description and responsibilities."}
              </p>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
          {formData.skills.map((skill, index) => (
            <div key={index} className="mt-4">
              <p className="text-lg font-semibold">{skill.skill || "Skill"}</p>
              <p className="text-md text-gray-600">
                {skill.skillLevel || "Skill Level"}
              </p>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="mt-4">
              <p>{project.title || "Project Title"}</p>
              <p>{project.description || "Project Description"}</p>
              <p>{project.technologies || "Technologies Used"}</p>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Certifications
          </h2>
          {formData.certifications.map((certification, index) => (
            <div key={index} className="mt-4">
              <p>{certification.certificationName || "Certification Name"}</p>
              <p>{certification.certificationId || "Certification Id"}</p>
              <p>{certification.dateObtained || "Certification Date"}</p>
              <p>
                {certification.issuingOrganization ||
                  "Certification Organization"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      <Sidebar onMenuClick={handleMenuClick} />
      <main className="flex-grow p-6">{renderContent()}</main>
    </div>
  );
};

export default Page;
