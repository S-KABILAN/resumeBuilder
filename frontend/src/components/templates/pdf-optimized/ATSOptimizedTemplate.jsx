import PropTypes from "prop-types";

const ATSOptimizedTemplate = ({ formData, templateSettings }) => {
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

  // Ensure we're working with arrays for all section data
  const educationData = Array.isArray(education) ? education : [];
  const experienceData = Array.isArray(experience) ? experience : [];
  const skillsData = Array.isArray(skills) ? skills : [];
  const achievementsData = Array.isArray(achievements) ? achievements : [];
  const projectsData = Array.isArray(projects) ? projects : [];
  const certificationsData = Array.isArray(certifications)
    ? certifications
    : [];
  const customSectionsData = Array.isArray(customSections)
    ? customSections
    : [];

  // Find profile summary from custom sections
  const profileSummary = customSectionsData.find(
    (section) => section.id === "profile-summary"
  );

  // Destructure template settings or use defaults
  const {
    colors = {
      primary: "#000000",
      secondary: "#505050",
      background: "#ffffff",
      text: "#333333",
    },
    font = "Arial, sans-serif",
    spacing = "normal",
    sectionOrder = [
      "profile-summary",
      "experience",
      "education",
      "skills",
      "projects",
      "achievements",
      "certifications",
    ],
  } = templateSettings || {};

  // Helper functions for formatting
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // If it's just a year (YYYY)
    if (/^\d{4}$/.test(dateString)) return dateString;

    // If it's in format YYYY-MM
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      const [year, month] = dateString.split("-");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${monthNames[parseInt(month) - 1]} ${year}`;
    }

    return dateString;
  };

  const formatDateRange = (
    startDate,
    endDate,
    useYearOnly,
    graduationYear,
    isCurrently
  ) => {
    if (useYearOnly && graduationYear) {
      return graduationYear;
    }

    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }

    if (startDate && isCurrently) {
      return `${formatDate(startDate)} - Present`;
    }

    return "";
  };

  // Section rendering functions
  const renderPersonalInfo = () => {
    if (!personal) return null;

    return (
      <header className="mb-3 text-center border-b pb-2">
        <h1 className="text-2xl font-bold tracking-wide mb-1">
          {personal.name || "YOUR NAME"}
        </h1>

        {personal.title && (
          <p className="text-lg font-medium mb-2">{personal.title}</p>
        )}

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {personal.email && <span className="text-sm">{personal.email}</span>}
          {personal.phone && <span className="text-sm">{personal.phone}</span>}
          {personal.location && (
            <span className="text-sm">{personal.location}</span>
          )}
          {personal.linkedin && (
            <span className="text-sm">
              {personal.linkedin.replace(/(^\w+:|^)\/\//, "")}
            </span>
          )}
          {personal.github && (
            <span className="text-sm">
              {personal.github.replace(/(^\w+:|^)\/\//, "")}
            </span>
          )}
          {personal.website && (
            <span className="text-sm">
              {personal.website.replace(/(^\w+:|^)\/\//, "")}
            </span>
          )}
        </div>
      </header>
    );
  };

  const renderSummary = () => {
    if (!profileSummary) return null;

    return (
      <section className="mb-3">
        <h2 className="text-lg font-bold uppercase mb-1 border-b pb-1">
          Professional Summary
        </h2>
        <div className="text-base" style={{ lineHeight: "1.4" }}>
          {profileSummary.content}
        </div>
      </section>
    );
  };

  const renderExperience = () => {
    if (!experienceData || experienceData.length === 0) return null;

    return (
      <section className="mb-3">
        <h2 className="text-lg font-bold uppercase mb-1 border-b pb-1">
          Professional Experience
        </h2>

        {experienceData
          .filter((exp) => exp.isVisible !== false)
          .map((exp, index) => (
            <div key={index} className="mb-2">
              <div className="flex flex-wrap justify-between mb-1">
                <div className="font-bold">
                  {exp.position || exp.jobTitle || "Position"}
                </div>
                <div>
                  {formatDateRange(
                    exp.startDate,
                    exp.endDate,
                    false,
                    null,
                    exp.isCurrentlyWorking
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-between mb-1">
                <div className="font-medium">
                  {exp.company || exp.companyName || "Company"}
                </div>
                {exp.location && <div className="text-sm">{exp.location}</div>}
              </div>

              <div
                className="whitespace-pre-line"
                style={{ lineHeight: "1.3" }}
              >
                {exp.description || ""}
              </div>
            </div>
          ))}
      </section>
    );
  };

  const renderEducation = () => {
    if (!educationData || educationData.length === 0) return null;

    return (
      <section className="mb-3">
        <h2 className="text-lg font-bold uppercase mb-1 border-b pb-1">
          Education
        </h2>

        {educationData
          .filter((edu) => edu.isVisible !== false)
          .map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex flex-wrap justify-between mb-1">
                <div className="font-medium">
                  {edu.degree || "Degree"}
                  {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                </div>
                <div>
                  {formatDateRange(
                    edu.startDate,
                    edu.endDate,
                    edu.useYearOnly,
                    edu.graduationYear,
                    edu.isCurrentlyStudying
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-between">
                <div className="font-medium">
                  {edu.institution || "Institution"}
                </div>
                {edu.location && <div className="text-sm">{edu.location}</div>}
              </div>

              {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}

              {edu.description && (
                <div className="text-sm whitespace-pre-line mt-1">
                  {edu.description}
                </div>
              )}
            </div>
          ))}
      </section>
    );
  };

  const renderSkills = () => {
    if (!skillsData || skillsData.length === 0) return null;

    // Group skills by type
    const skillsByType = skillsData
      .filter((skill) => skill.isVisible !== false)
      .reduce((groups, skill) => {
        const type = skill.skillType || "Other Skills";
        if (!groups[type]) {
          groups[type] = [];
        }
        groups[type].push(skill.skillName);
        return groups;
      }, {});

    return (
      <section className="mb-5">
        <h2 className="text-lg font-bold uppercase mb-2 border-b pb-1">
          Skills
        </h2>

        {Object.entries(skillsByType).map(([type, skills]) => (
          <div key={type} className="mb-2">
            <div className="font-medium">{type}:</div>
            <div>{skills.join(", ")}</div>
          </div>
        ))}
      </section>
    );
  };

  const renderProjects = () => {
    if (!projectsData || projectsData.length === 0) return null;

    return (
      <section className="mb-5">
        <h2 className="text-lg font-bold uppercase mb-2 border-b pb-1">
          Projects
        </h2>

        {projectsData
          .filter((project) => project.isVisible !== false)
          .map((project, index) => (
            <div key={index} className="mb-3">
              <div className="flex flex-wrap justify-between mb-1">
                <div className="font-bold">{project.title || "Project"}</div>
                {project.duration && <div>{project.duration}</div>}
              </div>

              {project.description && (
                <div
                  className="whitespace-pre-line"
                  style={{ lineHeight: "1.5" }}
                >
                  {project.description}
                </div>
              )}

              {project.technologiesUsed && (
                <div className="text-sm mt-1">
                  <span className="font-medium">Technologies: </span>
                  {project.technologiesUsed}
                </div>
              )}
            </div>
          ))}
      </section>
    );
  };

  const renderCertifications = () => {
    if (!certificationsData || certificationsData.length === 0) return null;

    return (
      <section className="mb-5">
        <h2 className="text-lg font-bold uppercase mb-2 border-b pb-1">
          Certifications
        </h2>

        {certificationsData
          .filter((cert) => cert.isVisible !== false)
          .map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="flex flex-wrap justify-between mb-1">
                <div className="font-medium">
                  {cert.certificationName || "Certification"}
                </div>
                {cert.dateObtained && <div>{cert.dateObtained}</div>}
              </div>

              <div>
                {cert.issuingOrganization || "Organization"}
                {cert.certificationId && ` (ID: ${cert.certificationId})`}
              </div>

              {cert.description && (
                <div className="text-sm mt-1">{cert.description}</div>
              )}
            </div>
          ))}
      </section>
    );
  };

  const renderAchievements = () => {
    if (!achievementsData || achievementsData.length === 0) return null;

    return (
      <section className="mb-5">
        <h2 className="text-lg font-bold uppercase mb-2 border-b pb-1">
          Achievements
        </h2>

        <ul className="list-disc pl-5">
          {achievementsData
            .filter((achievement) => achievement.isVisible !== false)
            .map((achievement, index) => (
              <li key={index} className="mb-1">
                {achievement.description || ""}
              </li>
            ))}
        </ul>
      </section>
    );
  };

  const renderCustomSection = (section) => {
    if (section.id === "profile-summary") return null;

    return (
      <section key={section.id} className="mb-5">
        <h2 className="text-lg font-bold uppercase mb-2 border-b pb-1">
          {section.title}
        </h2>

        <div className="whitespace-pre-line" style={{ lineHeight: "1.5" }}>
          {section.content}
        </div>
      </section>
    );
  };

  // Render all sections in the specified order
  const renderSections = () => {
    const sections = [];

    // Add sections according to template order
    sectionOrder.forEach((sectionId) => {
      switch (sectionId) {
        case "profile-summary":
          sections.push(renderSummary());
          break;
        case "experience":
          sections.push(renderExperience());
          break;
        case "education":
          sections.push(renderEducation());
          break;
        case "skills":
          sections.push(renderSkills());
          break;
        case "projects":
          sections.push(renderProjects());
          break;
        case "achievements":
          sections.push(renderAchievements());
          break;
        case "certifications":
          sections.push(renderCertifications());
          break;
        default:
          // Check if it's a custom section
          const customSection = customSectionsData.find(
            (section) => section.id === sectionId
          );
          if (customSection) {
            sections.push(renderCustomSection(customSection));
          }
      }
    });

    // Add any custom sections not specifically ordered
    customSectionsData.forEach((section) => {
      if (
        section.id !== "profile-summary" &&
        !sectionOrder.includes(section.id)
      ) {
        sections.push(renderCustomSection(section));
      }
    });

    return sections.filter(Boolean);
  };

  return (
    <div
      className="w-full mx-auto"
      style={{
        fontFamily: font,
        color: colors.text,
        backgroundColor: colors.background,
        lineHeight: "1.3",
        fontSize: "11pt",
        maxWidth: "100%",
        padding: "8mm",
      }}
    >
      {renderPersonalInfo()}
      {renderSections()}
    </div>
  );
};

ATSOptimizedTemplate.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
};

export default ATSOptimizedTemplate;
