import PropTypes from "prop-types";

const MinimalistATSLayout = ({
  formData,
  templateSettings,
  sectionConfig = [],
}) => {
  // Destructure form data
  const {
    personal,
    education,
    experience,
    skills,
    achievements,
    projects,
    certifications,
    customSections,
  } = formData;

  // Ensure we're working with arrays for all section data and filter by visibility
  const educationData = Array.isArray(education)
    ? education.filter((item) => item.isVisible !== false)
    : [];
  const experienceData = Array.isArray(experience)
    ? experience.filter((item) => item.isVisible !== false)
    : [];
  const skillsData = Array.isArray(skills)
    ? skills.filter((item) => item.isVisible !== false)
    : [];
  const achievementsData = Array.isArray(achievements)
    ? achievements.filter((item) => item.isVisible !== false)
    : [];
  const projectsData = Array.isArray(projects)
    ? projects.filter((item) => item.isVisible !== false)
    : [];
  const certificationsData = Array.isArray(certifications)
    ? certifications.filter((item) => item.isVisible !== false)
    : [];
  const customSectionsData = Array.isArray(customSections)
    ? customSections.filter((item) => item.isVisible !== false)
    : [];

  // Find profile summary from custom sections
  const profileSummary = customSectionsData.find(
    (section) => section.id === "profile-summary"
  );

  // Destructure template settings or use defaults
  const {
    colors = {
      primary: "#000000",
      secondary: "#333333",
      background: "#ffffff",
      text: "#000000",
    },
    font = "Arial, sans-serif",
    sectionConfigFromSettings = [
      "profile-summary",
      "experience",
      "education",
      "skills",
      "projects",
      "achievements",
      "certifications",
    ],
  } = templateSettings || {};

  // Function to render personal information
  const renderPersonalInfo = () => {
    return (
      <div className="mb-3">
        <h1 className="text-2xl font-bold mb-1">
          {personal?.name || "YOUR NAME"}
        </h1>

        <div className="flex flex-wrap gap-x-3 text-sm">
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && <span>• {personal.phone}</span>}
          {personal?.location && <span>• {personal.location}</span>}
          {personal?.linkedin && <span>• {personal.linkedin}</span>}
          {personal?.github && <span>• {personal.github}</span>}
          {personal?.website && <span>• {personal.website}</span>}
        </div>
      </div>
    );
  };

  // Function to render profile summary
  const renderProfileSummary = () => {
    if (!profileSummary) return null;

    return (
      <div className="mb-3">
        <h2 className="font-bold uppercase border-b mb-1">Summary</h2>
        <div className="whitespace-pre-line text-sm">
          {profileSummary.content}
        </div>
      </div>
    );
  };

  // Function to render education section
  const renderEducation = () => {
    if (educationData.length === 0) return null;

    return (
      <div className="mb-3">
        <h2 className="font-bold uppercase border-b mb-1">Education</h2>
        {educationData.map((edu, index) => (
          <div key={index} className="mb-2 text-sm">
            <div className="flex justify-between font-bold">
              <span>
                {edu.degree || "Degree"}
                {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
              </span>
              <span>
                {edu.useYearOnly
                  ? edu.graduationYear
                  : edu.startDate && edu.endDate
                  ? `${edu.startDate} - ${edu.endDate}`
                  : edu.graduationYear || ""}
              </span>
            </div>
            <div>
              {edu.institution || "Institution"}
              {edu.location ? `, ${edu.location}` : ""}
            </div>
            {edu.gpa && <div>GPA: {edu.gpa}</div>}
            {edu.description && (
              <div className="whitespace-pre-line mt-1">{edu.description}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Function to render experience section
  const renderExperience = () => {
    if (experienceData.length === 0) return null;

    return (
      <div className="mb-3">
        <h2 className="font-bold uppercase border-b mb-1">Experience</h2>
        {experienceData.map((exp, index) => (
          <div key={index} className="mb-2 text-sm">
            <div className="flex justify-between font-bold">
              <span>{exp.position || exp.jobTitle || "Position"}</span>
              <span>
                {exp.yearsOfExperience ||
                  (exp.startDate && exp.endDate
                    ? `${exp.startDate} - ${exp.endDate}`
                    : exp.startDate
                    ? `${exp.startDate} - Present`
                    : "")}
              </span>
            </div>
            <div>
              {exp.company || exp.companyName || "Company"}
              {exp.location ? `, ${exp.location}` : ""}
            </div>
            <div className="whitespace-pre-line mt-1">
              {exp.description || ""}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Function to render skills section
  const renderSkills = () => {
    if (skillsData.length === 0) return null;

    // Group skills by category
    const groupedSkills = skillsData.reduce((acc, skill) => {
      const category = skill.skillType || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill.skillName);
      return acc;
    }, {});

    return (
      <div className="mb-3">
        <h2 className="font-bold uppercase border-b mb-1">Skills</h2>
        <div className="text-sm">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="mb-1">
              <span className="font-semibold">{category}: </span>
              <span>{skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to render projects section
  const renderProjects = () => {
    if (projectsData.length === 0) return null;

    return (
      <div className="mb-3">
        <h2 className="font-bold uppercase border-b mb-1">Projects</h2>
        {projectsData.map((project, index) => (
          <div key={index} className="mb-2 text-sm">
            <div className="flex justify-between font-bold">
              <span>{project.title || "Project"}</span>
              {project.duration && <span>{project.duration}</span>}
            </div>
            {project.technologiesUsed && (
              <div className="italic">{project.technologiesUsed}</div>
            )}
            <div className="whitespace-pre-line mt-1">
              {project.description || ""}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Function to render achievements section
  const renderAchievements = () => {
    if (achievementsData.length === 0) return null;

    return (
      <div className="mb-3">
        <h2 className="font-bold uppercase border-b mb-1">Achievements</h2>
        <ul className="list-disc pl-5 text-sm">
          {achievementsData.map((achievement, index) => (
            <li key={index}>{achievement.description || ""}</li>
          ))}
        </ul>
      </div>
    );
  };

  // Function to render certifications section
  const renderCertifications = () => {
    if (certificationsData.length === 0) return null;

    return (
      <div className="mb-3">
        <h2 className="font-bold uppercase border-b mb-1">Certifications</h2>
        {certificationsData.map((cert, index) => (
          <div key={index} className="mb-2 text-sm">
            <div className="flex justify-between">
              <span className="font-bold">{cert.certificationName || ""}</span>
              {cert.dateObtained && <span>{cert.dateObtained}</span>}
            </div>
            <div>{cert.issuingOrganization || ""}</div>
            {cert.certificationId && (
              <div className="text-xs">ID: {cert.certificationId}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Function to render custom section
  const renderCustomSection = (section) => {
    if (section.id === "profile-summary") return null;

    return (
      <div key={section.id} className="mb-3">
        <h2 className="font-bold uppercase border-b mb-1">{section.title}</h2>
        <div className="whitespace-pre-line text-sm">{section.content}</div>
      </div>
    );
  };

  // Get sections in the correct order based on configuration
  const getSections = () => {
    // Use the provided sectionConfig prop if available, otherwise use default from settings
    const enabledSections =
      sectionConfig && sectionConfig.length > 0
        ? sectionConfig.filter((section) => section.enabled)
        : sectionConfigFromSettings.map((id) => ({ id, enabled: true }));

    const sections = [];

    enabledSections.forEach((section) => {
      const sectionId = section.id;

      switch (sectionId) {
        case "profile-summary":
          const summary = renderProfileSummary();
          if (summary) sections.push(summary);
          break;
        case "education":
          const education = renderEducation();
          if (education) sections.push(education);
          break;
        case "experience":
          const experience = renderExperience();
          if (experience) sections.push(experience);
          break;
        case "skills":
          const skills = renderSkills();
          if (skills) sections.push(skills);
          break;
        case "projects":
          const projects = renderProjects();
          if (projects) sections.push(projects);
          break;
        case "achievements":
          const achievements = renderAchievements();
          if (achievements) sections.push(achievements);
          break;
        case "certifications":
          const certifications = renderCertifications();
          if (certifications) sections.push(certifications);
          break;
        default:
          // Check if it's a custom section
          const customSection = customSectionsData.find(
            (cs) => cs.id === sectionId
          );
          if (customSection) {
            sections.push(renderCustomSection(customSection));
          }
      }
    });

    // Add any custom sections that weren't in the configuration
    if (sectionConfig.length === 0) {
      customSectionsData.forEach((section) => {
        if (
          section.id !== "profile-summary" &&
          !enabledSections.some((s) => s.id === section.id)
        ) {
          sections.push(renderCustomSection(section));
        }
      });
    }

    return sections;
  };

  return (
    <div
      style={{
        fontFamily: font,
        color: colors.text,
        backgroundColor: colors.background,
        padding: "8mm",
        lineHeight: "1.2",
        maxWidth: "100%",
      }}
    >
      {renderPersonalInfo()}
      {getSections()}
    </div>
  );
};

MinimalistATSLayout.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
  sectionConfig: PropTypes.array,
};

export default MinimalistATSLayout;
