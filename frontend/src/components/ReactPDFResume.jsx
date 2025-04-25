import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Link,
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

  // Get font size based on settings
  const getFontSize = (baseSize) => {
    const fontSize = templateSettings?.fontSize || "medium";
    if (fontSize === "small") return baseSize * 0.85;
    if (fontSize === "large") return baseSize * 1.15;
    return baseSize; // medium is default
  };

  // Get content spacing based on settings
  const getContentSpacing = (baseSpacing) => {
    const contentSpacing = templateSettings?.contentSpacing || "standard";
    if (contentSpacing === "narrow") return baseSpacing * 0.75;
    if (contentSpacing === "wide") return baseSpacing * 1.5;
    return baseSpacing; // standard is default
  };

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
          ? 10
          : templateSettings?.spacing === "relaxed"
          ? 18
          : 14,
    },
    header: {
      marginBottom: 24,
      textAlign: "center",
    },
    name: {
      fontSize: getFontSize(24),
      fontWeight: "bold",
      marginBottom: getContentSpacing(8),
      color: colors.primary,
    },
    title: {
      fontSize: getFontSize(14),
      color: colors.secondary,
      marginBottom: getContentSpacing(8),
    },
    contactInfo: {
      flexDirection: "row",
      justifyContent: "center",
      fontSize: getFontSize(10),
      marginBottom: getContentSpacing(8),
      flexWrap: "wrap",
    },
    contactItem: {
      marginHorizontal: 5,
      color: colors.text,
    },
    sectionTitle: {
      fontSize: getFontSize(14),
      fontWeight: "bold",
      marginBottom: getContentSpacing(8),
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
      paddingBottom: 3,
      color: colors.primary,
    },
    experienceItem: {
      marginBottom:
        templateSettings?.spacing === "tight"
          ? getContentSpacing(10)
          : templateSettings?.spacing === "relaxed"
          ? getContentSpacing(16)
          : getContentSpacing(14),
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: getContentSpacing(4),
    },
    experienceTitle: {
      fontSize: getFontSize(12),
      fontWeight: "semibold",
      color: colors.secondary,
    },
    experienceDate: {
      fontSize: getFontSize(10),
      color: colors.text,
    },
    companyName: {
      fontSize: getFontSize(11),
      marginBottom: getContentSpacing(4),
      color: colors.text,
    },
    location: {
      fontSize: getFontSize(10),
      color: colors.secondary,
      marginBottom: getContentSpacing(4),
    },
    description: {
      fontSize: getFontSize(10),
      lineHeight: 1.5,
      color: colors.text,
    },
    educationItem: {
      marginBottom: getContentSpacing(10),
    },
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: getContentSpacing(4),
    },
    degree: {
      fontSize: getFontSize(11),
      fontWeight: "semibold",
      color: colors.secondary,
    },
    institution: {
      fontSize: getFontSize(10),
      color: colors.text,
      marginBottom: getContentSpacing(3),
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: getContentSpacing(4),
    },
    skillItem: {
      fontSize: getFontSize(10),
      marginRight: getContentSpacing(6),
      marginBottom: getContentSpacing(6),
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
      fontSize: getFontSize(10),
      marginBottom: getContentSpacing(4),
      lineHeight: 1.5,
      color: colors.text,
    },
    twoColumnLayout: {
      flexDirection: "row",
      marginTop: getContentSpacing(10),
    },
    leftColumn: {
      width: "30%",
      paddingRight: getContentSpacing(10),
      borderRight: 1,
      borderRightColor: colors.primary,
    },
    rightColumn: {
      width: "70%",
      paddingLeft: getContentSpacing(10),
    },
    // Add a style for languages section
    languageItem: {
      fontSize: getFontSize(10),
      marginBottom: getContentSpacing(4),
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

      case "ModernTwoColumn":
        // Modern two-column layout with colored sidebar
        return (
          <>
            <View style={styles.twoColumnLayout}>
              {/* Left sidebar with colored background */}
              <View
                style={{
                  ...styles.leftColumn,
                  backgroundColor: styles.colors?.primary + "15", // Light version of primary color
                  borderRight: 0,
                  padding: 10,
                  borderRadius: 4,
                }}
              >
                {/* Personal info in sidebar */}
                <View
                  style={{
                    marginBottom: 15,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      ...styles.name,
                      fontSize: 20,
                      textAlign: "center",
                      color: styles.colors?.primary,
                    }}
                  >
                    {personal.name || "YOUR NAME"}
                  </Text>
                  {personal.title && (
                    <Text
                      style={{
                        ...styles.title,
                        textAlign: "center",
                        fontSize: 12,
                        marginBottom: 8,
                      }}
                    >
                      {personal.title}
                    </Text>
                  )}
                </View>

                {/* Contact info */}
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      fontSize: 12,
                      borderBottomWidth: 0,
                      backgroundColor: styles.colors?.primary,
                      color: "white",
                      padding: 3,
                      textAlign: "center",
                      borderRadius: 3,
                    }}
                  >
                    CONTACT
                  </Text>
                  <View style={{ marginTop: 5 }}>
                    {personal.email && (
                      <Text style={{ fontSize: 9, marginBottom: 3 }}>
                        {personal.email}
                      </Text>
                    )}
                    {personal.phone && (
                      <Text style={{ fontSize: 9, marginBottom: 3 }}>
                        {personal.phone}
                      </Text>
                    )}
                    {personal.location && (
                      <Text style={{ fontSize: 9, marginBottom: 3 }}>
                        {personal.location}
                      </Text>
                    )}
                    {personal.linkedin && (
                      <Link
                        src={personal.linkedin}
                        style={{
                          fontSize: 9,
                          marginBottom: 3,
                          color: styles.colors?.accent,
                        }}
                      >
                        LinkedIn
                      </Link>
                    )}
                    {personal.github && (
                      <Link
                        src={personal.github}
                        style={{
                          fontSize: 9,
                          marginBottom: 3,
                          color: styles.colors?.accent,
                        }}
                      >
                        GitHub
                      </Link>
                    )}
                  </View>
                </View>

                {/* Skills section */}
                {skills && skills.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        fontSize: 12,
                        borderBottomWidth: 0,
                        backgroundColor: styles.colors?.primary,
                        color: "white",
                        padding: 3,
                        textAlign: "center",
                        borderRadius: 3,
                      }}
                    >
                      SKILLS
                    </Text>
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {skills
                        .filter((skill) => skill.isVisible !== false)
                        .map((skill, index) => (
                          <Text
                            key={index}
                            style={{
                              fontSize: 9,
                              backgroundColor: styles.colors?.primary + "25",
                              padding: 3,
                              borderRadius: 2,
                              marginRight: 3,
                              marginBottom: 3,
                            }}
                          >
                            {skill.name || skill.skillName}
                          </Text>
                        ))}
                    </View>
                  </View>
                )}

                {/* Languages section if available */}
                {languages && languages.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        fontSize: 12,
                        borderBottomWidth: 0,
                        backgroundColor: styles.colors?.primary,
                        color: "white",
                        padding: 3,
                        textAlign: "center",
                        borderRadius: 3,
                      }}
                    >
                      LANGUAGES
                    </Text>
                    <View style={{ marginTop: 5 }}>
                      {languages
                        .filter((lang) => lang.isVisible !== false)
                        .map((lang, index) => (
                          <Text
                            key={index}
                            style={{
                              fontSize: 9,
                              marginBottom: 2,
                            }}
                          >
                            {lang.language}
                            {lang.proficiency ? `: ${lang.proficiency}` : ""}
                          </Text>
                        ))}
                    </View>
                  </View>
                )}
              </View>

              {/* Right column for main content */}
              <View
                style={{
                  ...styles.rightColumn,
                  paddingLeft: 15,
                }}
              >
                {/* Professional Summary */}
                {profileSummary && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        borderBottomColor: styles.colors?.primary,
                        borderBottomWidth: 1,
                      }}
                    >
                      PROFESSIONAL SUMMARY
                    </Text>
                    <Text
                      style={{
                        ...styles.description,
                        marginTop: 5,
                      }}
                    >
                      {profileSummary.content}
                    </Text>
                  </View>
                )}

                {/* Experience section */}
                {experience && experience.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        borderBottomColor: styles.colors?.primary,
                        borderBottomWidth: 1,
                      }}
                    >
                      EXPERIENCE
                    </Text>
                    {experience
                      .filter((exp) => exp.isVisible !== false)
                      .map((exp, index) => (
                        <View
                          key={index}
                          style={{
                            marginBottom: 10,
                            marginTop: 5,
                          }}
                        >
                          <View style={styles.experienceHeader}>
                            <Text
                              style={{
                                ...styles.experienceTitle,
                                color: styles.colors?.secondary,
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
                            style={{
                              ...styles.companyName,
                              fontWeight: "medium",
                            }}
                          >
                            {exp.company || exp.companyName || "Company"}
                          </Text>
                          <Text style={{ ...styles.description, marginTop: 2 }}>
                            {exp.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Education section */}
                {education && education.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        borderBottomColor: styles.colors?.primary,
                        borderBottomWidth: 1,
                      }}
                    >
                      EDUCATION
                    </Text>
                    {education
                      .filter((edu) => edu.isVisible !== false)
                      .map((edu, index) => (
                        <View
                          key={index}
                          style={{
                            marginBottom: 8,
                            marginTop: 5,
                          }}
                        >
                          <View style={styles.educationHeader}>
                            <Text
                              style={{
                                ...styles.degree,
                                color: styles.colors?.secondary,
                                fontWeight: "bold",
                              }}
                            >
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
                          {edu.description && (
                            <Text
                              style={{ ...styles.description, marginTop: 2 }}
                            >
                              {edu.description}
                            </Text>
                          )}
                        </View>
                      ))}
                  </View>
                )}

                {/* Projects section */}
                {projects && projects.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        borderBottomColor: styles.colors?.primary,
                        borderBottomWidth: 1,
                      }}
                    >
                      PROJECTS
                    </Text>
                    {projects
                      .filter((project) => project.isVisible !== false)
                      .map((project, index) => (
                        <View
                          key={index}
                          style={{
                            marginBottom: 8,
                            marginTop: 5,
                          }}
                        >
                          <View style={styles.experienceHeader}>
                            <Text
                              style={{
                                ...styles.experienceTitle,
                                color: styles.colors?.secondary,
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
                          {project.url && (
                            <Link
                              src={project.url}
                              style={{
                                ...styles.link,
                                fontSize: 9,
                              }}
                            >
                              {project.url.replace(/(^\w+:|^)\/\//, "")}
                            </Link>
                          )}
                          <Text style={{ ...styles.description, marginTop: 2 }}>
                            {project.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            </View>
          </>
        );

      case "ProfessionalTwoColumn":
        // Professional two-column layout with balanced design
        return (
          <>
            {/* Header section with name and title */}
            <View
              style={{
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  ...styles.name,
                  fontSize: 22,
                  color: styles.colors?.primary,
                  textAlign: "center",
                }}
              >
                {personal.name || "YOUR NAME"}
              </Text>
              {personal.title && (
                <Text
                  style={{
                    ...styles.title,
                    fontSize: 12,
                    textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  {personal.title}
                </Text>
              )}

              {/* Contact info in a row */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {personal.email && (
                  <Text
                    style={{
                      fontSize: 9,
                      margin: 3,
                    }}
                  >
                    {personal.email}
                  </Text>
                )}
                {personal.phone && (
                  <Text
                    style={{
                      fontSize: 9,
                      margin: 3,
                    }}
                  >
                    {personal.phone}
                  </Text>
                )}
                {personal.location && (
                  <Text
                    style={{
                      fontSize: 9,
                      margin: 3,
                    }}
                  >
                    {personal.location}
                  </Text>
                )}
                {personal.linkedin && (
                  <Link
                    src={personal.linkedin}
                    style={{
                      fontSize: 9,
                      margin: 3,
                      color: styles.colors?.primary,
                    }}
                  >
                    LinkedIn
                  </Link>
                )}
                {personal.github && (
                  <Link
                    src={personal.github}
                    style={{
                      fontSize: 9,
                      margin: 3,
                      color: styles.colors?.primary,
                    }}
                  >
                    GitHub
                  </Link>
                )}
              </View>
            </View>

            {/* Horizontal line */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: styles.colors?.primary,
                marginBottom: 15,
              }}
            />

            {/* Two column content */}
            <View
              style={{
                ...styles.twoColumnLayout,
                justifyContent: "space-between",
              }}
            >
              {/* Left column for summary, skills, education, certifications */}
              <View
                style={{
                  width: "40%",
                  paddingRight: 15,
                }}
              >
                {/* Professional Summary */}
                {profileSummary && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary,
                      }}
                    >
                      PROFILE
                    </Text>
                    <Text
                      style={{
                        ...styles.description,
                        marginTop: 5,
                      }}
                    >
                      {profileSummary.content}
                    </Text>
                  </View>
                )}

                {/* Skills section */}
                {skills && skills.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary,
                      }}
                    >
                      SKILLS
                    </Text>
                    <View style={{ marginTop: 5 }}>
                      {skills
                        .filter((skill) => skill.isVisible !== false)
                        .map((skill, index) => (
                          <Text
                            key={index}
                            style={{
                              fontSize: 9,
                              marginBottom: 2,
                            }}
                          >
                            • {skill.name || skill.skillName}
                          </Text>
                        ))}
                    </View>
                  </View>
                )}

                {/* Education section */}
                {education && education.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary,
                      }}
                    >
                      EDUCATION
                    </Text>
                    {education
                      .filter((edu) => edu.isVisible !== false)
                      .map((edu, index) => (
                        <View
                          key={index}
                          style={{
                            marginBottom: 8,
                            marginTop: 5,
                          }}
                        >
                          <Text
                            style={{ ...styles.degree, fontWeight: "bold" }}
                          >
                            {edu.degree || "Degree"}
                            {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                          </Text>
                          <Text style={styles.institution}>
                            {edu.institution || "Institution"}
                            {edu.location ? `, ${edu.location}` : ""}
                          </Text>
                          <Text style={{ fontSize: 8, marginTop: 2 }}>
                            {formatDateRange(
                              edu.startDate,
                              edu.endDate,
                              edu.isCurrentlyStudying
                            ) || edu.graduationYear}
                          </Text>
                          {edu.description && (
                            <Text
                              style={{ ...styles.description, marginTop: 2 }}
                            >
                              {edu.description}
                            </Text>
                          )}
                        </View>
                      ))}
                  </View>
                )}

                {/* Certifications section if available */}
                {certifications && certifications.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary,
                      }}
                    >
                      CERTIFICATIONS
                    </Text>
                    {certifications
                      .filter((cert) => cert.isVisible !== false)
                      .map((cert, index) => (
                        <View
                          key={index}
                          style={{
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 10,
                            }}
                          >
                            {cert.name}
                          </Text>
                          <Text style={{ fontSize: 9 }}>
                            {cert.issuer}
                            {cert.date ? ` (${cert.date})` : ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Languages section if available */}
                {languages && languages.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary,
                      }}
                    >
                      LANGUAGES
                    </Text>
                    {languages
                      .filter((lang) => lang.isVisible !== false)
                      .map((lang, index) => (
                        <Text
                          key={index}
                          style={{
                            fontSize: 9,
                            marginBottom: 2,
                          }}
                        >
                          {lang.language}
                          {lang.proficiency ? ` - ${lang.proficiency}` : ""}
                        </Text>
                      ))}
                  </View>
                )}
              </View>

              {/* Right column for experience, projects, achievements */}
              <View
                style={{
                  width: "60%",
                  paddingLeft: 15,
                  borderLeftWidth: 1,
                  borderLeftColor: styles.colors?.primary + "50", // Lighter version of primary
                }}
              >
                {/* Experience section */}
                {experience && experience.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary,
                      }}
                    >
                      PROFESSIONAL EXPERIENCE
                    </Text>
                    {experience
                      .filter((exp) => exp.isVisible !== false)
                      .map((exp, index) => (
                        <View
                          key={index}
                          style={{
                            marginBottom: 10,
                            marginTop: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 11,
                            }}
                          >
                            {exp.position || exp.jobTitle || "Position"}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 2,
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "medium",
                                fontSize: 10,
                              }}
                            >
                              {exp.company || exp.companyName || "Company"}
                              {exp.location ? `, ${exp.location}` : ""}
                            </Text>
                            <Text style={{ fontSize: 9 }}>
                              {formatDateRange(
                                exp.startDate,
                                exp.endDate,
                                exp.isCurrentlyWorking
                              )}
                            </Text>
                          </View>
                          <Text style={{ ...styles.description, marginTop: 2 }}>
                            {exp.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Projects section */}
                {projects && projects.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary,
                      }}
                    >
                      PROJECTS
                    </Text>
                    {projects
                      .filter((project) => project.isVisible !== false)
                      .map((project, index) => (
                        <View
                          key={index}
                          style={{
                            marginBottom: 8,
                            marginTop: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 11,
                            }}
                          >
                            {project.name || project.title || "Project"}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 2,
                            }}
                          >
                            {project.url ? (
                              <Link
                                src={project.url}
                                style={{
                                  fontSize: 9,
                                  color: styles.colors?.primary,
                                }}
                              >
                                {project.url.replace(/(^\w+:|^)\/\//, "")}
                              </Link>
                            ) : (
                              <View />
                            )}
                            <Text style={{ fontSize: 9 }}>
                              {formatDateRange(
                                project.startDate,
                                project.endDate,
                                project.isOngoing
                              )}
                            </Text>
                          </View>
                          <Text style={{ ...styles.description, marginTop: 2 }}>
                            {project.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Achievements section if available */}
                {achievements && achievements.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary + "30",
                        paddingBottom: 2,
                        marginBottom: 10,
                        marginTop: 5,
                      }}
                    >
                      ACHIEVEMENTS
                    </Text>

                    <View style={{ paddingHorizontal: 5 }}>
                      {achievements
                        .filter(
                          (achievement) => achievement.isVisible !== false
                        )
                        .map((achievement, index) => (
                          <View
                            key={index}
                            style={{
                              flexDirection: "row",
                              marginBottom: 3,
                            }}
                          >
                            <Text style={{ fontSize: 9, marginRight: 5 }}>
                              •
                            </Text>
                            <Text style={{ fontSize: 9, flex: 1 }}>
                              <Text style={{ fontWeight: "bold" }}>
                                {achievement.title}
                              </Text>
                              {achievement.description
                                ? `: ${achievement.description}`
                                : ""}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </>
        );

      case "ElegantTwoColumn":
        // Elegant two-column layout with clean design
        return (
          <>
            {/* Left column for personal info and skills */}
            <View style={styles.twoColumnLayout}>
              <View
                style={{
                  width: "30%",
                  backgroundColor: styles.colors?.primary,
                  padding: 10,
                  color: "white",
                }}
              >
                {/* Personal info */}
                <View
                  style={{
                    marginBottom: 15,
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "white",
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      ...styles.name,
                      fontSize: 18,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {personal.name || "YOUR NAME"}
                  </Text>
                  {personal.title && (
                    <Text
                      style={{
                        ...styles.title,
                        fontSize: 11,
                        color: "white",
                        textAlign: "center",
                        marginTop: 5,
                      }}
                    >
                      {personal.title}
                    </Text>
                  )}
                </View>

                {/* Contact info */}
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      color: "white",
                      borderBottomColor: "white",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    CONTACT
                  </Text>
                  <View style={{ marginTop: 8 }}>
                    {personal.email && (
                      <Text
                        style={{ fontSize: 9, color: "white", marginBottom: 4 }}
                      >
                        Email: {personal.email}
                      </Text>
                    )}
                    {personal.phone && (
                      <Text
                        style={{ fontSize: 9, color: "white", marginBottom: 4 }}
                      >
                        Phone: {personal.phone}
                      </Text>
                    )}
                    {personal.location && (
                      <Text
                        style={{ fontSize: 9, color: "white", marginBottom: 4 }}
                      >
                        Location: {personal.location}
                      </Text>
                    )}
                    {personal.linkedin && (
                      <Link
                        src={personal.linkedin}
                        style={{ fontSize: 9, color: "white", marginBottom: 4 }}
                      >
                        LinkedIn:{" "}
                        {personal.linkedin.replace(/(^\w+:|^)\/\//, "")}
                      </Link>
                    )}
                    {personal.github && (
                      <Link
                        src={personal.github}
                        style={{ fontSize: 9, color: "white", marginBottom: 4 }}
                      >
                        GitHub: {personal.github.replace(/(^\w+:|^)\/\//, "")}
                      </Link>
                    )}
                    {personal.website && (
                      <Link
                        src={personal.website}
                        style={{ fontSize: 9, color: "white", marginBottom: 4 }}
                      >
                        Website: {personal.website.replace(/(^\w+:|^)\/\//, "")}
                      </Link>
                    )}
                  </View>
                </View>

                {/* Skills section */}
                {skills && skills.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: "white",
                        borderBottomColor: "white",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      SKILLS
                    </Text>
                    <View style={{ marginTop: 8 }}>
                      {skills
                        .filter((skill) => skill.isVisible !== false)
                        .map((skill, index) => (
                          <Text
                            key={index}
                            style={{
                              fontSize: 9,
                              color: "white",
                              marginBottom: 4,
                            }}
                          >
                            • {skill.name || skill.skillName}
                          </Text>
                        ))}
                    </View>
                  </View>
                )}

                {/* Languages section */}
                {languages && languages.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: "white",
                        borderBottomColor: "white",
                        fontSize: 12,
                        textAlign: "center",
                      }}
                    >
                      LANGUAGES
                    </Text>
                    <View style={{ marginTop: 8 }}>
                      {languages
                        .filter((language) => language.isVisible !== false)
                        .map((language, index) => (
                          <Text
                            key={index}
                            style={{
                              fontSize: 9,
                              color: "white",
                              marginBottom: 4,
                            }}
                          >
                            • {language.language}{" "}
                            {language.proficiency
                              ? `(${language.proficiency})`
                              : ""}
                          </Text>
                        ))}
                    </View>
                  </View>
                )}
              </View>

              {/* Right column for main content */}
              <View
                style={{
                  width: "70%",
                  padding: 10,
                }}
              >
                {/* Professional Summary */}
                {profileSummary && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontSize: 14,
                      }}
                    >
                      PROFESSIONAL SUMMARY
                    </Text>
                    <Text style={{ ...styles.description, marginTop: 5 }}>
                      {profileSummary.content}
                    </Text>
                  </View>
                )}

                {/* Experience section */}
                {experience && experience.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontSize: 14,
                      }}
                    >
                      PROFESSIONAL EXPERIENCE
                    </Text>
                    {experience
                      .filter((exp) => exp.isVisible !== false)
                      .map((exp, index) => (
                        <View
                          key={index}
                          style={{ marginBottom: 10, marginTop: 5 }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 11,
                              color: styles.colors?.primary,
                            }}
                          >
                            {exp.position || exp.jobTitle || "Position"}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{ fontWeight: "medium", fontSize: 10 }}
                            >
                              {exp.company || exp.companyName || "Company"}
                              {exp.location ? `, ${exp.location}` : ""}
                            </Text>
                            <Text style={{ fontSize: 9 }}>
                              {formatDateRange(
                                exp.startDate,
                                exp.endDate,
                                exp.isCurrentlyWorking
                              )}
                            </Text>
                          </View>
                          <Text style={{ ...styles.description, marginTop: 3 }}>
                            {exp.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Education section */}
                {education && education.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontSize: 14,
                      }}
                    >
                      EDUCATION
                    </Text>
                    {education
                      .filter((edu) => edu.isVisible !== false)
                      .map((edu, index) => (
                        <View
                          key={index}
                          style={{ marginBottom: 8, marginTop: 5 }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 11,
                              color: styles.colors?.primary,
                            }}
                          >
                            {edu.degree || "Degree"}
                            {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ fontSize: 10 }}>
                              {edu.institution || "Institution"}
                              {edu.location ? `, ${edu.location}` : ""}
                            </Text>
                            <Text style={{ fontSize: 9 }}>
                              {formatDateRange(
                                edu.startDate,
                                edu.endDate,
                                edu.isCurrentlyStudying
                              ) || edu.graduationYear}
                            </Text>
                          </View>
                          {edu.description && (
                            <Text
                              style={{ ...styles.description, marginTop: 3 }}
                            >
                              {edu.description}
                            </Text>
                          )}
                        </View>
                      ))}
                  </View>
                )}

                {/* Projects section */}
                {projects && projects.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        color: styles.colors?.primary,
                        fontSize: 14,
                      }}
                    >
                      PROJECTS
                    </Text>
                    {projects
                      .filter((project) => project.isVisible !== false)
                      .map((project, index) => (
                        <View
                          key={index}
                          style={{ marginBottom: 8, marginTop: 5 }}
                        >
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 11,
                              color: styles.colors?.primary,
                            }}
                          >
                            {project.name || project.title || "Project"}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            {project.url ? (
                              <Link
                                src={project.url}
                                style={{
                                  fontSize: 9,
                                  color: styles.colors?.accent,
                                }}
                              >
                                {project.url.replace(/(^\w+:|^)\/\//, "")}
                              </Link>
                            ) : (
                              <View />
                            )}
                            <Text style={{ fontSize: 9 }}>
                              {formatDateRange(
                                project.startDate,
                                project.endDate,
                                project.isOngoing
                              )}
                            </Text>
                          </View>
                          <Text style={{ ...styles.description, marginTop: 3 }}>
                            {project.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            </View>
          </>
        );

      case "ModernSplit":
        // Modern Split layout with horizontal header and two columns below
        return (
          <>
            {/* Header section with name and contact info */}
            <View
              style={{
                marginBottom: 15,
                borderBottomWidth: 2,
                borderBottomColor: styles.colors?.primary,
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      ...styles.name,
                      fontSize: 24,
                      color: styles.colors?.primary,
                    }}
                  >
                    {personal.name || "YOUR NAME"}
                  </Text>
                  {personal.title && (
                    <Text
                      style={{
                        ...styles.title,
                        fontSize: 12,
                        marginTop: 2,
                      }}
                    >
                      {personal.title}
                    </Text>
                  )}
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  {personal.email && (
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>
                      {personal.email}
                    </Text>
                  )}
                  {personal.phone && (
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>
                      {personal.phone}
                    </Text>
                  )}
                  {personal.location && (
                    <Text style={{ fontSize: 9, marginBottom: 2 }}>
                      {personal.location}
                    </Text>
                  )}
                  <View style={{ flexDirection: "row", marginTop: 2 }}>
                    {personal.linkedin && (
                      <Link
                        src={personal.linkedin}
                        style={{
                          fontSize: 9,
                          color: styles.colors?.accent,
                          marginRight: 10,
                        }}
                      >
                        LinkedIn
                      </Link>
                    )}
                    {personal.github && (
                      <Link
                        src={personal.github}
                        style={{
                          fontSize: 9,
                          color: styles.colors?.accent,
                          marginRight: 10,
                        }}
                      >
                        GitHub
                      </Link>
                    )}
                    {personal.website && (
                      <Link
                        src={personal.website}
                        style={{ fontSize: 9, color: styles.colors?.accent }}
                      >
                        Website
                      </Link>
                    )}
                  </View>
                </View>
              </View>
            </View>

            {/* Two column layout for content */}
            <View style={styles.twoColumnLayout}>
              {/* Left column */}
              <View
                style={{
                  width: "32%",
                  paddingRight: 15,
                }}
              >
                {/* Profile Summary */}
                {profileSummary && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        fontSize: 12,
                        color: styles.colors?.primary,
                        paddingBottom: 5,
                        marginBottom: 5,
                      }}
                    >
                      PROFILE
                    </Text>
                    <Text style={{ fontSize: 9, lineHeight: 1.4 }}>
                      {profileSummary.content}
                    </Text>
                  </View>
                )}

                {/* Skills section */}
                {skills && skills.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        fontSize: 12,
                        color: styles.colors?.primary,
                        paddingBottom: 5,
                        marginBottom: 5,
                      }}
                    >
                      SKILLS
                    </Text>
                    <View>
                      {skills
                        .filter((skill) => skill.isVisible !== false)
                        .map((skill, index) => (
                          <View
                            key={index}
                            style={{
                              marginBottom: 4,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                width: 5,
                                height: 5,
                                borderRadius: 2.5,
                                backgroundColor: styles.colors?.primary,
                                marginRight: 5,
                              }}
                            />
                            <Text style={{ fontSize: 9 }}>
                              {skill.name || skill.skillName}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>
                )}

                {/* Education section */}
                {education && education.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        fontSize: 12,
                        color: styles.colors?.primary,
                        paddingBottom: 5,
                        marginBottom: 5,
                      }}
                    >
                      EDUCATION
                    </Text>
                    {education
                      .filter((edu) => edu.isVisible !== false)
                      .map((edu, index) => (
                        <View key={index} style={{ marginBottom: 6 }}>
                          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                            {edu.degree || "Degree"}
                            {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                          </Text>
                          <Text style={{ fontSize: 8 }}>
                            {edu.institution || "Institution"}
                            {edu.location ? `, ${edu.location}` : ""}
                          </Text>
                          <Text
                            style={{
                              fontSize: 8,
                              fontStyle: "italic",
                              marginTop: 1,
                            }}
                          >
                            {formatDateRange(
                              edu.startDate,
                              edu.endDate,
                              edu.isCurrentlyStudying
                            ) || edu.graduationYear}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Languages section */}
                {languages && languages.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        fontSize: 12,
                        color: styles.colors?.primary,
                        paddingBottom: 5,
                        marginBottom: 5,
                      }}
                    >
                      LANGUAGES
                    </Text>
                    <View style={{ marginTop: 5 }}>
                      {languages
                        .filter((lang) => lang.isVisible !== false)
                        .map((lang, index) => (
                          <View
                            key={index}
                            style={{
                              marginBottom: 3,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ fontSize: 9 }}>{lang.language}</Text>
                            {lang.proficiency && (
                              <Text
                                style={{ fontSize: 8, fontStyle: "italic" }}
                              >
                                {lang.proficiency}
                              </Text>
                            )}
                          </View>
                        ))}
                    </View>
                  </View>
                )}
              </View>

              {/* Right column */}
              <View
                style={{
                  width: "68%",
                  paddingLeft: 15,
                  borderLeftWidth: 1,
                  borderLeftColor: styles.colors?.primary + "40",
                }}
              >
                {/* Experience section */}
                {experience && experience.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        fontSize: 12,
                        color: styles.colors?.primary,
                        paddingBottom: 5,
                        marginBottom: 5,
                      }}
                    >
                      PROFESSIONAL EXPERIENCE
                    </Text>
                    {experience
                      .filter((exp) => exp.isVisible !== false)
                      .map((exp, index) => (
                        <View key={index} style={{ marginBottom: 8 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 10,
                                fontWeight: "bold",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {exp.position || exp.jobTitle || "Position"}
                            </Text>
                            <Text style={{ fontSize: 8, fontStyle: "italic" }}>
                              {formatDateRange(
                                exp.startDate,
                                exp.endDate,
                                exp.isCurrentlyWorking
                              )}
                            </Text>
                          </View>
                          <Text style={{ fontSize: 9, marginBottom: 2 }}>
                            {exp.company || exp.companyName || "Company"}
                            {exp.location ? ` | ${exp.location}` : ""}
                          </Text>
                          <Text style={{ fontSize: 9, lineHeight: 1.4 }}>
                            {exp.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Projects section */}
                {projects && projects.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        fontSize: 12,
                        color: styles.colors?.primary,
                        paddingBottom: 5,
                        marginBottom: 5,
                      }}
                    >
                      PROJECTS
                    </Text>
                    {projects
                      .filter((project) => project.isVisible !== false)
                      .map((project, index) => (
                        <View key={index} style={{ marginBottom: 8 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 10,
                                fontWeight: "bold",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {project.name || project.title || "Project"}
                            </Text>
                            <Text style={{ fontSize: 8, fontStyle: "italic" }}>
                              {formatDateRange(
                                project.startDate,
                                project.endDate,
                                project.isOngoing
                              )}
                            </Text>
                          </View>
                          {project.url && (
                            <Link
                              src={project.url}
                              style={{
                                fontSize: 8,
                                color: styles.colors?.accent,
                                marginBottom: 2,
                              }}
                            >
                              {project.url.replace(/(^\w+:|^)\/\//, "")}
                            </Link>
                          )}
                          <Text style={{ fontSize: 9, lineHeight: 1.4 }}>
                            {project.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Certifications section */}
                {certifications && certifications.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        fontSize: 12,
                        color: styles.colors?.primary,
                        paddingBottom: 5,
                        marginBottom: 5,
                      }}
                    >
                      CERTIFICATIONS
                    </Text>
                    {certifications
                      .filter((cert) => cert.isVisible !== false)
                      .map((cert, index) => (
                        <View key={index} style={{ marginBottom: 5 }}>
                          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                            {cert.name ||
                              cert.certificationName ||
                              "Certification"}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ fontSize: 8 }}>
                              {cert.issuer ||
                                cert.issuingOrganization ||
                                "Issuer"}
                            </Text>
                            <Text style={{ fontSize: 8, fontStyle: "italic" }}>
                              {formatDate(
                                cert.issueDate || cert.dateObtained || cert.date
                              )}
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            </View>
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
                      {edu.description && (
                        <Text style={{ ...styles.description, marginTop: 2 }}>
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
                      {project.url && (
                        <Link
                          src={project.url}
                          style={{
                            ...styles.link,
                            fontSize: 9,
                          }}
                        >
                          {project.url.replace(/(^\w+:|^)\/\//, "")}
                        </Link>
                      )}
                      <Text style={{ ...styles.description, marginTop: 2 }}>
                        {project.description || ""}
                      </Text>
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

      case "CreativeTwoColumn":
        // Creative layout with accent colored left sidebar and modern typography
        return (
          <>
            <View style={styles.twoColumnLayout}>
              {/* Left column with accent color background */}
              <View
                style={{
                  width: "35%",
                  backgroundColor: styles.colors?.accent,
                  padding: 12,
                  color: "white",
                }}
              >
                {/* Personal info with photo placeholder */}
                <View
                  style={{
                    marginBottom: 20,
                    alignItems: "center",
                  }}
                >
                  {/* Photo placeholder - circle */}
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: "white",
                      marginBottom: 10,
                    }}
                  />

                  <Text
                    style={{
                      ...styles.name,
                      fontSize: 16,
                      color: "white",
                      textAlign: "center",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}
                  >
                    {personal.name || "YOUR NAME"}
                  </Text>
                  {personal.title && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "white",
                        textAlign: "center",
                        marginTop: 3,
                      }}
                    >
                      {personal.title}
                    </Text>
                  )}
                </View>

                {/* About section - using profile summary */}
                {profileSummary && (
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: 5,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        paddingBottom: 3,
                      }}
                    >
                      About Me
                    </Text>
                    <Text
                      style={{
                        fontSize: 9,
                        color: "white",
                        lineHeight: 1.5,
                        textAlign: "justify",
                      }}
                    >
                      {profileSummary.content}
                    </Text>
                  </View>
                )}

                {/* Contact info */}
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "white",
                      fontWeight: "bold",
                      marginBottom: 5,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      borderBottomWidth: 1,
                      borderBottomColor: "white",
                      paddingBottom: 3,
                    }}
                  >
                    Contact
                  </Text>

                  <View style={{ marginTop: 5 }}>
                    {personal.email && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <View style={{ width: 12, marginRight: 5 }}>
                          <Text style={{ color: "white", fontSize: 10 }}>
                            @
                          </Text>
                        </View>
                        <Text style={{ fontSize: 9, color: "white" }}>
                          {personal.email}
                        </Text>
                      </View>
                    )}
                    {personal.phone && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <View style={{ width: 12, marginRight: 5 }}>
                          <Text style={{ color: "white", fontSize: 10 }}>
                            ✆
                          </Text>
                        </View>
                        <Text style={{ fontSize: 9, color: "white" }}>
                          {personal.phone}
                        </Text>
                      </View>
                    )}
                    {personal.location && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <View style={{ width: 12, marginRight: 5 }}>
                          <Text style={{ color: "white", fontSize: 10 }}>
                            ⌖
                          </Text>
                        </View>
                        <Text style={{ fontSize: 9, color: "white" }}>
                          {personal.location}
                        </Text>
                      </View>
                    )}
                    {personal.linkedin && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <View style={{ width: 12, marginRight: 5 }}>
                          <Text style={{ color: "white", fontSize: 10 }}>
                            in
                          </Text>
                        </View>
                        <Link
                          src={personal.linkedin}
                          style={{ fontSize: 9, color: "white" }}
                        >
                          LinkedIn
                        </Link>
                      </View>
                    )}
                    {personal.github && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <View style={{ width: 12, marginRight: 5 }}>
                          <Text style={{ color: "white", fontSize: 10 }}>
                            ⊥
                          </Text>
                        </View>
                        <Link
                          src={personal.github}
                          style={{ fontSize: 9, color: "white" }}
                        >
                          GitHub
                        </Link>
                      </View>
                    )}
                  </View>
                </View>

                {/* Skills with visual indicators */}
                {skills && skills.length > 0 && (
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: 5,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        paddingBottom: 3,
                      }}
                    >
                      Skills
                    </Text>

                    <View style={{ marginTop: 5 }}>
                      {skills
                        .filter((skill) => skill.isVisible !== false)
                        .map((skill, index) => (
                          <View key={index} style={{ marginBottom: 5 }}>
                            <Text
                              style={{
                                fontSize: 9,
                                color: "white",
                                marginBottom: 2,
                              }}
                            >
                              {skill.name || skill.skillName}
                            </Text>
                            <View
                              style={{
                                height: 3,
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                width: "100%",
                              }}
                            >
                              <View
                                style={{
                                  height: 3,
                                  backgroundColor: "white",
                                  width: skill.level
                                    ? `${parseInt(skill.level) || 80}%`
                                    : "80%",
                                }}
                              />
                            </View>
                          </View>
                        ))}
                    </View>
                  </View>
                )}

                {/* Languages with visual indicators */}
                {languages && languages.length > 0 && (
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: 5,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        paddingBottom: 3,
                      }}
                    >
                      Languages
                    </Text>

                    <View style={{ marginTop: 5 }}>
                      {languages
                        .filter((lang) => lang.isVisible !== false)
                        .map((lang, index) => (
                          <View
                            key={index}
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 3,
                            }}
                          >
                            <Text style={{ fontSize: 9, color: "white" }}>
                              {lang.language}
                            </Text>
                            <Text style={{ fontSize: 8, color: "white" }}>
                              {lang.proficiency || "Proficient"}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>
                )}
              </View>

              {/* Right column for professional experience and education */}
              <View
                style={{
                  width: "65%",
                  padding: 12,
                  backgroundColor: "white",
                }}
              >
                {/* Experience section */}
                {experience && experience.length > 0 && (
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: styles.colors?.accent,
                        fontWeight: "bold",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.accent,
                        paddingBottom: 3,
                      }}
                    >
                      Experience
                    </Text>

                    {experience
                      .filter((exp) => exp.isVisible !== false)
                      .map((exp, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {exp.position || exp.jobTitle || "Position"}
                            </Text>
                            <Text
                              style={{
                                fontSize: 9,
                                fontStyle: "italic",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {formatDateRange(
                                exp.startDate,
                                exp.endDate,
                                exp.isCurrentlyWorking
                              )}
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 11,
                              color: styles.colors?.accent,
                              marginBottom: 3,
                            }}
                          >
                            {exp.company || exp.companyName || "Company"}
                            {exp.location ? ` · ${exp.location}` : ""}
                          </Text>

                          <Text style={{ fontSize: 9, lineHeight: 1.5 }}>
                            {exp.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Education section */}
                {education && education.length > 0 && (
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: styles.colors?.accent,
                        fontWeight: "bold",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.accent,
                        paddingBottom: 3,
                      }}
                    >
                      Education
                    </Text>

                    {education
                      .filter((edu) => edu.isVisible !== false)
                      .map((edu, index) => (
                        <View key={index} style={{ marginBottom: 8 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {edu.degree || "Degree"}
                              {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                            </Text>
                            <Text
                              style={{
                                fontSize: 9,
                                fontStyle: "italic",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {formatDateRange(
                                edu.startDate,
                                edu.endDate,
                                edu.isCurrentlyStudying
                              ) || edu.graduationYear}
                            </Text>
                          </View>

                          <Text
                            style={{
                              fontSize: 11,
                              color: styles.colors?.accent,
                              marginBottom: 3,
                            }}
                          >
                            {edu.institution || "Institution"}
                            {edu.location ? ` · ${edu.location}` : ""}
                          </Text>

                          {edu.description && (
                            <Text style={{ fontSize: 9, lineHeight: 1.5 }}>
                              {edu.description}
                            </Text>
                          )}
                        </View>
                      ))}
                  </View>
                )}

                {/* Projects section */}
                {projects && projects.length > 0 && (
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: styles.colors?.accent,
                        fontWeight: "bold",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.accent,
                        paddingBottom: 3,
                      }}
                    >
                      Projects
                    </Text>

                    {projects
                      .filter((project) => project.isVisible !== false)
                      .map((project, index) => (
                        <View key={index} style={{ marginBottom: 8 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {project.name || project.title || "Project"}
                            </Text>
                            <Text
                              style={{
                                fontSize: 9,
                                fontStyle: "italic",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {formatDateRange(
                                project.startDate,
                                project.endDate,
                                project.isOngoing
                              )}
                            </Text>
                          </View>

                          {project.url && (
                            <Link
                              src={project.url}
                              style={{
                                fontSize: 9,
                                color: styles.colors?.accent,
                                marginBottom: 3,
                              }}
                            >
                              {project.url.replace(/(^\w+:|^)\/\//, "")}
                            </Link>
                          )}

                          <Text style={{ fontSize: 9, lineHeight: 1.5 }}>
                            {project.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Certifications as badges */}
                {certifications && certifications.length > 0 && (
                  <View style={{ marginBottom: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: styles.colors?.accent,
                        fontWeight: "bold",
                        marginBottom: 8,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.accent,
                        paddingBottom: 3,
                      }}
                    >
                      Certifications
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: 5,
                      }}
                    >
                      {certifications
                        .filter((cert) => cert.isVisible !== false)
                        .map((cert, index) => (
                          <View
                            key={index}
                            style={{
                              borderWidth: 1,
                              borderColor: styles.colors?.accent,
                              borderRadius: 10,
                              padding: 5,
                              margin: 3,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 8,
                                fontWeight: "bold",
                                color: styles.colors?.accent,
                                textAlign: "center",
                              }}
                            >
                              {cert.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 7,
                                color: styles.colors?.text,
                                textAlign: "center",
                              }}
                            >
                              {cert.issuer}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </>
        );

      case "ExecutiveTwoColumn":
        // Executive two-column layout with sophisticated typography and subtle accents
        return (
          <>
            {/* Header with name, contact info in single line to maximize space */}
            <View
              style={{
                marginBottom: 12,
                borderBottomWidth: 1,
                borderBottomColor: styles.colors?.primary,
                paddingBottom: 8,
              }}
            >
              <Text
                style={{
                  ...styles.name,
                  fontSize: 20,
                  color: styles.colors?.primary,
                  textAlign: "center",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                {personal.name || "YOUR NAME"}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: 5,
                }}
              >
                {personal.email && (
                  <Text style={{ fontSize: 8, margin: "0 3px" }}>
                    {personal.email}
                  </Text>
                )}
                {personal.phone && (
                  <Text style={{ fontSize: 8, margin: "0 3px" }}>
                    • {personal.phone}
                  </Text>
                )}
                {personal.location && (
                  <Text style={{ fontSize: 8, margin: "0 3px" }}>
                    • {personal.location}
                  </Text>
                )}
                {personal.linkedin && (
                  <Link
                    src={personal.linkedin}
                    style={{
                      fontSize: 8,
                      color: styles.colors?.primary,
                      margin: "0 3px",
                    }}
                  >
                    • LinkedIn
                  </Link>
                )}
              </View>
            </View>

            {/* Two column layout */}
            <View style={styles.twoColumnLayout}>
              {/* Left column */}
              <View
                style={{
                  width: "28%",
                  paddingRight: 12,
                  borderRightWidth: 1,
                  borderRightColor: styles.colors?.primary + "30",
                }}
              >
                {/* Profile Summary */}
                {profileSummary && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary + "30",
                        paddingBottom: 2,
                        marginBottom: 5,
                      }}
                    >
                      PROFILE
                    </Text>
                    <Text style={{ fontSize: 9, lineHeight: 1.4 }}>
                      {profileSummary.content}
                    </Text>
                  </View>
                )}

                {/* Competencies / Skills section */}
                {skills && skills.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary + "30",
                        paddingBottom: 2,
                        marginBottom: 5,
                      }}
                    >
                      CORE COMPETENCIES
                    </Text>
                    <View style={{ marginTop: 2 }}>
                      {skills
                        .filter((skill) => skill.isVisible !== false)
                        .map((skill, index) => (
                          <Text
                            key={index}
                            style={{
                              fontSize: 9,
                              marginBottom: 3,
                              paddingLeft: 5,
                              borderLeftWidth: 1,
                              borderLeftColor: styles.colors?.primary,
                            }}
                          >
                            {skill.name || skill.skillName}
                          </Text>
                        ))}
                    </View>
                  </View>
                )}

                {/* Education section */}
                {education && education.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary + "30",
                        paddingBottom: 2,
                        marginBottom: 5,
                      }}
                    >
                      EDUCATION
                    </Text>
                    {education
                      .filter((edu) => edu.isVisible !== false)
                      .map((edu, index) => (
                        <View key={index} style={{ marginBottom: 5 }}>
                          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                            {edu.degree || "Degree"}
                          </Text>
                          <Text style={{ fontSize: 8 }}>
                            {edu.institution || "Institution"}
                          </Text>
                          <Text style={{ fontSize: 8, fontStyle: "italic" }}>
                            {formatDateRange(
                              edu.startDate,
                              edu.endDate,
                              edu.isCurrentlyStudying
                            ) || edu.graduationYear}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Certifications section */}
                {certifications && certifications.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary + "30",
                        paddingBottom: 2,
                        marginBottom: 5,
                      }}
                    >
                      CERTIFICATIONS
                    </Text>
                    {certifications
                      .filter((cert) => cert.isVisible !== false)
                      .map((cert, index) => (
                        <View key={index} style={{ marginBottom: 4 }}>
                          <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                            {cert.name}
                          </Text>
                          <Text style={{ fontSize: 8 }}>
                            {cert.issuer}
                            {cert.date ? ` (${cert.date})` : ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Languages section */}
                {languages && languages.length > 0 && (
                  <View style={{ marginBottom: 15 }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary + "30",
                        paddingBottom: 2,
                        marginBottom: 5,
                      }}
                    >
                      LANGUAGES
                    </Text>
                    {languages
                      .filter((lang) => lang.isVisible !== false)
                      .map((lang, index) => (
                        <Text
                          key={index}
                          style={{ fontSize: 9, marginBottom: 2 }}
                        >
                          {lang.language}
                          {lang.proficiency ? ` - ${lang.proficiency}` : ""}
                        </Text>
                      ))}
                  </View>
                )}
              </View>

              {/* Right column - professional experience */}
              <View
                style={{
                  width: "72%",
                  paddingLeft: 12,
                }}
              >
                {/* Experience Header */}
                <Text
                  style={{
                    fontSize: 11,
                    color: styles.colors?.primary,
                    fontWeight: "bold",
                    borderBottomWidth: 1,
                    borderBottomColor: styles.colors?.primary + "30",
                    paddingBottom: 2,
                    marginBottom: 10,
                  }}
                >
                  PROFESSIONAL EXPERIENCE
                </Text>

                {/* Experience items */}
                {experience &&
                  experience.length > 0 &&
                  experience
                    .filter((exp) => exp.isVisible !== false)
                    .map((exp, index) => (
                      <View key={index} style={{ marginBottom: 12 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            borderBottomWidth: 1,
                            borderBottomColor: styles.colors?.primary + "10",
                            paddingBottom: 2,
                            marginBottom: 3,
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontSize: 10,
                                fontWeight: "bold",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {exp.company || exp.companyName || "Company"}
                            </Text>
                            <Text style={{ fontSize: 9, fontStyle: "italic" }}>
                              {exp.position || exp.jobTitle || "Position"}
                            </Text>
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ fontSize: 9 }}>
                              {exp.location || ""}
                            </Text>
                            <Text style={{ fontSize: 8 }}>
                              {formatDateRange(
                                exp.startDate,
                                exp.endDate,
                                exp.isCurrentlyWorking
                              )}
                            </Text>
                          </View>
                        </View>
                        <Text style={{ fontSize: 9, lineHeight: 1.4 }}>
                          {exp.description || ""}
                        </Text>
                      </View>
                    ))}

                {/* Projects Header - if we have space and projects */}
                {projects && projects.length > 0 && (
                  <>
                    <Text
                      style={{
                        fontSize: 11,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary + "30",
                        paddingBottom: 2,
                        marginBottom: 10,
                        marginTop: 5,
                      }}
                    >
                      KEY PROJECTS
                    </Text>

                    {/* Project items */}
                    {projects
                      .filter((project) => project.isVisible !== false)
                      .map((project, index) => (
                        <View key={index} style={{ marginBottom: 8 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              borderBottomWidth: 1,
                              borderBottomColor: styles.colors?.primary + "10",
                              paddingBottom: 2,
                              marginBottom: 3,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 10,
                                fontWeight: "bold",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {project.name || project.title || "Project"}
                            </Text>
                            <Text style={{ fontSize: 8 }}>
                              {formatDateRange(
                                project.startDate,
                                project.endDate,
                                project.isOngoing
                              )}
                            </Text>
                          </View>
                          {project.url && (
                            <Link
                              src={project.url}
                              style={{
                                fontSize: 8,
                                color: styles.colors?.accent,
                              }}
                            >
                              {project.url.replace(/(^\w+:|^)\/\//, "")}
                            </Link>
                          )}
                          <Text style={{ fontSize: 9, lineHeight: 1.4 }}>
                            {project.description || ""}
                          </Text>
                        </View>
                      ))}
                  </>
                )}

                {/* Achievement section - more formal bulleted list */}
                {achievements && achievements.length > 0 && (
                  <>
                    <Text
                      style={{
                        fontSize: 11,
                        color: styles.colors?.primary,
                        fontWeight: "bold",
                        borderBottomWidth: 1,
                        borderBottomColor: styles.colors?.primary + "30",
                        paddingBottom: 2,
                        marginBottom: 10,
                        marginTop: 5,
                      }}
                    >
                      ACHIEVEMENTS
                    </Text>

                    <View style={{ paddingHorizontal: 5 }}>
                      {achievements
                        .filter(
                          (achievement) => achievement.isVisible !== false
                        )
                        .map((achievement, index) => (
                          <View
                            key={index}
                            style={{
                              flexDirection: "row",
                              marginBottom: 3,
                            }}
                          >
                            <Text style={{ fontSize: 9, marginRight: 5 }}>
                              •
                            </Text>
                            <Text style={{ fontSize: 9, flex: 1 }}>
                              <Text style={{ fontWeight: "bold" }}>
                                {achievement.title}
                              </Text>
                              {achievement.description
                                ? `: ${achievement.description}`
                                : ""}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </>
                )}
              </View>
            </View>
          </>
        );

      case "CompactTwoColumn":
        // Compact two-column layout that maximizes information density with subtle styling
        return (
          <>
            {/* Thin header with minimal styling */}
            <View
              style={{
                marginBottom: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                borderBottomWidth: 0.5,
                borderBottomColor: styles.colors?.secondary,
                paddingBottom: 3,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: styles.colors?.primary,
                  }}
                >
                  {personal.name || "YOUR NAME"}
                </Text>
                {personal.title && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: styles.colors?.secondary,
                    }}
                  >
                    {personal.title}
                  </Text>
                )}
              </View>

              <View style={{ alignItems: "flex-end" }}>
                {personal.email && (
                  <Text style={{ fontSize: 8 }}>{personal.email}</Text>
                )}
                {personal.phone && (
                  <Text style={{ fontSize: 8 }}>{personal.phone}</Text>
                )}
                {personal.location && (
                  <Text style={{ fontSize: 8 }}>{personal.location}</Text>
                )}
              </View>
            </View>

            {/* Two columns with tight spacing */}
            <View style={{ ...styles.twoColumnLayout, marginTop: 0 }}>
              {/* Left column - narrower for sidebar info */}
              <View
                style={{
                  width: "32%",
                  paddingRight: 8,
                }}
              >
                {/* Links section */}
                <View style={{ marginBottom: 8 }}>
                  {personal.linkedin && (
                    <Link
                      src={personal.linkedin}
                      style={{ fontSize: 8, color: styles.colors?.primary }}
                    >
                      LinkedIn: {personal.linkedin.replace(/(^\w+:|^)\/\//, "")}
                    </Link>
                  )}
                  {personal.github && (
                    <Link
                      src={personal.github}
                      style={{ fontSize: 8, color: styles.colors?.primary }}
                    >
                      GitHub: {personal.github.replace(/(^\w+:|^)\/\//, "")}
                    </Link>
                  )}
                  {personal.website && (
                    <Link
                      src={personal.website}
                      style={{ fontSize: 8, color: styles.colors?.primary }}
                    >
                      Website: {personal.website.replace(/(^\w+:|^)\/\//, "")}
                    </Link>
                  )}
                </View>

                {/* Skills section - tightly packed */}
                {skills && skills.length > 0 && (
                  <View style={{ marginBottom: 8 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        backgroundColor: styles.colors?.primary + "10",
                        color: styles.colors?.primary,
                        padding: 2,
                        marginBottom: 3,
                      }}
                    >
                      SKILLS
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginLeft: -2,
                        marginTop: -2,
                      }}
                    >
                      {skills
                        .filter((skill) => skill.isVisible !== false)
                        .map((skill, index) => (
                          <Text
                            key={index}
                            style={{
                              fontSize: 8,
                              backgroundColor: styles.colors?.primary + "05",
                              padding: 2,
                              margin: 2,
                              borderRadius: 2,
                            }}
                          >
                            {skill.name || skill.skillName}
                          </Text>
                        ))}
                    </View>
                  </View>
                )}

                {/* Education section */}
                {education && education.length > 0 && (
                  <View style={{ marginBottom: 8 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        backgroundColor: styles.colors?.primary + "10",
                        color: styles.colors?.primary,
                        padding: 2,
                        marginBottom: 3,
                      }}
                    >
                      EDUCATION
                    </Text>
                    {education
                      .filter((edu) => edu.isVisible !== false)
                      .map((edu, index) => (
                        <View key={index} style={{ marginBottom: 4 }}>
                          <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                            {edu.degree || "Degree"}
                          </Text>
                          <Text style={{ fontSize: 7 }}>
                            {edu.institution || "Institution"}
                            {edu.location ? `, ${edu.location}` : ""}
                          </Text>
                          <Text style={{ fontSize: 7, fontStyle: "italic" }}>
                            {formatDateRange(
                              edu.startDate,
                              edu.endDate,
                              edu.isCurrentlyStudying
                            ) || edu.graduationYear}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Certifications section */}
                {certifications && certifications.length > 0 && (
                  <View style={{ marginBottom: 8 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        backgroundColor: styles.colors?.primary + "10",
                        color: styles.colors?.primary,
                        padding: 2,
                        marginBottom: 3,
                      }}
                    >
                      CERTIFICATIONS
                    </Text>
                    {certifications
                      .filter((cert) => cert.isVisible !== false)
                      .map((cert, index) => (
                        <View key={index} style={{ marginBottom: 3 }}>
                          <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                            {cert.name}
                          </Text>
                          <Text style={{ fontSize: 7 }}>
                            {cert.issuer}
                            {cert.date ? ` (${cert.date})` : ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Languages section */}
                {languages && languages.length > 0 && (
                  <View style={{ marginBottom: 8 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        backgroundColor: styles.colors?.primary + "10",
                        color: styles.colors?.primary,
                        padding: 2,
                        marginBottom: 3,
                      }}
                    >
                      LANGUAGES
                    </Text>
                    {languages
                      .filter((lang) => lang.isVisible !== false)
                      .map((lang, index) => (
                        <Text
                          key={index}
                          style={{ fontSize: 8, marginBottom: 1 }}
                        >
                          {lang.language}
                          {lang.proficiency ? ` (${lang.proficiency})` : ""}
                        </Text>
                      ))}
                  </View>
                )}

                {/* Achievements section if needed */}
                {achievements && achievements.length > 0 && (
                  <View style={{ marginBottom: 8 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        backgroundColor: styles.colors?.primary + "10",
                        color: styles.colors?.primary,
                        padding: 2,
                        marginBottom: 3,
                      }}
                    >
                      ACHIEVEMENTS
                    </Text>
                    {achievements
                      .filter((achievement) => achievement.isVisible !== false)
                      .map((achievement, index) => (
                        <View key={index} style={{ marginBottom: 2 }}>
                          <Text style={{ fontSize: 8, fontWeight: "bold" }}>
                            {achievement.title}
                          </Text>
                          {achievement.date && (
                            <Text style={{ fontSize: 7, fontStyle: "italic" }}>
                              {achievement.date}
                            </Text>
                          )}
                          {achievement.description && (
                            <Text style={{ fontSize: 7 }}>
                              {achievement.description}
                            </Text>
                          )}
                        </View>
                      ))}
                  </View>
                )}
              </View>

              {/* Right column - main content */}
              <View
                style={{
                  width: "68%",
                  paddingLeft: 8,
                  borderLeftWidth: 0.5,
                  borderLeftColor: styles.colors?.secondary,
                }}
              >
                {/* Profile Summary */}
                {profileSummary && (
                  <View style={{ marginBottom: 10 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        backgroundColor: styles.colors?.primary + "10",
                        color: styles.colors?.primary,
                        padding: 2,
                        marginBottom: 3,
                      }}
                    >
                      PROFESSIONAL SUMMARY
                    </Text>
                    <Text style={{ fontSize: 8, lineHeight: 1.3 }}>
                      {profileSummary.content}
                    </Text>
                  </View>
                )}

                {/* Experience section - main focus */}
                {experience && experience.length > 0 && (
                  <View style={{ marginBottom: 0 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        backgroundColor: styles.colors?.primary + "10",
                        color: styles.colors?.primary,
                        padding: 2,
                        marginBottom: 3,
                      }}
                    >
                      PROFESSIONAL EXPERIENCE
                    </Text>
                    {experience
                      .filter((exp) => exp.isVisible !== false)
                      .map((exp, index) => (
                        <View key={index} style={{ marginBottom: 6 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 9,
                                fontWeight: "bold",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {exp.position || exp.jobTitle || "Position"}
                            </Text>
                            <Text style={{ fontSize: 7, fontStyle: "italic" }}>
                              {formatDateRange(
                                exp.startDate,
                                exp.endDate,
                                exp.isCurrentlyWorking
                              )}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 8,
                              marginBottom: 1,
                              fontStyle: "italic",
                            }}
                          >
                            {exp.company || exp.companyName || "Company"}
                            {exp.location ? ` | ${exp.location}` : ""}
                          </Text>
                          <Text style={{ fontSize: 8, lineHeight: 1.3 }}>
                            {exp.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Projects section */}
                {projects && projects.length > 0 && (
                  <View style={{ marginTop: 8 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        backgroundColor: styles.colors?.primary + "10",
                        color: styles.colors?.primary,
                        padding: 2,
                        marginBottom: 3,
                      }}
                    >
                      PROJECTS
                    </Text>
                    {projects
                      .filter((project) => project.isVisible !== false)
                      .map((project, index) => (
                        <View key={index} style={{ marginBottom: 6 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 9,
                                fontWeight: "bold",
                                color: styles.colors?.secondary,
                              }}
                            >
                              {project.name || project.title || "Project"}
                            </Text>
                            <Text style={{ fontSize: 7, fontStyle: "italic" }}>
                              {formatDateRange(
                                project.startDate,
                                project.endDate,
                                project.isOngoing
                              )}
                            </Text>
                          </View>
                          {project.url && (
                            <Link
                              src={project.url}
                              style={{
                                fontSize: 7,
                                color: styles.colors?.primary,
                              }}
                            >
                              {project.url.replace(/(^\w+:|^)\/\//, "")}
                            </Link>
                          )}
                          <Text style={{ fontSize: 8, lineHeight: 1.3 }}>
                            {project.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            </View>
          </>
        );

      case "ATSSimpleClean":
        // Simple clean single-column layout optimized for ATS
        return (
          <>
            {/* Header with name and contact info */}
            <View style={{ marginBottom: 15, textAlign: "center" }}>
              <Text
                style={{ ...styles.name, fontSize: 18, textAlign: "center" }}
              >
                {personal.name || "YOUR NAME"}
              </Text>

              {personal.title && (
                <Text
                  style={{
                    ...styles.title,
                    fontSize: 12,
                    textAlign: "center",
                    marginBottom: 5,
                  }}
                >
                  {personal.title}
                </Text>
              )}

              {/* Contact details in a row */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: 6,
                }}
              >
                {personal.email && (
                  <Text style={{ fontSize: 8, margin: 2 }}>
                    {personal.email}
                  </Text>
                )}
                {personal.phone && (
                  <Text style={{ fontSize: 8, margin: 2 }}>
                    • {personal.phone}
                  </Text>
                )}
                {personal.location && (
                  <Text style={{ fontSize: 8, margin: 2 }}>
                    • {personal.location}
                  </Text>
                )}
                {personal.linkedin && (
                  <Text style={{ fontSize: 8, margin: 2 }}>
                    • LinkedIn: {personal.linkedin.replace(/(^\w+:|^)\/\//, "")}
                  </Text>
                )}
                {personal.github && (
                  <Text style={{ fontSize: 8, margin: 2 }}>
                    • GitHub: {personal.github.replace(/(^\w+:|^)\/\//, "")}
                  </Text>
                )}
              </View>
            </View>

            {/* Divider */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: styles.colors?.primary,
                marginBottom: 10,
              }}
            />

            {/* Main content */}
            <View>
              {/* Profile Summary */}
              {profileSummary && (
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      color: styles.colors?.primary,
                      borderBottomWidth: 1,
                      borderBottomColor: styles.colors?.primary,
                      fontSize: 12,
                      paddingBottom: 2,
                    }}
                  >
                    PROFESSIONAL SUMMARY
                  </Text>
                  <Text
                    style={{ ...styles.description, marginTop: 4, fontSize: 9 }}
                  >
                    {profileSummary.content}
                  </Text>
                </View>
              )}

              {/* Experience Section */}
              {experience && experience.length > 0 && (
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      color: styles.colors?.primary,
                      borderBottomWidth: 1,
                      borderBottomColor: styles.colors?.primary,
                      fontSize: 12,
                      paddingBottom: 2,
                    }}
                  >
                    EXPERIENCE
                  </Text>
                  {experience
                    .filter((exp) => exp.isVisible !== false)
                    .map((exp, index) => (
                      <View
                        key={index}
                        style={{ marginTop: 6, marginBottom: 6 }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                          }}
                        >
                          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                            {exp.position || exp.jobTitle || "Position"}
                          </Text>
                          <Text style={{ fontSize: 8 }}>
                            {formatDateRange(
                              exp.startDate,
                              exp.endDate,
                              exp.isCurrentlyWorking
                            )}
                          </Text>
                        </View>
                        <Text style={{ fontSize: 9, marginTop: 1 }}>
                          {exp.company || exp.companyName || "Company"}
                          {exp.location ? `, ${exp.location}` : ""}
                        </Text>
                        <Text style={{ fontSize: 9, marginTop: 3 }}>
                          {exp.description || ""}
                        </Text>
                      </View>
                    ))}
                </View>
              )}

              {/* Education Section */}
              {education && education.length > 0 && (
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      color: styles.colors?.primary,
                      borderBottomWidth: 1,
                      borderBottomColor: styles.colors?.primary,
                      fontSize: 12,
                      paddingBottom: 2,
                    }}
                  >
                    EDUCATION
                  </Text>
                  {education
                    .filter((edu) => edu.isVisible !== false)
                    .map((edu, index) => (
                      <View
                        key={index}
                        style={{ marginTop: 6, marginBottom: 6 }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                          }}
                        >
                          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                            {edu.degree || "Degree"}
                            {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                          </Text>
                          <Text style={{ fontSize: 8 }}>
                            {formatDateRange(
                              edu.startDate,
                              edu.endDate,
                              edu.isCurrentlyStudying
                            ) || edu.graduationYear}
                          </Text>
                        </View>
                        <Text style={{ fontSize: 9, marginTop: 1 }}>
                          {edu.institution || "Institution"}
                          {edu.location ? `, ${edu.location}` : ""}
                        </Text>
                        {edu.description && (
                          <Text style={{ fontSize: 9, marginTop: 3 }}>
                            {edu.description}
                          </Text>
                        )}
                      </View>
                    ))}
                </View>
              )}

              {/* Skills Section */}
              {skills && skills.length > 0 && (
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      color: styles.colors?.primary,
                      borderBottomWidth: 1,
                      borderBottomColor: styles.colors?.primary,
                      fontSize: 12,
                      paddingBottom: 2,
                    }}
                  >
                    SKILLS
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginTop: 5,
                    }}
                  >
                    {skills
                      .filter((skill) => skill.isVisible !== false)
                      .map((skill, index) => (
                        <Text
                          key={index}
                          style={{
                            fontSize: 9,
                            marginRight: 6,
                            marginBottom: 4,
                          }}
                        >
                          • {skill.name || skill.skillName}
                        </Text>
                      ))}
                  </View>
                </View>
              )}

              {/* Projects Section */}
              {projects && projects.length > 0 && (
                <View style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      color: styles.colors?.primary,
                      borderBottomWidth: 1,
                      borderBottomColor: styles.colors?.primary,
                      fontSize: 12,
                      paddingBottom: 2,
                    }}
                  >
                    PROJECTS
                  </Text>
                  {projects
                    .filter((project) => project.isVisible !== false)
                    .map((project, index) => (
                      <View
                        key={index}
                        style={{ marginTop: 6, marginBottom: 6 }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                          }}
                        >
                          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                            {project.name || project.title || "Project"}
                          </Text>
                          <Text style={{ fontSize: 8 }}>
                            {formatDateRange(
                              project.startDate,
                              project.endDate,
                              project.isOngoing
                            )}
                          </Text>
                        </View>
                        {project.url && (
                          <Link
                            src={project.url}
                            style={{
                              fontSize: 9,
                              color: styles.colors?.accent,
                            }}
                          >
                            {project.url.replace(/(^\w+:|^)\/\//, "")}
                          </Link>
                        )}
                        <Text style={{ fontSize: 9, marginTop: 3 }}>
                          {project.description || ""}
                        </Text>
                      </View>
                    ))}
                </View>
              )}

              {/* Other sections as needed */}
              {certifications &&
                certifications.length > 0 &&
                renderCertifications(certifications, styles)}
              {achievements &&
                achievements.length > 0 &&
                renderAchievements(achievements, styles)}
              {languages &&
                languages.length > 0 &&
                renderLanguages(languages, styles)}
            </View>
          </>
        );

      case "ATSFunctional":
        // Functional skills-focused single-column layout for ATS optimization
        return (
          <>
            {/* Header with name and contact info */}
            <View style={{ marginBottom: 8 }}>
              <Text
                style={{
                  ...styles.name,
                  fontSize: 20,
                  color: styles.colors?.primary,
                }}
              >
                {personal.name || "YOUR NAME"}
              </Text>

              {personal.title && (
                <Text
                  style={{ ...styles.title, fontSize: 12, marginBottom: 4 }}
                >
                  {personal.title}
                </Text>
              )}

              {/* Contact details in a compact format */}
              <Text style={{ fontSize: 9, marginTop: 3 }}>
                {[
                  personal.email,
                  personal.phone,
                  personal.location,
                  personal.linkedin
                    ? `LinkedIn: ${personal.linkedin.replace(
                        /(^\w+:|^)\/\//,
                        ""
                      )}`
                    : null,
                  personal.github
                    ? `GitHub: ${personal.github.replace(/(^\w+:|^)\/\//, "")}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(" | ")}
              </Text>
            </View>

            {/* Divider */}
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: styles.colors?.primary,
                marginBottom: 10,
              }}
            />

            {/* Main content */}
            <View>
              {/* Profile Summary - Prominently displayed */}
              {profileSummary && (
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      fontWeight: "bold",
                      fontSize: 11,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Professional Summary
                  </Text>
                  <Text style={{ ...styles.description, fontSize: 9 }}>
                    {profileSummary.content}
                  </Text>
                </View>
              )}

              {/* Skills Section - Prioritized in functional format */}
              {skills && skills.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      fontWeight: "bold",
                      fontSize: 11,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Core Competencies
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginTop: 3,
                      borderTop: `1px solid ${styles.colors?.primary}20`,
                      borderBottom: `1px solid ${styles.colors?.primary}20`,
                      padding: 4,
                    }}
                  >
                    {skills
                      .filter((skill) => skill.isVisible !== false)
                      .map((skill, index) => (
                        <Text
                          key={index}
                          style={{
                            fontSize: 9,
                            backgroundColor: `${styles.colors?.primary}10`,
                            borderRadius: 2,
                            padding: 3,
                            margin: 2,
                          }}
                        >
                          {skill.name || skill.skillName}
                        </Text>
                      ))}
                  </View>
                </View>
              )}

              {/* Experience Section */}
              {experience && experience.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      fontWeight: "bold",
                      fontSize: 11,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Professional Experience
                  </Text>
                  {experience
                    .filter((exp) => exp.isVisible !== false)
                    .map((exp, index) => (
                      <View key={index} style={{ marginBottom: 8 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                            {exp.position || exp.jobTitle || "Position"}
                          </Text>
                          <Text style={{ fontSize: 8 }}>
                            {formatDateRange(
                              exp.startDate,
                              exp.endDate,
                              exp.isCurrentlyWorking
                            )}
                          </Text>
                        </View>
                        <Text style={{ fontSize: 9, fontStyle: "italic" }}>
                          {exp.company || exp.companyName || "Company"}
                          {exp.location ? `, ${exp.location}` : ""}
                        </Text>
                        <Text style={{ fontSize: 9, marginTop: 2 }}>
                          {exp.description || ""}
                        </Text>
                      </View>
                    ))}
                </View>
              )}

              {/* Education Section */}
              {education && education.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      fontWeight: "bold",
                      fontSize: 11,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Education
                  </Text>
                  {education
                    .filter((edu) => edu.isVisible !== false)
                    .map((edu, index) => (
                      <View key={index} style={{ marginBottom: 6 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                            {edu.degree || "Degree"}
                            {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                          </Text>
                          <Text style={{ fontSize: 8 }}>
                            {formatDateRange(
                              edu.startDate,
                              edu.endDate,
                              edu.isCurrentlyStudying
                            ) || edu.graduationYear}
                          </Text>
                        </View>
                        <Text style={{ fontSize: 9, fontStyle: "italic" }}>
                          {edu.institution || "Institution"}
                          {edu.location ? `, ${edu.location}` : ""}
                        </Text>
                        {edu.description && (
                          <Text style={{ fontSize: 9, marginTop: 2 }}>
                            {edu.description}
                          </Text>
                        )}
                      </View>
                    ))}
                </View>
              )}

              {/* Projects Section */}
              {projects && projects.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      fontWeight: "bold",
                      fontSize: 11,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Projects
                  </Text>
                  {projects
                    .filter((project) => project.isVisible !== false)
                    .map((project, index) => (
                      <View key={index} style={{ marginBottom: 6 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                            {project.name || project.title || "Project"}
                          </Text>
                          <Text style={{ fontSize: 8 }}>
                            {formatDateRange(
                              project.startDate,
                              project.endDate,
                              project.isOngoing
                            )}
                          </Text>
                        </View>
                        {project.url && (
                          <Text
                            style={{
                              fontSize: 8,
                              color: styles.colors?.accent,
                            }}
                          >
                            {project.url.replace(/(^\w+:|^)\/\//, "")}
                          </Text>
                        )}
                        <Text style={{ fontSize: 9, marginTop: 2 }}>
                          {project.description || ""}
                        </Text>
                      </View>
                    ))}
                </View>
              )}

              {/* Certifications, Languages, Achievements */}
              {certifications && certifications.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      fontWeight: "bold",
                      fontSize: 11,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Certifications
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {certifications
                      .filter((cert) => cert.isVisible !== false)
                      .map((cert, index) => (
                        <Text
                          key={index}
                          style={{
                            fontSize: 9,
                            marginRight: 8,
                            marginBottom: 4,
                          }}
                        >
                          • {cert.certificationName} ({cert.issuingOrganization}
                          {cert.dateObtained ? `, ${cert.dateObtained}` : ""})
                        </Text>
                      ))}
                  </View>
                </View>
              )}

              {achievements && achievements.length > 0 && (
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      fontWeight: "bold",
                      fontSize: 11,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Achievements
                  </Text>
                  <View>
                    {achievements
                      .filter((achievement) => achievement.isVisible !== false)
                      .map((achievement, index) => (
                        <Text
                          key={index}
                          style={{ fontSize: 9, marginBottom: 3 }}
                        >
                          • {achievement.description}
                        </Text>
                      ))}
                  </View>
                </View>
              )}
            </View>
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
    className="resume-pdf-viewer"
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
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
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

// PropTypes for the components
ReactPDFResume.propTypes = {
  formData: PropTypes.shape({
    personal: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      website: PropTypes.string,
      linkedin: PropTypes.string,
      github: PropTypes.string,
      location: PropTypes.string,
    }),
    profileSummary: PropTypes.string,
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        company: PropTypes.string,
        location: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        isCurrently: PropTypes.bool,
        description: PropTypes.string,
      })
    ),
    education: PropTypes.arrayOf(
      PropTypes.shape({
        degree: PropTypes.string,
        institution: PropTypes.string,
        location: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        level: PropTypes.string,
      })
    ),
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        technologies: PropTypes.string,
      })
    ),
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        issuer: PropTypes.string,
        date: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    achievements: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string,
        proficiency: PropTypes.string,
      })
    ),
    customSections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        items: PropTypes.array,
      })
    ),
  }).isRequired,
  templateSettings: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string,
      secondary: PropTypes.string,
      accent: PropTypes.string,
      text: PropTypes.string,
      background: PropTypes.string,
    }),
    font: PropTypes.string,
    fontSize: PropTypes.string,
    contentSpacing: PropTypes.string,
    spacing: PropTypes.string,
    sectionOrder: PropTypes.array,
  }),
  selectedLayout: PropTypes.string,
  sectionConfig: PropTypes.array,
};

ResumeViewer.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
  selectedLayout: PropTypes.string,
  sectionConfig: PropTypes.array,
};

ResumeDownloadButton.propTypes = {
  formData: PropTypes.object.isRequired,
  templateSettings: PropTypes.object,
  selectedLayout: PropTypes.string,
  sectionConfig: PropTypes.array,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default ReactPDFResume;
