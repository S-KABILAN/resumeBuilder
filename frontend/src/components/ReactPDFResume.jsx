import React, { useMemo, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Link,
  Font,
} from "@react-pdf/renderer";

// React PDF has built-in support for these standard fonts:
// Courier, Courier-Bold, Courier-Oblique, Courier-BoldOblique
// Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique
// Times-Roman, Times-Bold, Times-Italic, Times-BoldItalic

// Create base styles
const createStyles = (templateSettings) => {
  const colors = templateSettings?.colors || {
    primary: "#333333",
    secondary: "#555555",
    accent: "#4a6cf7",
    text: "#333333",
    background: "#ffffff",
  };

  // Map font family to supported PDF fonts
  let fontFamily = "Helvetica";

  if (templateSettings?.font) {
    // Map common CSS fonts to PDF-compatible fonts
    if (
      templateSettings.font.includes("sans-serif") ||
      templateSettings.font.includes("system-ui")
    ) {
      fontFamily = "Helvetica";
    } else if (
      templateSettings.font.includes("serif") ||
      templateSettings.font.includes("Georgia")
    ) {
      fontFamily = "Times-Roman";
    } else if (templateSettings.font.includes("mono")) {
      fontFamily = "Courier";
    }
  }

  const baseStyles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: colors.background || "#FFFFFF",
      padding: 30,
      fontFamily: fontFamily,
    },
    section: {
      marginBottom:
        templateSettings?.spacing === "tight"
          ? 6
          : templateSettings?.spacing === "relaxed"
          ? 14
          : 10,
    },
    header: {
      marginBottom: 20,
      textAlign: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
      color: colors.primary,
    },
    title: {
      fontSize: 14,
      color: colors.secondary,
      marginBottom: 5,
    },
    contactInfo: {
      flexDirection: "row",
      justifyContent: "center",
      fontSize: 10,
      marginBottom: 5,
      flexWrap: "wrap",
    },
    contactItem: {
      marginHorizontal: 5,
      color: colors.text,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
      paddingBottom: 2,
      color: colors.primary,
    },
    experienceItem: {
      marginBottom:
        templateSettings?.spacing === "tight"
          ? 7
          : templateSettings?.spacing === "relaxed"
          ? 13
          : 10,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 3,
    },
    experienceTitle: {
      fontSize: 12,
      fontWeight: "semibold",
      color: colors.secondary,
    },
    experienceDate: {
      fontSize: 10,
      color: colors.text,
    },
    companyName: {
      fontSize: 11,
      marginBottom: 3,
      color: colors.text,
    },
    location: {
      fontSize: 10,
      color: colors.secondary,
      marginBottom: 3,
    },
    description: {
      fontSize: 10,
      lineHeight: 1.4,
      color: colors.text,
    },
    educationItem: {
      marginBottom: 8,
    },
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    degree: {
      fontSize: 11,
      fontWeight: "semibold",
      color: colors.secondary,
    },
    institution: {
      fontSize: 10,
      color: colors.text,
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    skillItem: {
      fontSize: 10,
      marginRight: 5,
      marginBottom: 5,
      backgroundColor: colors.accent + "20", // 20% opacity
      padding: 5,
      borderRadius: 3,
      color: colors.text,
    },
    link: {
      color: colors.accent,
      textDecoration: "none",
    },
    listItem: {
      fontSize: 10,
      marginBottom: 3,
      lineHeight: 1.4,
      color: colors.text,
    },
    twoColumnLayout: {
      flexDirection: "row",
      marginTop: 10,
    },
    leftColumn: {
      width: "30%",
      paddingRight: 10,
      borderRight: 1,
      borderRightColor: colors.primary,
    },
    rightColumn: {
      width: "70%",
      paddingLeft: 10,
    },
    // Add a style for languages section
    languageItem: {
      fontSize: 10,
      marginBottom: 4,
      color: colors.text,
    },
  });

  return baseStyles;
};

// Format date helper
const formatDate = (dateStr) => {
  if (!dateStr) return "";

  // If it's just a year (YYYY)
  if (/^\d{4}$/.test(dateStr)) return dateStr;

  // If it's YYYY-MM
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split("-");
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

  return dateStr;
};

// Format date range helper
const formatDateRange = (startDate, endDate, isCurrently) => {
  if (startDate && endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }

  if (startDate && isCurrently) {
    return `${formatDate(startDate)} - Present`;
  }

  return "";
};

// Standard layout render components
const renderHeader = (personal, styles) => (
  <View style={styles.header}>
    <Text style={styles.name}>{personal.name || "YOUR NAME"}</Text>
    {personal.title && <Text style={styles.title}>{personal.title}</Text>}

    <View style={styles.contactInfo}>
      {personal.email && (
        <Text style={styles.contactItem}>{personal.email}</Text>
      )}
      {personal.phone && (
        <>
          <Text style={styles.contactItem}>•</Text>
          <Text style={styles.contactItem}>{personal.phone}</Text>
        </>
      )}
      {personal.location && (
        <>
          <Text style={styles.contactItem}>•</Text>
          <Text style={styles.contactItem}>{personal.location}</Text>
        </>
      )}
    </View>

    <View style={styles.contactInfo}>
      {personal.linkedin && (
        <Link src={personal.linkedin} style={styles.contactItem}>
          {personal.linkedin.replace(/(^\w+:|^)\/\//, "")}
        </Link>
      )}
      {personal.github && (
        <>
          <Text style={styles.contactItem}>•</Text>
          <Link src={personal.github} style={styles.contactItem}>
            {personal.github.replace(/(^\w+:|^)\/\//, "")}
          </Link>
        </>
      )}
      {personal.website && (
        <>
          <Text style={styles.contactItem}>•</Text>
          <Link src={personal.website} style={styles.contactItem}>
            {personal.website.replace(/(^\w+:|^)\/\//, "")}
          </Link>
        </>
      )}
    </View>
  </View>
);

const renderProfileSummary = (profileSummary, styles) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Professional Summary</Text>
    <Text style={styles.description}>{profileSummary.content}</Text>
  </View>
);

const renderExperience = (experience, styles) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Professional Experience</Text>
    {experience
      .filter((exp) => exp.isVisible !== false)
      .map((exp, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.experienceTitle}>
              {exp.position || exp.jobTitle || "Position"}
            </Text>
            <Text style={styles.experienceDate}>
              {formatDateRange(
                exp.startDate,
                exp.endDate,
                exp.isCurrentlyWorking
              )}
            </Text>
          </View>
          <Text style={styles.companyName}>
            {exp.company || exp.companyName || "Company"}
          </Text>
          {exp.location && <Text style={styles.location}>{exp.location}</Text>}
          <Text style={styles.description}>{exp.description || ""}</Text>
        </View>
      ))}
  </View>
);

const renderEducation = (education, styles) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Education</Text>
    {education
      .filter((edu) => edu.isVisible !== false)
      .map((edu, index) => (
        <View key={index} style={styles.educationItem}>
          <View style={styles.educationHeader}>
            <Text style={styles.degree}>
              {edu.degree || "Degree"}
              {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
            </Text>
            <Text style={styles.experienceDate}>
              {formatDateRange(
                edu.startDate,
                edu.endDate,
                edu.isCurrentlyStudying
              ) || edu.graduationYear}
            </Text>
          </View>
          <Text style={styles.institution}>
            {edu.institution || "Institution"}
            {edu.location ? `, ${edu.location}` : ""}
          </Text>
          {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
          {edu.description && (
            <Text style={styles.description}>{edu.description}</Text>
          )}
        </View>
      ))}
  </View>
);

const renderSkills = (skills, styles) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Skills</Text>
    <View style={styles.skillsContainer}>
      {skills
        .filter((skill) => skill.isVisible !== false)
        .map((skill, index) => (
          <Text key={index} style={styles.skillItem}>
            {skill.name || skill.skillName}
          </Text>
        ))}
    </View>
  </View>
);

const renderProjects = (projects, styles) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Projects</Text>
    {projects
      .filter((project) => project.isVisible !== false)
      .map((project, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.experienceTitle}>
              {project.name || project.title || "Project"}
            </Text>
            <Text style={styles.experienceDate}>
              {formatDateRange(
                project.startDate,
                project.endDate,
                project.isOngoing
              )}
            </Text>
          </View>
          {project.role && (
            <Text style={styles.companyName}>{project.role}</Text>
          )}
          {project.url && (
            <Link
              src={project.url}
              style={{ ...styles.location, ...styles.link }}
            >
              {project.url.replace(/(^\w+:|^)\/\//, "")}
            </Link>
          )}
          <Text style={styles.description}>{project.description || ""}</Text>
          {project.technologiesUsed && (
            <Text style={styles.description}>
              <Text style={{ fontWeight: "bold" }}>Technologies: </Text>
              {project.technologiesUsed}
            </Text>
          )}
        </View>
      ))}
  </View>
);

const renderCertifications = (certifications, styles) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Certifications</Text>
    {certifications
      .filter((cert) => cert.isVisible !== false)
      .map((cert, index) => (
        <View key={index} style={styles.experienceItem}>
          <View style={styles.experienceHeader}>
            <Text style={styles.experienceTitle}>
              {cert.name || cert.certificationName || "Certification"}
            </Text>
            <Text style={styles.experienceDate}>
              {cert.issueDate || cert.dateObtained
                ? formatDate(cert.issueDate || cert.dateObtained)
                : ""}
              {cert.expiryDate
                ? ` - ${formatDate(cert.expiryDate)}`
                : cert.doesNotExpire
                ? " - No Expiry"
                : ""}
            </Text>
          </View>
          <Text style={styles.companyName}>
            {cert.issuer || cert.issuingOrganization || "Issuer"}
          </Text>
          {(cert.credentialID || cert.certificationId) && (
            <Text style={styles.location}>
              Credential ID: {cert.credentialID || cert.certificationId}
            </Text>
          )}
          {cert.url && (
            <Link src={cert.url} style={{ ...styles.location, ...styles.link }}>
              {cert.url.replace(/(^\w+:|^)\/\//, "")}
            </Link>
          )}
        </View>
      ))}
  </View>
);

const renderAchievements = (achievements, styles) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Achievements</Text>
    {achievements
      .filter((achievement) => achievement.isVisible !== false)
      .map((achievement, index) => (
        <Text key={index} style={styles.listItem}>
          • {achievement.title || "Achievement"}
          {achievement.title ? ": " : ""}
          {achievement.description || ""}
        </Text>
      ))}
  </View>
);

const renderLanguages = (languages, styles) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Languages</Text>
    <View style={styles.skillsContainer}>
      {languages
        .filter((lang) => lang.isVisible !== false)
        .map((lang, index) => (
          <Text key={index} style={styles.languageItem}>
            • {lang.language}
            {lang.proficiency ? `: ${lang.proficiency}` : ""}
          </Text>
        ))}
    </View>
  </View>
);

const renderCustomSections = (customSections, styles, profileSummaryId) => (
  <>
    {customSections
      .filter(
        (section) =>
          section.id !== profileSummaryId && section.isVisible !== false
      )
      .map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.description}>{section.content}</Text>
        </View>
      ))}
  </>
);

const ReactPDFResume = ({
  formData,
  templateSettings,
  selectedLayout = "Layout1",
  sectionConfig = [],
}) => {
  const {
    personal = {},
    education = [],
    experience = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
    customSections = [],
  } = formData;

  // Find profile summary from custom sections
  const profileSummary = customSections.find(
    (section) => section.id === "profile-summary"
  );

  // Create styles with template settings
  const styles = createStyles(templateSettings);

  // Determine layout based on selectedLayout
  const renderLayoutContent = () => {
    // Use sectionOrder from templateSettings if available, otherwise use sectionConfig
    // If neither is available, use default order
    const sectionOrder = templateSettings?.sectionOrder ||
      sectionConfig
        ?.filter((section) => section.active || section.enabled)
        .map((section) => section.id) || [
        "profile-summary",
        "experience",
        "education",
        "skills",
        "languages",
        "projects",
        "certifications",
        "achievements",
      ];

    // Utility to render the right section based on section id
    const renderSection = (sectionId) => {
      // If sectionConfig is provided, check if section is active
      if (sectionConfig.length > 0) {
        const sectionSettings = sectionConfig.find(
          (section) => section.id === sectionId
        );
        if (
          sectionSettings &&
          !sectionSettings.active &&
          !sectionSettings.enabled
        ) {
          return null; // Skip this section if it's not active
        }
      }

      switch (sectionId) {
        case "profile-summary":
          return profileSummary && renderProfileSummary(profileSummary, styles);
        case "experience":
          return (
            experience &&
            experience.length > 0 &&
            renderExperience(experience, styles)
          );
        case "education":
          return (
            education &&
            education.length > 0 &&
            renderEducation(education, styles)
          );
        case "skills":
          return skills && skills.length > 0 && renderSkills(skills, styles);
        case "languages":
          return (
            languages &&
            languages.length > 0 &&
            renderLanguages(languages, styles)
          );
        case "projects":
          return (
            projects && projects.length > 0 && renderProjects(projects, styles)
          );
        case "certifications":
          return (
            certifications &&
            certifications.length > 0 &&
            renderCertifications(certifications, styles)
          );
        case "achievements":
          return (
            achievements &&
            achievements.length > 0 &&
            renderAchievements(achievements, styles)
          );
        default:
          // Check if it's a custom section
          if (sectionId.startsWith("custom-")) {
            const customSection = customSections.find(
              (s) => s.id === sectionId
            );
            if (customSection) {
              return (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{customSection.title}</Text>
                  <Text style={styles.description}>
                    {customSection.content}
                  </Text>
                </View>
              );
            }
          }
          return null;
      }
    };

    // Based on layout type, render different layouts
    switch (selectedLayout) {
      case "ATSTwoColumnLayout1":
      case "ATSTwoColumnLayout2":
        // Two column layout with personal info + sidebar sections
        return (
          <>
            {/* Header stays at top */}
            {renderHeader(personal, styles)}

            {/* Two column content */}
            <View style={styles.twoColumnLayout}>
              <View style={styles.leftColumn}>
                {/* Left column sections */}
                {renderSection("skills")}
                {certifications &&
                  certifications.length > 0 &&
                  renderCertifications(certifications, styles)}
                {achievements &&
                  achievements.length > 0 &&
                  renderAchievements(achievements, styles)}
              </View>

              <View style={styles.rightColumn}>
                {/* Right column sections */}
                {profileSummary && renderProfileSummary(profileSummary, styles)}
                {experience &&
                  experience.length > 0 &&
                  renderExperience(experience, styles)}
                {education &&
                  education.length > 0 &&
                  renderEducation(education, styles)}
                {projects &&
                  projects.length > 0 &&
                  renderProjects(projects, styles)}
              </View>
            </View>

            {/* Custom sections at bottom */}
            {renderCustomSections(customSections, styles, "profile-summary")}
          </>
        );

      case "MinimalistATS":
        // Minimalist ATS layout - clean, simple with no borders
        return (
          <>
            {/* Simplified header */}
            <View style={{ ...styles.header, marginBottom: 10 }}>
              <Text style={{ ...styles.name, fontSize: 22 }}>
                {personal.name || "YOUR NAME"}
              </Text>

              <View style={{ ...styles.contactInfo, marginTop: 5 }}>
                {personal.email && (
                  <Text style={styles.contactItem}>{personal.email}</Text>
                )}
                {personal.phone && (
                  <>
                    <Text style={styles.contactItem}> • </Text>
                    <Text style={styles.contactItem}>{personal.phone}</Text>
                  </>
                )}
                {personal.location && (
                  <>
                    <Text style={styles.contactItem}> • </Text>
                    <Text style={styles.contactItem}>{personal.location}</Text>
                  </>
                )}
                {personal.linkedin && (
                  <>
                    <Text style={styles.contactItem}> • </Text>
                    <Link src={personal.linkedin} style={styles.contactItem}>
                      LinkedIn
                    </Link>
                  </>
                )}
              </View>
            </View>

            {/* Content sections in order with minimalist styling */}
            {profileSummary && (
              <View style={{ ...styles.section, marginBottom: 8 }}>
                <Text style={{ ...styles.description, fontWeight: "normal" }}>
                  {profileSummary.content}
                </Text>
              </View>
            )}

            {/* Other sections with minimalist headers */}
            {experience && experience.length > 0 && (
              <View style={{ ...styles.section, marginBottom: 8 }}>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    borderBottomWidth: 0,
                    fontSize: 13,
                    marginBottom: 4,
                  }}
                >
                  EXPERIENCE
                </Text>
                {experience
                  .filter((exp) => exp.isVisible !== false)
                  .map((exp, index) => (
                    <View
                      key={index}
                      style={{ ...styles.experienceItem, marginBottom: 8 }}
                    >
                      <View style={styles.experienceHeader}>
                        <Text
                          style={{
                            ...styles.experienceTitle,
                            fontWeight: "bold",
                          }}
                        >
                          {exp.position || exp.jobTitle || "Position"} |{" "}
                          {exp.company || exp.companyName || "Company"}
                        </Text>
                        <Text style={styles.experienceDate}>
                          {formatDateRange(
                            exp.startDate,
                            exp.endDate,
                            exp.isCurrentlyWorking
                          )}
                        </Text>
                      </View>
                      <Text style={styles.description}>
                        {exp.description || ""}
                      </Text>
                    </View>
                  ))}
              </View>
            )}

            {/* Education with minimalist style */}
            {education && education.length > 0 && (
              <View style={{ ...styles.section, marginBottom: 8 }}>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    borderBottomWidth: 0,
                    fontSize: 13,
                    marginBottom: 4,
                  }}
                >
                  EDUCATION
                </Text>
                {education
                  .filter((edu) => edu.isVisible !== false)
                  .map((edu, index) => (
                    <View
                      key={index}
                      style={{ ...styles.educationItem, marginBottom: 6 }}
                    >
                      <View style={styles.educationHeader}>
                        <Text style={{ ...styles.degree, fontWeight: "bold" }}>
                          {edu.degree || "Degree"}
                          {edu.fieldOfStudy
                            ? `, ${edu.fieldOfStudy}`
                            : ""} | {edu.institution || "Institution"}
                        </Text>
                        <Text style={styles.experienceDate}>
                          {formatDateRange(
                            edu.startDate,
                            edu.endDate,
                            edu.isCurrentlyStudying
                          ) || edu.graduationYear}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            )}

            {/* Skills in clean list format */}
            {skills && skills.length > 0 && (
              <View style={{ ...styles.section, marginBottom: 8 }}>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    borderBottomWidth: 0,
                    fontSize: 13,
                    marginBottom: 4,
                  }}
                >
                  SKILLS
                </Text>
                <Text style={styles.description}>
                  {skills
                    .filter((skill) => skill.isVisible !== false)
                    .map((skill) => skill.name || skill.skillName)
                    .join(", ")}
                </Text>
              </View>
            )}

            {/* Other sections following the minimalist pattern */}
            {renderSection("projects")}
            {renderSection("certifications")}
            {renderSection("achievements")}
            {renderCustomSections(customSections, styles, "profile-summary")}
          </>
        );

      case "ATSOptimized":
        // ATS-optimized layout - more structured for applicant tracking systems
        return (
          <>
            {/* ATS-friendly header */}
            <View style={styles.header}>
              <Text
                style={{
                  ...styles.name,
                  fontSize: 18,
                  textAlign: "left",
                  marginBottom: 2,
                }}
              >
                {personal.name || "YOUR NAME"}
              </Text>
              <Text
                style={{ ...styles.title, textAlign: "left", marginBottom: 2 }}
              >
                {personal.title || ""}
              </Text>

              <View
                style={{
                  ...styles.contactInfo,
                  justifyContent: "flex-start",
                  marginTop: 5,
                }}
              >
                {personal.email && (
                  <Text style={styles.contactItem}>{personal.email}</Text>
                )}
                {personal.phone && (
                  <>
                    <Text style={styles.contactItem}> | </Text>
                    <Text style={styles.contactItem}>{personal.phone}</Text>
                  </>
                )}
                {personal.location && (
                  <>
                    <Text style={styles.contactItem}> | </Text>
                    <Text style={styles.contactItem}>{personal.location}</Text>
                  </>
                )}
              </View>

              <View
                style={{ ...styles.contactInfo, justifyContent: "flex-start" }}
              >
                {personal.linkedin && (
                  <Link src={personal.linkedin} style={styles.contactItem}>
                    {personal.linkedin.replace(/(^\w+:|^)\/\//, "")}
                  </Link>
                )}
                {personal.github && (
                  <>
                    <Text style={styles.contactItem}> | </Text>
                    <Link src={personal.github} style={styles.contactItem}>
                      {personal.github.replace(/(^\w+:|^)\/\//, "")}
                    </Link>
                  </>
                )}
                {personal.website && (
                  <>
                    <Text style={styles.contactItem}> | </Text>
                    <Link src={personal.website} style={styles.contactItem}>
                      {personal.website.replace(/(^\w+:|^)\/\//, "")}
                    </Link>
                  </>
                )}
              </View>
            </View>

            {/* Content sections in standard ATS-friendly format */}
            {sectionOrder.map((sectionId, index) => (
              <React.Fragment key={`section-${sectionId}-${index}`}>
                {renderSection(sectionId)}
              </React.Fragment>
            ))}
            {renderCustomSections(customSections, styles, "profile-summary")}
          </>
        );

      case "Layout2":
        // Layout2 - more compact with different section styling
        return (
          <>
            {/* Different header style */}
            <View
              style={{
                ...styles.header,
                borderBottom: 1,
                borderBottomColor: styles.colors?.primary || "#333",
                paddingBottom: 10,
              }}
            >
              <Text style={styles.name}>{personal.name || "YOUR NAME"}</Text>
              {personal.title && (
                <Text style={styles.title}>{personal.title}</Text>
              )}

              <View style={styles.contactInfo}>
                {personal.email && (
                  <Text style={styles.contactItem}>{personal.email}</Text>
                )}
                {personal.phone && (
                  <>
                    <Text style={styles.contactItem}>•</Text>
                    <Text style={styles.contactItem}>{personal.phone}</Text>
                  </>
                )}
                {personal.location && (
                  <>
                    <Text style={styles.contactItem}>•</Text>
                    <Text style={styles.contactItem}>{personal.location}</Text>
                  </>
                )}
              </View>

              <View style={styles.contactInfo}>
                {personal.linkedin && (
                  <Link src={personal.linkedin} style={styles.contactItem}>
                    {personal.linkedin.replace(/(^\w+:|^)\/\//, "")}
                  </Link>
                )}
                {personal.github && (
                  <>
                    <Text style={styles.contactItem}>•</Text>
                    <Link src={personal.github} style={styles.contactItem}>
                      {personal.github.replace(/(^\w+:|^)\/\//, "")}
                    </Link>
                  </>
                )}
                {personal.website && (
                  <>
                    <Text style={styles.contactItem}>•</Text>
                    <Link src={personal.website} style={styles.contactItem}>
                      {personal.website.replace(/(^\w+:|^)\/\//, "")}
                    </Link>
                  </>
                )}
              </View>
            </View>

            {/* Layout2-specific section rendering with compact spacing */}
            {profileSummary && (
              <View
                style={{ ...styles.section, marginTop: 5, marginBottom: 5 }}
              >
                <Text
                  style={{
                    ...styles.sectionTitle,
                    backgroundColor: styles.colors?.primary + "20",
                    padding: 2,
                  }}
                >
                  Professional Summary
                </Text>
                <Text style={styles.description}>{profileSummary.content}</Text>
              </View>
            )}

            {/* Add all sections in order with Layout2 styling */}
            {experience && experience.length > 0 && (
              <View
                style={{ ...styles.section, marginTop: 5, marginBottom: 5 }}
              >
                <Text
                  style={{
                    ...styles.sectionTitle,
                    backgroundColor: styles.colors?.primary + "20",
                    padding: 2,
                  }}
                >
                  Professional Experience
                </Text>
                {experience
                  .filter((exp) => exp.isVisible !== false)
                  .map((exp, index) => (
                    <View
                      key={index}
                      style={{ ...styles.experienceItem, marginBottom: 5 }}
                    >
                      <View style={styles.experienceHeader}>
                        <Text
                          style={{
                            ...styles.experienceTitle,
                            fontWeight: "bold",
                          }}
                        >
                          {exp.position || exp.jobTitle || "Position"}
                        </Text>
                        <Text style={styles.experienceDate}>
                          {formatDateRange(
                            exp.startDate,
                            exp.endDate,
                            exp.isCurrentlyWorking
                          )}
                        </Text>
                      </View>
                      <Text
                        style={{ ...styles.companyName, fontWeight: "medium" }}
                      >
                        {exp.company || exp.companyName || "Company"}
                      </Text>
                      {exp.location && (
                        <Text style={styles.location}>{exp.location}</Text>
                      )}
                      <Text style={styles.description}>
                        {exp.description || ""}
                      </Text>
                    </View>
                  ))}
              </View>
            )}

            {/* Continue with other sections using Layout2 styling */}
            {education && education.length > 0 && (
              <View
                style={{ ...styles.section, marginTop: 5, marginBottom: 5 }}
              >
                <Text
                  style={{
                    ...styles.sectionTitle,
                    backgroundColor: styles.colors?.primary + "20",
                    padding: 2,
                  }}
                >
                  Education
                </Text>
                {/* Education items */}
                {education
                  .filter((edu) => edu.isVisible !== false)
                  .map((edu, index) => (
                    <View
                      key={index}
                      style={{ ...styles.educationItem, marginBottom: 5 }}
                    >
                      {/* Education content */}
                      <View style={styles.educationHeader}>
                        <Text style={{ ...styles.degree, fontWeight: "bold" }}>
                          {edu.degree || "Degree"}
                          {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                        </Text>
                        <Text style={styles.experienceDate}>
                          {formatDateRange(
                            edu.startDate,
                            edu.endDate,
                            edu.isCurrentlyStudying
                          ) || edu.graduationYear}
                        </Text>
                      </View>
                      <Text style={styles.institution}>
                        {edu.institution || "Institution"}
                        {edu.location ? `, ${edu.location}` : ""}
                      </Text>
                      {edu.gpa && (
                        <Text style={styles.description}>GPA: {edu.gpa}</Text>
                      )}
                      {edu.description && (
                        <Text style={styles.description}>
                          {edu.description}
                        </Text>
                      )}
                    </View>
                  ))}
              </View>
            )}

            {/* Add remaining sections using Layout2 styling */}
            {skills &&
              skills.length > 0 &&
              renderSkills(skills, {
                ...styles,
                sectionTitle: {
                  ...styles.sectionTitle,
                  backgroundColor: styles.colors?.primary + "20",
                  padding: 2,
                },
              })}

            {projects && projects.length > 0 && (
              <View
                style={{ ...styles.section, marginTop: 5, marginBottom: 5 }}
              >
                <Text
                  style={{
                    ...styles.sectionTitle,
                    backgroundColor: styles.colors?.primary + "20",
                    padding: 2,
                  }}
                >
                  Projects
                </Text>
                {/* Project items */}
                {projects
                  .filter((project) => project.isVisible !== false)
                  .map((project, index) => (
                    <View
                      key={index}
                      style={{ ...styles.experienceItem, marginBottom: 5 }}
                    >
                      {/* Project content */}
                      <View style={styles.experienceHeader}>
                        <Text
                          style={{
                            ...styles.experienceTitle,
                            fontWeight: "bold",
                          }}
                        >
                          {project.name || project.title || "Project"}
                        </Text>
                        <Text style={styles.experienceDate}>
                          {formatDateRange(
                            project.startDate,
                            project.endDate,
                            project.isOngoing
                          )}
                        </Text>
                      </View>
                      {project.role && (
                        <Text style={styles.companyName}>{project.role}</Text>
                      )}
                      {project.url && (
                        <Link
                          src={project.url}
                          style={{ ...styles.location, ...styles.link }}
                        >
                          {project.url.replace(/(^\w+:|^)\/\//, "")}
                        </Link>
                      )}
                      <Text style={styles.description}>
                        {project.description || ""}
                      </Text>
                      {project.technologiesUsed && (
                        <Text style={styles.description}>
                          <Text style={{ fontWeight: "bold" }}>
                            Technologies:{" "}
                          </Text>
                          {project.technologiesUsed}
                        </Text>
                      )}
                    </View>
                  ))}
              </View>
            )}

            {/* Add certifications and achievements */}
            {certifications && certifications.length > 0 && (
              <View
                style={{ ...styles.section, marginTop: 5, marginBottom: 5 }}
              >
                <Text
                  style={{
                    ...styles.sectionTitle,
                    backgroundColor: styles.colors?.primary + "20",
                    padding: 2,
                  }}
                >
                  Certifications
                </Text>
                {/* Certification content */}
                {renderCertifications(certifications, styles)}
              </View>
            )}

            {achievements && achievements.length > 0 && (
              <View
                style={{ ...styles.section, marginTop: 5, marginBottom: 5 }}
              >
                <Text
                  style={{
                    ...styles.sectionTitle,
                    backgroundColor: styles.colors?.primary + "20",
                    padding: 2,
                  }}
                >
                  Achievements
                </Text>
                {/* Achievement content */}
                {renderAchievements(achievements, styles)}
              </View>
            )}

            {/* Custom sections */}
            {renderCustomSections(customSections, styles, "profile-summary")}
          </>
        );

      case "Layout3":
        // Layout3 - more stylized with different section headers
        return (
          <>
            {/* Layout3 header style */}
            <View style={styles.header}>
              <Text
                style={{
                  ...styles.name,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {personal.name || "YOUR NAME"}
              </Text>
              {personal.title && (
                <Text style={{ ...styles.title, fontStyle: "italic" }}>
                  {personal.title}
                </Text>
              )}

              <View style={styles.contactInfo}>
                {personal.email && (
                  <Text style={styles.contactItem}>{personal.email}</Text>
                )}
                {personal.phone && (
                  <>
                    <Text style={styles.contactItem}>•</Text>
                    <Text style={styles.contactItem}>{personal.phone}</Text>
                  </>
                )}
                {personal.location && (
                  <>
                    <Text style={styles.contactItem}>•</Text>
                    <Text style={styles.contactItem}>{personal.location}</Text>
                  </>
                )}
              </View>

              <View style={styles.contactInfo}>
                {personal.linkedin && (
                  <Link src={personal.linkedin} style={styles.contactItem}>
                    {personal.linkedin.replace(/(^\w+:|^)\/\//, "")}
                  </Link>
                )}
                {personal.github && (
                  <>
                    <Text style={styles.contactItem}>•</Text>
                    <Link src={personal.github} style={styles.contactItem}>
                      {personal.github.replace(/(^\w+:|^)\/\//, "")}
                    </Link>
                  </>
                )}
                {personal.website && (
                  <>
                    <Text style={styles.contactItem}>•</Text>
                    <Link src={personal.website} style={styles.contactItem}>
                      {personal.website.replace(/(^\w+:|^)\/\//, "")}
                    </Link>
                  </>
                )}
              </View>
            </View>

            {/* Render Layout3-specific sections */}
            {sectionOrder.map((sectionId, index) => {
              // For Layout3 we'll use centered section titles with decorative elements
              const sectionContent = renderSection(sectionId);
              if (!sectionContent) return null;

              return (
                <View
                  key={`section-${sectionId}-${index}`}
                  style={styles.section}
                >
                  {sectionContent}
                </View>
              );
            })}

            {/* Custom sections */}
            {renderCustomSections(customSections, styles, "profile-summary")}
          </>
        );

      // Add more cases for other layout types

      default:
        // Standard layout (Layout1) - one-column layout with ordered sections
        return (
          <>
            {/* Header */}
            {renderHeader(personal, styles)}

            {/* Content sections in order */}
            {sectionOrder.map((sectionId, index) => (
              <React.Fragment key={`section-${sectionId}-${index}`}>
                {renderSection(sectionId)}
              </React.Fragment>
            ))}

            {/* Custom sections */}
            {renderCustomSections(customSections, styles, "profile-summary")}
          </>
        );
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderLayoutContent()}
      </Page>
    </Document>
  );
};

// Component for viewing the resume in a browser - make it more responsive
export const ResumeViewer = ({
  formData,
  templateSettings,
  selectedLayout,
  sectionConfig = [],
}) => (
  <PDFViewer
    style={{
      width: "100%",
      height: "700px",
      maxHeight: "90vh", // More responsive height
      border: "none", // Remove border for cleaner look
    }}
  >
    <ReactPDFResume
      formData={formData}
      templateSettings={templateSettings}
      selectedLayout={selectedLayout}
      sectionConfig={sectionConfig}
    />
  </PDFViewer>
);

// Component for downloading the resume - pass section config
export const ResumeDownloadButton = ({
  formData,
  templateSettings,
  selectedLayout,
  sectionConfig = [],
  style,
  children,
}) => {
  const [error, setError] = useState(null);

  // Sanitize file name (remove special characters, trim spaces)
  const getFileName = () => {
    const name = formData.personal?.name || "resume";
    return (
      name
        .replace(/[^a-zA-Z0-9-_]/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_+|_+$/g, "") + ".pdf"
    );
  };

  // Memoize the document to avoid unnecessary re-renders
  const pdfDocument = useMemo(() => {
    try {
      setError(null);
      return (
        <ReactPDFResume
          formData={formData}
          templateSettings={templateSettings}
          selectedLayout={selectedLayout}
          sectionConfig={sectionConfig}
        />
      );
    } catch (err) {
      setError("Failed to generate PDF. Please check your data.");
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    JSON.stringify(formData),
    JSON.stringify(templateSettings),
    selectedLayout,
    JSON.stringify(sectionConfig),
  ]);

  return (
    <>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <PDFDownloadLink
        document={pdfDocument}
        fileName={getFileName()}
        style={{
          textDecoration: "none",
          padding: "10px 15px",
          backgroundColor: "#4a6cf7",
          color: "#fff",
          borderRadius: "5px",
          display: "inline-block",
          ...style,
        }}
      >
        {(props) =>
          children
            ? typeof children === "function"
              ? children(props)
              : children
            : props.loading
            ? "Generating PDF..."
            : props.error
            ? "Error generating PDF"
            : "Download PDF"
        }
      </PDFDownloadLink>
    </>
  );
};

export default ReactPDFResume;
