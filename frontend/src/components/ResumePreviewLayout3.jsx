import PropTypes from "prop-types";

const ResumePreviewLayout3 = ({
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
      primary: "#333333",
      secondary: "#666666",
      background: "#ffffff",
      text: "#333333",
    },
    font = "Arial, sans-serif",
    spacing = "normal",
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

  // Function to get spacing class based on template settings
  const getSpacingClass = () => {
    switch (spacing) {
      case "compact":
        return "mb-2";
      case "comfortable":
        return "mb-4";
      default:
        return "mb-3";
    }
  };

  // Function to get section heading class for consistent ATS-friendly headings
  const getSectionHeadingClass = () => {
    return "text-lg font-bold uppercase mb-2 border-b border-gray-300 pb-1";
  };

  // Function to convert links to ATS-friendly text format
  const formatLink = (link) => {
    if (!link) return "";
    // Remove protocol for cleaner display
    return link.replace(/(^\w+:|^)\/\//, "");
  };

  const renderProfileSummary = () => {
    if (!profileSummary) return null;

    return (
      <div className={getSpacingClass()}>
        <h2
          className={getSectionHeadingClass()}
          style={{ color: colors.primary }}
        >
          Professional Summary
        </h2>
        <div
          className="whitespace-pre-line break-words"
          style={{ lineHeight: "1.6" }}
        >
          {profileSummary.content}
        </div>
      </div>
    );
  };

  const renderPersonalInfo = () => {
    return (
      <div className="text-center border-b pb-2 mb-3">
        <h1
          className="text-2xl font-bold tracking-wide"
          style={{ color: colors.primary }}
        >
          {personal?.name || "YOUR NAME"}
        </h1>
        {personal?.title && (
          <p
            className="text-base font-medium mt-1"
            style={{ color: colors.secondary }}
          >
            {personal.title}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-2">
          {personal?.email && <span className="text-sm">{personal.email}</span>}
          {personal?.phone && <span className="text-sm">{personal.phone}</span>}
          {personal?.location && (
            <span className="text-sm">{personal.location}</span>
          )}
          {personal?.linkedin && (
            <span className="text-sm">{formatLink(personal.linkedin)}</span>
          )}
          {personal?.github && (
            <span className="text-sm">{formatLink(personal.github)}</span>
          )}
          {personal?.website && (
            <span className="text-sm">{formatLink(personal.website)}</span>
          )}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    if (educationData.length === 0) return null;

    return (
      <div className={getSpacingClass()}>
        <h2
          className={getSectionHeadingClass()}
          style={{ color: colors.primary }}
        >
          Education
        </h2>
        {educationData.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex flex-wrap justify-between">
              <div className="font-bold break-words">
                {edu.institution || "Institution"}
              </div>
              <div className="text-sm font-medium break-words">
                {edu.useYearOnly
                  ? edu.graduationYear
                  : edu.startDate && edu.endDate
                  ? `${
                      edu.startDate.includes("-")
                        ? edu.startDate.split("-")[0]
                        : edu.startDate
                    }-${
                      edu.endDate.includes("-")
                        ? edu.endDate.split("-")[0]
                        : edu.endDate
                    }`
                  : edu.graduationYear}
              </div>
            </div>
            <div className="font-semibold break-words">
              {edu.degree || "Degree"}
              {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
              {edu.gpa && ` | GPA: ${edu.gpa}`}
            </div>
            {edu.location && (
              <div className="text-sm break-words">{edu.location}</div>
            )}
            {edu.description && (
              <div className="text-sm mt-2 whitespace-pre-line break-words">
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
      <div className={getSpacingClass()}>
        <h2
          className={getSectionHeadingClass()}
          style={{ color: colors.primary }}
        >
          Work Experience
        </h2>
        {experienceData.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-wrap justify-between">
              <div className="font-bold break-words">
                {exp.company || exp.companyName || "Company"}
              </div>
              <div className="text-sm font-medium break-words">
                {exp.yearsOfExperience ||
                  (exp.startDate && exp.endDate
                    ? `${exp.startDate} - ${exp.endDate}`
                    : exp.startDate
                    ? `${exp.startDate} - Present`
                    : "Duration")}
              </div>
            </div>
            <div className="font-semibold break-words">
              {exp.position || exp.jobTitle || "Job Title"}
            </div>
            {exp.location && (
              <div className="text-sm break-words">{exp.location}</div>
            )}
            <div
              className="mt-2 whitespace-pre-line break-words"
              style={{ lineHeight: "1.5" }}
            >
              {exp.description || "Description"}
            </div>
          </div>
        ))}
      </div>
    );
  };

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
      <div className={getSpacingClass()}>
        <h2
          className={getSectionHeadingClass()}
          style={{ color: colors.primary }}
        >
          Skills
        </h2>
        <div className="space-y-2">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="break-words">
              <span className="font-semibold">{category}: </span>
              <span>{skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAchievements = () => {
    if (achievementsData.length === 0) return null;

    return (
      <div className={getSpacingClass()}>
        <h2
          className={getSectionHeadingClass()}
          style={{ color: colors.primary }}
        >
          Achievements
        </h2>
        <div className="space-y-2">
          {achievementsData.map((achievement, index) => (
            <div key={index} className="break-words">
              <div
                className="whitespace-pre-line"
                style={{ lineHeight: "1.5" }}
              >
                • {achievement.description || "Achievement"}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProjects = () => {
    if (projectsData.length === 0) return null;

    return (
      <div className={getSpacingClass()}>
        <h2
          className={getSectionHeadingClass()}
          style={{ color: colors.primary }}
        >
          Projects
        </h2>
        {projectsData.map((project, index) => (
          <div key={index} className="mb-3">
            <div className="flex flex-wrap justify-between">
              <div className="font-bold break-words">
                {project.title || "Project Title"}
              </div>
              {project.duration && (
                <div className="text-sm font-medium">{project.duration}</div>
              )}
            </div>
            {project.role && (
              <div className="font-semibold break-words">{project.role}</div>
            )}
            <div
              className="mt-2 whitespace-pre-line break-words"
              style={{ lineHeight: "1.5" }}
            >
              {project.description || "Project description"}
            </div>
            {project.technologiesUsed && (
              <div className="text-sm mt-1 italic break-words">
                <span className="font-medium">Technologies: </span>
                {project.technologiesUsed}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCertifications = () => {
    if (certificationsData.length === 0) return null;

    return (
      <div className={getSpacingClass()}>
        <h2
          className={getSectionHeadingClass()}
          style={{ color: colors.primary }}
        >
          Certifications
        </h2>
        {certificationsData.map((cert, index) => (
          <div key={index} className="mb-3">
            <div className="flex flex-wrap justify-between">
              <div className="font-bold break-words">
                {cert.certificationName || "Certification"}
              </div>
              {cert.dateObtained && (
                <div className="text-sm font-medium">{cert.dateObtained}</div>
              )}
            </div>
            <div className="break-words">
              {cert.issuingOrganization || "Organization"}
            </div>
            {cert.certificationId && (
              <div className="text-sm break-words">
                Credential ID: {cert.certificationId}
              </div>
            )}
            {cert.description && (
              <div className="text-sm mt-1 whitespace-pre-line break-words">
                {cert.description}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderCustomSection = (section) => {
    // Skip profile summary as it's handled separately
    if (section.id === "profile-summary") return null;

    return (
      <div key={section.id} className={getSpacingClass()}>
        <h2
          className={getSectionHeadingClass()}
          style={{ color: colors.primary }}
        >
          {section.title}
        </h2>
        <div
          className="whitespace-pre-line break-words"
          style={{ lineHeight: "1.5" }}
        >
          {section.content}
        </div>
      </div>
    );
  };

  // Get sections in the correct order based on template settings
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
      className="w-full mx-auto"
      style={{
        fontFamily: font,
        color: colors.text,
        backgroundColor: colors.background,
        lineHeight: "1.3",
        maxWidth: "100%",
        padding: "8mm",
      }}
    >
      {renderPersonalInfo()}
      {getSections()}
    </div>
  );
};

ResumePreviewLayout3.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
  sectionConfig: PropTypes.array,
};

export default ResumePreviewLayout3;
