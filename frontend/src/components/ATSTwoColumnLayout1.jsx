import PropTypes from "prop-types";

const ATSTwoColumnLayout1 = ({
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
      primary: "#333333", // Dark color for ATS compatibility
      secondary: "#555555",
      background: "#ffffff",
      text: "#333333",
    },
    font = "Arial, sans-serif", // Standard font for ATS compatibility
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

  // Function to get clean, ATS-friendly headings
  const getSectionHeadingClass = () => {
    return "text-lg font-bold uppercase mb-2 pb-1 border-b";
  };

  // Function to safely render text with fallbacks
  const renderText = (value, defaultText = "Not specified") => {
    if (!value) return defaultText;
    if (typeof value === "string" && /^(.)\1{5,}$/.test(value))
      return defaultText;
    return value;
  };

  // Function to get sections for left sidebar - Typically Skills, Education
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

  // Function to get sections for main content - Experience, Projects, etc.
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
                  title: "Professional Summary",
                  render: () => renderProfileSummary(),
                }
              : null;
          case "experience":
            return {
              id: "experience",
              title: "Work Experience",
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

  // Get sections for layout
  const leftSideSections = getLeftSideSections();
  const mainSections = getMainSections();

  const renderProfileSummary = () => {
    if (!profileSummary) return null;

    return (
      <div className={getSpacingClass()}>
        <div className="whitespace-pre-line" style={{ lineHeight: "1.5" }}>
          {profileSummary.content}
        </div>
      </div>
    );
  };

  const renderPersonalInfo = () => {
    return (
      <div className="text-center mb-4 pb-3 border-b border-gray-300">
        <h1 className="text-2xl font-bold" style={{ color: colors.text }}>
          {renderText(personal?.name, "YOUR NAME")}
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
            <span className="text-sm">{personal.linkedin}</span>
          )}
          {personal?.github && (
            <span className="text-sm">{personal.github}</span>
          )}
          {personal?.website && (
            <span className="text-sm">{personal.website}</span>
          )}
        </div>
      </div>
    );
  };

  const renderEducation = () => {
    if (educationData.length === 0) return null;

    return (
      <div className={getSpacingClass()}>
        {educationData.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="font-bold break-words">
              {renderText(edu.institution, "Institution")}
            </div>
            <div className="font-semibold break-words">
              {renderText(edu.degree, "Degree")}
              {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
            </div>
            <div className="text-sm font-medium break-words">
              {edu.useYearOnly
                ? renderText(edu.graduationYear, "Year")
                : edu.startDate && edu.endDate
                ? `${edu.startDate} - ${edu.endDate}`
                : renderText(edu.graduationYear, "Year")}
              {edu.gpa && ` | GPA: ${edu.gpa}`}
            </div>
            {edu.location && (
              <div className="text-sm break-words">{edu.location}</div>
            )}
            {edu.description && (
              <div className="text-sm mt-1 whitespace-pre-line break-words">
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
        {experienceData.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="font-bold break-words">
              {renderText(exp.position || exp.jobTitle, "Position")}
            </div>
            <div className="font-semibold break-words">
              {renderText(exp.company || exp.companyName, "Company")}
            </div>
            <div className="text-sm font-medium break-words">
              {exp.yearsOfExperience ||
                (exp.startDate && exp.endDate
                  ? `${exp.startDate} - ${exp.endDate}`
                  : exp.startDate
                  ? `${exp.startDate} - Present`
                  : "Duration")}
              {exp.location && ` | ${exp.location}`}
            </div>
            <div
              className="mt-2 whitespace-pre-line break-words"
              style={{ lineHeight: "1.5" }}
            >
              {renderText(exp.description, "Description")}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = () => {
    if (skillsData.length === 0) return null;

    // Group skills by category for ATS readability
    const groupedSkills = skillsData.reduce((acc, skill) => {
      const category = skill.skillType || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill.skillName || "");
      return acc;
    }, {});

    return (
      <div className={getSpacingClass()}>
        <div className="space-y-2">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="break-words">
              <span className="font-semibold">{category}: </span>
              <span>{skills.filter(Boolean).join(", ")}</span>
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
        <div className="space-y-2">
          {achievementsData.map((achievement, index) => (
            <div key={index} className="break-words">
              <div
                className="whitespace-pre-line"
                style={{ lineHeight: "1.5" }}
              >
                • {renderText(achievement.description, "Achievement")}
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
        {projectsData.map((project, index) => (
          <div key={index} className="mb-3">
            <div className="font-bold break-words">
              {renderText(project.title, "Project Title")}
            </div>
            {project.technologiesUsed && (
              <div className="text-sm font-medium break-words">
                <span className="font-medium">Technologies: </span>
                {project.technologiesUsed}
              </div>
            )}
            <div
              className="mt-1 whitespace-pre-line break-words"
              style={{ lineHeight: "1.5" }}
            >
              {renderText(project.description, "Project description")}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCertifications = () => {
    if (certificationsData.length === 0) return null;

    return (
      <div className={getSpacingClass()}>
        {certificationsData.map((cert, index) => (
          <div key={index} className="mb-3">
            <div className="font-bold break-words">
              {renderText(cert.certificationName, "Certification")}
            </div>
            <div className="text-sm break-words">
              {renderText(cert.issuingOrganization, "Organization")}
            </div>
            <div className="text-sm font-medium">
              {renderText(cert.dateObtained, "Date")}
              {cert.certificationId && ` | ID: ${cert.certificationId}`}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="w-full mx-auto print:p-0"
      style={{
        fontFamily: font,
        color: colors.text,
        backgroundColor: colors.background,
        lineHeight: "1.3",
        maxWidth: "100%",
        height: "100%",
        padding: "8mm",
        boxSizing: "border-box",
      }}
    >
      {renderPersonalInfo()}

      <div className="flex flex-row">
        {/* Left column for Skills, Education, etc. */}
        <div className="w-1/3 pr-4">
          {leftSideSections.map((section) => (
            <div key={section.id} className="mb-4">
              <h2
                className={getSectionHeadingClass()}
                style={{ color: colors.primary }}
              >
                {section.title}
              </h2>
              {section.render()}
            </div>
          ))}
        </div>

        {/* Right column for Experience, Projects, etc. */}
        <div className="w-2/3 pl-4 border-l border-gray-300">
          {mainSections.map((section) => (
            <div key={section.id} className="mb-5">
              <h2
                className={getSectionHeadingClass()}
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

ATSTwoColumnLayout1.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
  sectionConfig: PropTypes.array,
};

export default ATSTwoColumnLayout1;
