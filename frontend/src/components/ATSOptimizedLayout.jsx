import PropTypes from "prop-types";

const ATSOptimizedLayout = ({
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

  // Function to get section heading class
  const getSectionHeadingClass = () => {
    return "text-lg font-bold uppercase mb-2 border-b pb-1";
  };

  // Function to render personal information
  const renderPersonalInfo = () => {
    return (
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{personal?.name || "YOUR NAME"}</h1>

        <div className="flex flex-wrap justify-center gap-x-4 mt-2">
          {personal?.email && <span>{personal.email}</span>}
          {personal?.phone && <span>{personal.phone}</span>}
          {personal?.location && <span>{personal.location}</span>}
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 mt-1">
          {personal?.linkedin && <span>{personal.linkedin}</span>}
          {personal?.github && <span>{personal.github}</span>}
          {personal?.website && <span>{personal.website}</span>}
        </div>
      </div>
    );
  };

  // Function to render profile summary
  const renderProfileSummary = () => {
    if (!profileSummary) return null;

    return (
      <div className="mb-4">
        <h2 className={getSectionHeadingClass()}>PROFESSIONAL SUMMARY</h2>
        <div className="whitespace-pre-line">{profileSummary.content}</div>
      </div>
    );
  };

  // Function to render education section
  const renderEducation = () => {
    if (educationData.length === 0) return null;

    return (
      <div className="mb-4">
        <h2 className={getSectionHeadingClass()}>EDUCATION</h2>
        {educationData.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <div className="font-bold">
                {edu.institution || "Institution"}
              </div>
              <div>
                {edu.useYearOnly
                  ? edu.graduationYear
                  : edu.startDate && edu.endDate
                  ? `${edu.startDate} - ${edu.endDate}`
                  : edu.graduationYear || "Graduation Year"}
              </div>
            </div>
            <div className="font-semibold">
              {edu.degree || "Degree"}
              {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
            </div>
            {edu.location && <div>{edu.location}</div>}
            {edu.gpa && <div>GPA: {edu.gpa}</div>}
            {edu.description && (
              <div className="mt-1 whitespace-pre-line">{edu.description}</div>
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
      <div className="mb-4">
        <h2 className={getSectionHeadingClass()}>PROFESSIONAL EXPERIENCE</h2>
        {experienceData.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <div className="font-bold">
                {exp.company || exp.companyName || "Company"}
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
              {exp.position || exp.jobTitle || "Job Title"}
            </div>
            {exp.location && <div>{exp.location}</div>}
            <div className="mt-1 whitespace-pre-line">
              {exp.description || "Job description"}
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
      <div className="mb-4">
        <h2 className={getSectionHeadingClass()}>SKILLS</h2>
        <div className="space-y-1">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category}>
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
      <div className="mb-4">
        <h2 className={getSectionHeadingClass()}>PROJECTS</h2>
        {projectsData.map((project, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <div className="font-bold">
                {project.title || "Project Title"}
              </div>
              {project.duration && <div>{project.duration}</div>}
            </div>
            {project.role && (
              <div className="font-semibold">{project.role}</div>
            )}
            <div className="mt-1 whitespace-pre-line">
              {project.description || "Project description"}
            </div>
            {project.technologiesUsed && (
              <div className="mt-1">
                <span className="font-semibold">Technologies: </span>
                {project.technologiesUsed}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Function to render achievements section
  const renderAchievements = () => {
    if (achievementsData.length === 0) return null;

    return (
      <div className="mb-4">
        <h2 className={getSectionHeadingClass()}>ACHIEVEMENTS</h2>
        <ul className="list-disc pl-5">
          {achievementsData.map((achievement, index) => (
            <li key={index} className="mb-1">
              {achievement.description || "Achievement"}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Function to render certifications section
  const renderCertifications = () => {
    if (certificationsData.length === 0) return null;

    return (
      <div className="mb-4">
        <h2 className={getSectionHeadingClass()}>CERTIFICATIONS</h2>
        {certificationsData.map((cert, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <div className="font-bold">
                {cert.certificationName || "Certification"}
              </div>
              {cert.dateObtained && <div>{cert.dateObtained}</div>}
            </div>
            <div>{cert.issuingOrganization || "Organization"}</div>
            {cert.certificationId && <div>ID: {cert.certificationId}</div>}
          </div>
        ))}
      </div>
    );
  };

  // Function to render custom section
  const renderCustomSection = (section) => {
    if (section.id === "profile-summary") return null;

    return (
      <div key={section.id} className="mb-4">
        <h2 className={getSectionHeadingClass()}>
          {section.title.toUpperCase()}
        </h2>
        <div className="whitespace-pre-line">{section.content}</div>
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
        padding: "10mm",
        lineHeight: "1.4",
        maxWidth: "100%",
      }}
    >
      {renderPersonalInfo()}
      {getSections()}
    </div>
  );
};

ATSOptimizedLayout.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
  sectionConfig: PropTypes.array,
};

export default ATSOptimizedLayout;
