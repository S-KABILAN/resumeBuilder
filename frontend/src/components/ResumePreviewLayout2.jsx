import PropTypes from "prop-types";

const ResumePreviewLayout2 = ({
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
      primary: "#4a6cf7",
      secondary: "#e0e0e0",
      background: "#ffffff",
      text: "#333333",
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

  // Function to get sections for left sidebar
  const getLeftSideSections = () => {
    // Use the provided sectionConfig prop if available, otherwise use default from settings
    const enabledSections =
      sectionConfig && sectionConfig.length > 0
        ? sectionConfig
            .filter((section) => section.enabled)
            .map((section) => section.id)
        : sectionConfigFromSettings;

    // Filter sections for sidebar
    const sidebarSections = enabledSections.filter((sectionId) =>
      ["skills", "education", "certifications"].includes(sectionId)
    );

    return sidebarSections
      .map((sectionId) => {
        switch (sectionId) {
          case "skills":
            return {
              id: "skills",
              title: "Skills",
              render: () => renderSkills(),
            };
          case "education":
            return {
              id: "education",
              title: "Education",
              render: () => renderEducation(),
            };
          case "certifications":
            return {
              id: "certifications",
              title: "Certifications",
              render: () => renderCertifications(),
            };
          default:
            return null;
        }
      })
      .filter(Boolean);
  };

  // Function to render custom section
  const renderCustomSection = (sectionId) => {
    const customSection = customSectionsData.find(
      (section) => section.id === sectionId && section.id !== "profile-summary"
    );

    if (customSection) {
      return {
        id: customSection.id,
        title: customSection.title,
        render: () => (
          <div className="whitespace-pre-line">{customSection.content}</div>
        ),
      };
    }
    return null;
  };

  // Function to get sections for main content
  const getMainSections = () => {
    // Use the provided sectionConfig prop if available, otherwise use default from settings
    const enabledSections =
      sectionConfig && sectionConfig.length > 0
        ? sectionConfig
            .filter((section) => section.enabled)
            .map((section) => section.id)
        : sectionConfigFromSettings;

    // Filter sections for main content
    const mainSections = enabledSections.filter((sectionId) =>
      ["profile-summary", "experience", "projects", "achievements"].includes(
        sectionId
      )
    );

    return mainSections
      .map((sectionId) => {
        switch (sectionId) {
          case "profile-summary":
            return profileSummary
              ? {
                  id: "profile-summary",
                  title: profileSummary.title,
                  render: () => renderProfileSummary(),
                }
              : null;
          case "experience":
            return {
              id: "experience",
              title: "Experience",
              render: () => renderExperience(),
            };
          case "projects":
            return {
              id: "projects",
              title: "Projects",
              render: () => renderProjects(),
            };
          case "achievements":
            return {
              id: "achievements",
              title: "Achievements",
              render: () => renderAchievements(),
            };
          default:
            return renderCustomSection(sectionId);
        }
      })
      .filter(Boolean);
  };

  // Get the sections for left sidebar and main content
  const leftSideSections = getLeftSideSections();
  const mainSections = getMainSections();

  const renderProfileSummary = () => {
    if (!profileSummary) return null;

    return (
      <div className="mb-4">
        <p style={{ lineHeight: "1.5" }}>{profileSummary.content}</p>
      </div>
    );
  };

  const renderPersonalInfo = () => {
    return (
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
          {personal?.name || "Your Name"}
        </h1>
        <div className="flex justify-center flex-wrap gap-2 mt-2">
          {personal?.email && (
            <span className="text-sm">
              <span style={{ color: colors.primary }}>Email: </span>
              {personal.email}
            </span>
          )}
          {personal?.phone && (
            <span className="text-sm">
              <span style={{ color: colors.primary }}>Phone: </span>
              {personal.phone}
            </span>
          )}
          {personal?.location && (
            <span className="text-sm">
              <span style={{ color: colors.primary }}>Location: </span>
              {personal.location}
            </span>
          )}
        </div>
        <div className="flex justify-center flex-wrap gap-2 mt-1">
          {personal?.linkedin && (
            <span className="text-sm">
              <span style={{ color: colors.primary }}>LinkedIn: </span>
              {personal.linkedin}
            </span>
          )}
          {personal?.github && (
            <span className="text-sm">
              <span style={{ color: colors.primary }}>GitHub: </span>
              {personal.github}
            </span>
          )}
          {personal?.website && (
            <span className="text-sm">
              <span style={{ color: colors.primary }}>Website: </span>
              {personal.website}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    if (educationData.length === 0) return null;

    return (
      <div>
        {educationData.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="font-semibold" style={{ color: colors.primary }}>
              {edu.degree || "Degree"}
              {edu.fieldOfStudy && (
                <div className="font-semibold">{edu.fieldOfStudy}</div>
              )}
            </div>
            <div className="text-sm">{edu.institution || "Institution"}</div>
            <div className="text-xs">
              {edu.useYearOnly
                ? edu.graduationYear
                : (edu.startDate && edu.endDate
                    ? `${
                        edu.startDate.includes("-")
                          ? edu.startDate.split("-")[0]
                          : edu.startDate
                      }-${
                        edu.endDate.includes("-")
                          ? edu.endDate.split("-")[0]
                          : edu.endDate
                      }`
                    : edu.graduationYear) || "Year"}
              {edu.gpa && ` | ${edu.gpa}`}
            </div>

            {edu.location && <div className="text-xs">{edu.location}</div>}
            {edu.gpa && <div className="text-xs">GPA: {edu.gpa}</div>}
            {edu.description && (
              <div className="text-xs mt-1 whitespace-pre-line">
                {edu.description}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderExperience = () => {
    if (experienceData.length === 0) return null;

    return (
      <div>
        {experienceData.map((exp, index) => (
          <div key={index} className="mb-3">
            <div className="font-semibold" style={{ color: colors.primary }}>
              {exp.position || exp.jobTitle || "Position"}
            </div>
            <div className="text-sm">
              {exp.company || exp.companyName || "Company"} |{" "}
              {exp.yearsOfExperience ||
                (exp.startDate && exp.endDate
                  ? `${exp.startDate} - ${exp.endDate}`
                  : exp.startDate
                  ? `${exp.startDate} - Present`
                  : "Duration")}
            </div>
            {exp.location && <div className="text-xs">{exp.location}</div>}
            <div className="text-xs mt-1 whitespace-pre-line">
              {exp.description || "Description"}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    if (skillsData.length === 0) return null;

    return (
      <div>
        {skillsData.map((skill, index) => (
          <div key={index} className="mb-2">
            <div className="font-semibold" style={{ color: colors.primary }}>
              {skill.skillType || "Skill"}:
            </div>
            <div className="text-sm">
              {skill.skillName || "Skill Description"}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderAchievements = () => {
    if (achievementsData.length === 0) return null;

    return (
      <div>
        <ul className="list-disc pl-4">
          {achievementsData.map((achievement, index) => (
            <li key={index} className="mb-1">
              <div className="text-sm">
                {achievement.description || "Achievement"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderProjects = () => {
    if (projectsData.length === 0) return null;

    return (
      <div>
        {projectsData.map((project, index) => (
          <div key={index} className="mb-3">
            <div className="font-semibold" style={{ color: colors.primary }}>
              {project.title || "Project"}
            </div>
            <div className="text-xs italic">
              {project.technologiesUsed || "Technologies"}
            </div>
            <div className="text-sm mt-1">
              {project.description || "Description"}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCertifications = () => {
    if (certificationsData.length === 0) return null;

    return (
      <div>
        {certificationsData.map((cert, index) => (
          <div key={index} className="mb-2">
            <div className="font-semibold" style={{ color: colors.primary }}>
              {cert.certificationName || "Certification"}
            </div>
            <div className="text-sm">
              {cert.issuingOrganization || "Organization"}
            </div>
            <div className="text-xs">
              {cert.dateObtained || "Date"}{" "}
              {cert.certificationId && `| ID: ${cert.certificationId}`}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="resume-container p-3 print:p-0"
      style={{
        fontFamily: font,
        backgroundColor: colors.background,
        color: colors.text,
        maxWidth: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header with personal info */}
      <div className="resume-section">{renderPersonalInfo()}</div>

      {/* Main content in two columns */}
      <div className="resume-content flex flex-row">
        {/* Left sidebar */}
        <div
          className="w-1/3 pr-3"
          style={{
            borderRight: `2px solid ${colors.secondary}`,
          }}
        >
          {leftSideSections.map((section) => (
            <div key={section.id} className="mb-4 resume-section">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: colors.primary }}
              >
                {section.title}
              </h2>
              {section.render()}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="w-2/3 pl-3">
          {mainSections.map((section) => (
            <div key={section.id} className="mb-4 resume-section">
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: colors.primary }}
              >
                {section.title}
              </h2>
              {section.render()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ResumePreviewLayout2.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
  sectionConfig: PropTypes.array,
};

export default ResumePreviewLayout2;
