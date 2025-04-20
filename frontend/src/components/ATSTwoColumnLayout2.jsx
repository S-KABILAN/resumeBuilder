import PropTypes from "prop-types";

const ATSTwoColumnLayout2 = ({
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
      primary: "#2d3748", // Dark slate for ATS compatibility
      secondary: "#4a5568",
      background: "#ffffff",
      text: "#2d3748",
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

  // Function to get clean, ATS-friendly section headings
  const getSectionHeadingClass = () => {
    return "text-base font-bold uppercase mb-2 pb-1 border-b";
  };

  // Function to safely render text with fallbacks
  const renderText = (value, defaultText = "Not specified") => {
    if (!value) return defaultText;
    if (typeof value === "string" && /^(.)\1{5,}$/.test(value))
      return defaultText;
    return value;
  };

  // Function to get sections for left sidebar - Contact and Skills
  const getLeftSideSections = () => {
    // Use the provided sectionConfig prop if available, otherwise use default from settings
    const enabledSections =
      sectionConfig && sectionConfig.length > 0
        ? sectionConfig
            .filter((section) => section.enabled)
            .map((section) => section.id)
        : sectionConfigFromSettings;

    // For this layout, we only want skills in the left column
    const sidebarSections = enabledSections.filter((sectionId) =>
      ["skills"].includes(sectionId)
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

  // Function to get sections for main content - Summary, Education, Experience, etc.
  const getMainSections = () => {
    // Use the provided sectionConfig prop if available, otherwise use default from settings
    const enabledSections =
      sectionConfig && sectionConfig.length > 0
        ? sectionConfig
            .filter((section) => section.enabled)
            .map((section) => section.id)
        : sectionConfigFromSettings;

    // Filter sections for main content - everything except skills
    const mainSections = enabledSections.filter((sectionId) =>
      [
        "profile-summary",
        "experience",
        "education",
        "projects",
        "achievements",
        "certifications",
      ].includes(sectionId)
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
              title: "Professional Experience",
              render: () => renderExperience(),
            };
          case "education":
            return {
              id: "education",
              title: "Education",
              render: () => renderEducation(),
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
          case "certifications":
            return {
              id: "certifications",
              title: "Certifications",
              render: () => renderCertifications(),
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
        <div
          className="whitespace-pre-line text-sm"
          style={{ lineHeight: "1.4" }}
        >
          {profileSummary.content}
        </div>
      </div>
    );
  };

  const renderContactInfo = () => {
    return (
      <div className="mb-4">
        {personal?.email && (
          <div className="text-sm mb-1">
            <span className="font-semibold">Email: </span>
            {personal.email}
          </div>
        )}
        {personal?.phone && (
          <div className="text-sm mb-1">
            <span className="font-semibold">Phone: </span>
            {personal.phone}
          </div>
        )}
        {personal?.location && (
          <div className="text-sm mb-1">
            <span className="font-semibold">Location: </span>
            {personal.location}
          </div>
        )}
        {personal?.linkedin && (
          <div className="text-sm mb-1">
            <span className="font-semibold">LinkedIn: </span>
            {personal.linkedin}
          </div>
        )}
        {personal?.github && (
          <div className="text-sm mb-1">
            <span className="font-semibold">GitHub: </span>
            {personal.github}
          </div>
        )}
        {personal?.website && (
          <div className="text-sm mb-1">
            <span className="font-semibold">Website: </span>
            {personal.website}
          </div>
        )}
      </div>
    );
  };

  const renderEducation = () => {
    if (educationData.length === 0) return null;

    return (
      <div className={getSpacingClass()}>
        {educationData.map((edu, index) => (
          <div key={index} className="mb-3 text-sm">
            <div className="flex justify-between">
              <div className="font-bold">
                {renderText(edu.degree, "Degree")}
                {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
              </div>
              <div>
                {edu.useYearOnly
                  ? renderText(edu.graduationYear, "Year")
                  : edu.startDate && edu.endDate
                  ? `${edu.startDate} - ${edu.endDate}`
                  : renderText(edu.graduationYear, "Year")}
              </div>
            </div>
            <div className="font-semibold">
              {renderText(edu.institution, "Institution")}
              {edu.location ? `, ${edu.location}` : ""}
              {edu.gpa && ` | GPA: ${edu.gpa}`}
            </div>
            {edu.description && (
              <div className="mt-1 whitespace-pre-line">{edu.description}</div>
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
          <div key={index} className="mb-3 text-sm">
            <div className="flex justify-between">
              <div className="font-bold">
                {renderText(exp.position || exp.jobTitle, "Position")}
              </div>
              <div>
                {exp.yearsOfExperience ||
                  (exp.startDate && exp.endDate
                    ? `${exp.startDate} - ${exp.endDate}`
                    : exp.startDate
                    ? `${exp.startDate} - Present`
                    : "Duration")}
              </div>
            </div>
            <div className="font-semibold">
              {renderText(exp.company || exp.companyName, "Company")}
              {exp.location ? `, ${exp.location}` : ""}
            </div>
            <div
              className="mt-1 whitespace-pre-line"
              style={{ lineHeight: "1.4" }}
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
        <div className="space-y-2 text-sm">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
              <div className="font-semibold">{category}</div>
              <div>{skills.filter(Boolean).join(", ")}</div>
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
        <ul className="list-disc pl-4 space-y-1 text-sm">
          {achievementsData.map((achievement, index) => (
            <li
              key={index}
              className="whitespace-pre-line"
              style={{ lineHeight: "1.4" }}
            >
              {renderText(achievement.description, "Achievement")}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderProjects = () => {
    if (projectsData.length === 0) return null;

    return (
      <div className={getSpacingClass()}>
        {projectsData.map((project, index) => (
          <div key={index} className="mb-3 text-sm">
            <div className="flex justify-between">
              <div className="font-bold">
                {renderText(project.title, "Project Title")}
              </div>
              {project.duration && <div>{project.duration}</div>}
            </div>
            {project.technologiesUsed && (
              <div className="italic">
                <span className="font-medium">Technologies: </span>
                {project.technologiesUsed}
              </div>
            )}
            <div
              className="mt-1 whitespace-pre-line"
              style={{ lineHeight: "1.4" }}
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
          <div key={index} className="mb-2 text-sm">
            <div className="flex justify-between">
              <div className="font-bold">
                {renderText(cert.certificationName, "Certification")}
              </div>
              {cert.dateObtained && <div>{cert.dateObtained}</div>}
            </div>
            <div>
              {renderText(cert.issuingOrganization, "Organization")}
              {cert.certificationId && ` | ID: ${cert.certificationId}`}
            </div>
            {cert.description && (
              <div className="mt-1 whitespace-pre-line">{cert.description}</div>
            )}
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
        lineHeight: "1.2",
        maxWidth: "100%",
        height: "100%",
        padding: "6mm",
        boxSizing: "border-box",
      }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left column - Name, Contact Info and Skills */}
        <div className="w-full md:w-1/4 pr-4">
          <div className="mb-4">
            <h1
              className="text-xl font-bold uppercase"
              style={{ color: colors.primary }}
            >
              {renderText(personal?.name, "YOUR NAME")}
            </h1>
            {personal?.title && (
              <p
                className="text-sm font-semibold"
                style={{ color: colors.secondary }}
              >
                {personal.title}
              </p>
            )}
          </div>

          {renderContactInfo()}

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

        {/* Right column - Main content */}
        <div className="w-full md:w-3/4 pl-0 md:pl-4 md:border-l border-gray-300">
          {mainSections.map((section) => (
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
      </div>
    </div>
  );
};

ATSTwoColumnLayout2.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
  sectionConfig: PropTypes.array,
};

export default ATSTwoColumnLayout2;
