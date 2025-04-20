import PropTypes from "prop-types";

const ResumePreviewLayout1 = ({
  formData,
  templateSettings,
  sectionConfig = [],
}) => {
  // Default settings if none provided
  const settings = templateSettings || {
    colors: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#3b82f6",
      text: "#1f2937",
      background: "#ffffff",
    },
    font: "ui-sans-serif, system-ui, sans-serif",
    spacing: "normal",
    sectionOrder: [
      "education",
      "experience",
      "skills",
      "projects",
      "certifications",
    ],
  };

  // Helper function to get spacing class based on setting
  const getSpacingClass = () => {
    switch (settings.spacing) {
      case "tight":
        return "space-y-2";
      case "relaxed":
        return "space-y-6";
      default:
        return "space-y-4"; // normal spacing
    }
  };

  // Function to safely render text with fallbacks
  const renderText = (value, defaultText = "Not specified") => {
    // Check if value exists and is not just a string of repeated characters
    if (!value) return defaultText;
    if (typeof value === "string" && /^(.)\1{5,}$/.test(value))
      return defaultText;
    return value;
  };

  // Ensure we're working with arrays for all section data and filter by visibility
  const educationData = Array.isArray(formData.education)
    ? formData.education.filter((item) => item.isVisible !== false)
    : [];
  const experienceData = Array.isArray(formData.experience)
    ? formData.experience.filter((item) => item.isVisible !== false)
    : [];
  const skillsData = Array.isArray(formData.skills)
    ? formData.skills.filter((item) => item.isVisible !== false)
    : [];
  const projectsData = Array.isArray(formData.projects)
    ? formData.projects.filter((item) => item.isVisible !== false)
    : [];
  const certificationsData = Array.isArray(formData.certifications)
    ? formData.certifications.filter((item) => item.isVisible !== false)
    : [];
  const achievementsData = Array.isArray(formData.achievements)
    ? formData.achievements.filter((item) => item.isVisible !== false)
    : [];
  const customSectionsData = Array.isArray(formData.customSections)
    ? formData.customSections.filter((item) => item.isVisible !== false)
    : [];

  // Function to get all sections, including custom ones, respecting section configuration
  const getAllSections = () => {
    // Standard sections
    const standardSections = {
      education: (
        <section key="education">
          <h2
            className="text-xl font-semibold mb-4 border-b pb-2"
            style={{ color: settings.colors.secondary }}
          >
            Education
          </h2>
          {educationData.slice(0, 3).map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex">
                <p
                  className="font-semibold"
                  style={{ color: settings.colors.text }}
                >
                  {renderText(edu.degree, "Degree")}{" "}
                </p>
                {edu.fieldOfStudy && (
                  <p
                    className="font-semibold"
                    style={{ color: settings.colors.text }}
                  >
                    {renderText(edu.fieldOfStudy)}
                  </p>
                )}
              </div>

              <p
                className="text-sm"
                style={{ color: settings.colors.secondary }}
              >
                {renderText(edu.institution, "Institution")}
                {" - "}
                {edu.useYearOnly
                  ? renderText(edu.graduationYear, "Year")
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
                  : renderText(edu.graduationYear, "Year")}
                {edu.gpa && ` | ${edu.gpa}`}
              </p>
            </div>
          ))}
        </section>
      ),
      experience: (
        <section key="experience">
          <h2
            className="text-xl font-semibold mb-4 border-b pb-2"
            style={{ color: settings.colors.secondary }}
          >
            Experience
          </h2>
          {experienceData.slice(0, 3).map((exp, index) => (
            <div key={index} className="mb-4">
              <p
                className="font-semibold"
                style={{ color: settings.colors.text }}
              >
                {renderText(exp.jobTitle || exp.position, "Position")}
              </p>
              <p
                className="text-sm"
                style={{ color: settings.colors.secondary }}
              >
                {renderText(exp.companyName || exp.company, "Company")} -{" "}
                {renderText(exp.yearsOfExperience, "Duration")}
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: settings.colors.text }}
              >
                {renderText(exp.description, "Job description")}
              </p>
            </div>
          ))}
        </section>
      ),
      skills: (
        <section key="skills">
          <h2
            className="text-xl font-semibold mb-4 border-b pb-2"
            style={{ color: settings.colors.secondary }}
          >
            Skills
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            {skillsData.slice(0, 5).map((skill, index) => (
              <li key={index} style={{ color: settings.colors.text }}>
                {renderText(skill.skillType, "Skill")}:{" "}
                {renderText(skill.skillName, "Level")}
              </li>
            ))}
          </ul>
        </section>
      ),
      projects: (
        <section key="projects">
          <h2
            className="text-xl font-semibold mb-4 border-b pb-2"
            style={{ color: settings.colors.secondary }}
          >
            Projects
          </h2>
          {projectsData.slice(0, 2).map((project, index) => (
            <div key={index} className="mb-4">
              <p
                className="font-semibold"
                style={{ color: settings.colors.text }}
              >
                {renderText(project.title, "Project Title")}
              </p>
              <p className="text-sm" style={{ color: settings.colors.text }}>
                {renderText(project.description, "Project description")}
              </p>
              <p
                className="text-sm italic"
                style={{ color: settings.colors.secondary }}
              >
                {renderText(project.technologiesUsed, "Technologies used")}
              </p>
            </div>
          ))}
        </section>
      ),
      certifications: (
        <section key="certifications">
          <h2
            className="text-xl font-semibold mb-4 border-b pb-2"
            style={{ color: settings.colors.secondary }}
          >
            Certifications
          </h2>
          {certificationsData.slice(0, 3).map((cert, index) => (
            <div key={index} className="mb-3">
              <p
                className="font-semibold"
                style={{ color: settings.colors.text }}
              >
                {renderText(cert.certificationName, "Certification Name")}
              </p>
              <p
                className="text-sm"
                style={{ color: settings.colors.secondary }}
              >
                {renderText(cert.issuingOrganization, "Issuing Organization")} |{" "}
                {renderText(cert.dateObtained, "Date")}
              </p>
              {cert.certificationId && (
                <p className="text-xs" style={{ color: settings.colors.text }}>
                  ID: {renderText(cert.certificationId, "")}
                </p>
              )}
            </div>
          ))}
        </section>
      ),
      achievements: (
        <section key="achievements">
          <h2
            className="text-xl font-semibold mb-4 border-b pb-2"
            style={{ color: settings.colors.secondary }}
          >
            Achievements
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            {achievementsData.slice(0, 3).map((achievement, index) => (
              <li key={index} style={{ color: settings.colors.text }}>
                {renderText(achievement.description, "Achievement description")}
              </li>
            ))}
          </ul>
        </section>
      ),
    };

    // Generate custom sections
    const customSections = {};
    if (customSectionsData.length > 0) {
      customSectionsData.forEach((section) => {
        customSections[section.id] = (
          <section key={section.id}>
            <h2
              className="text-xl font-semibold mb-4 border-b pb-2"
              style={{ color: settings.colors.secondary }}
            >
              {section.title}
            </h2>
            <div
              className="whitespace-pre-line text-sm"
              style={{ color: settings.colors.text }}
            >
              {section.content}
            </div>
          </section>
        );
      });
    }

    // Combine all sections
    const allSections = { ...standardSections, ...customSections };

    // If no section config provided, use standard order from template settings
    if (!sectionConfig || sectionConfig.length === 0) {
      return settings.sectionOrder
        .map((sectionKey) => standardSections[sectionKey])
        .filter(Boolean);
    }

    // Filter and order sections according to sectionConfig
    return sectionConfig
      .filter((section) => section.enabled)
      .map((section) => allSections[section.id])
      .filter(Boolean);
  };

  // Get contact links or info
  const getContactInfo = (type, value) => {
    if (!value) return null;

    let icon, label, href;

    switch (type) {
      case "email":
        icon = "✉️";
        label = value;
        href = `mailto:${value}`;
        break;
      case "phone":
        icon = "📱";
        label = value;
        href = `tel:${value}`;
        break;
      case "linkedin":
        icon = "ƛ";
        label = "LinkedIn";
        href = value.startsWith("http") ? value : `https://${value}`;
        break;
      case "github":
        icon = "⌨️";
        label = "GitHub";
        href = value.startsWith("http") ? value : `https://${value}`;
        break;
      case "website":
        icon = "🌐";
        label = "Website";
        href = value.startsWith("http") ? value : `https://${value}`;
        break;
      case "location":
        icon = "📍";
        label = value;
        href = null;
        break;
      default:
        return null;
    }

    return (
      <div key={type} className="inline-block mr-3 text-sm">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
            style={{ color: settings.colors.primary }}
          >
            <span className="mr-1">{icon}</span>
            {label}
          </a>
        ) : (
          <span style={{ color: settings.colors.text }}>
            <span className="mr-1">{icon}</span>
            {label}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className="resume-container p-4 print:p-0"
      style={{
        fontFamily: settings.font,
        backgroundColor: settings.colors.background,
        color: settings.colors.text,
        maxWidth: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header with name and title */}
      <header
        className="text-center border-b-2 pb-4 mb-6 resume-section"
        style={{ borderColor: settings.colors.primary }}
      >
        <h1
          className="text-3xl font-bold"
          style={{ color: settings.colors.primary }}
        >
          {renderText(formData.personal?.name, "Your Name")}
        </h1>
        <p className="mt-2" style={{ color: settings.colors.secondary }}>
          {renderText(formData.personal?.title, "Your Professional Title")}
        </p>

        {/* Contact Information */}
        <div className="mt-3 flex flex-wrap justify-center">
          {getContactInfo("email", formData.personal?.email)}
          {getContactInfo("phone", formData.personal?.phone)}
          {getContactInfo("location", formData.personal?.location)}
          {getContactInfo("linkedin", formData.personal?.linkedin)}
          {getContactInfo("github", formData.personal?.github)}
          {getContactInfo("website", formData.personal?.website)}
        </div>
      </header>

      {/* Main content */}
      <main className={`${getSpacingClass()} px-1 resume-content`}>
        {getAllSections().map((section, index) => (
          <div key={index} className="resume-section">
            {section}
          </div>
        ))}
      </main>
    </div>
  );
};

ResumePreviewLayout1.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
  sectionConfig: PropTypes.array,
};

export default ResumePreviewLayout1;
