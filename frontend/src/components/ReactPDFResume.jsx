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
                  backgroundColor:
                    templateSettings?.colors?.primary + "15" || "#33333315", // Light version of primary color
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
                      color: templateSettings?.colors?.primary || "#333333",
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
                      backgroundColor:
                        templateSettings?.colors?.primary || "#333333",
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
                          color: templateSettings?.colors?.accent || "#4a6cf7",
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
                        backgroundColor:
                          templateSettings?.colors?.primary || "#333333",
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
                              backgroundColor:
                                templateSettings?.colors?.primary + "25" ||
                                "#33333325",
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
                        backgroundColor:
                          templateSettings?.colors?.primary || "#333333",
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
                                color:
                                  templateSettings?.colors?.secondary ||
                                  "#555555",
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
                        borderBottomColor:
                          templateSettings?.colors?.primary || "#333333",
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
                                color:
                                  templateSettings?.colors?.secondary ||
                                  "#555555",
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
                          <Text style={styles.description}>
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
          <View>
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
                          style={{ marginBottom: 5, marginTop: 5 }}
                        >
                          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                            {edu.degree || "Degree"}
                            {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                          </Text>
                          <Text style={{ fontSize: 9 }}>
                            {edu.institution || "Institution"}
                            {edu.location ? ` - ${edu.location}` : ""}
                          </Text>
                          <Text style={{ fontSize: 8, fontStyle: "italic" }}>
                            {formatDateRange(
                              edu.startDate,
                              edu.endDate,
                              edu.isCurrentlyStudying
                            ) || edu.graduationYear}
                          </Text>
                          {edu.description && (
                            <Text style={{ fontSize: 8, marginTop: 2 }}>
                              {edu.description}
                            </Text>
                          )}
                        </View>
                      ))}
                  </View>
                )}
              </View>

              {/* Right column for experience, projects, etc. */}
              <View
                style={{
                  width: "60%",
                  paddingLeft: 15,
                  borderLeftWidth: 1,
                  borderLeftColor: styles.colors?.primary + "30",
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
                      EXPERIENCE
                    </Text>
                    {experience
                      .filter((exp) => exp.isVisible !== false)
                      .map((exp, index) => (
                        <View
                          key={index}
                          style={{ marginBottom: 8, marginTop: 5 }}
                        >
                          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                            {exp.position || exp.jobTitle || "Position"}
                          </Text>
                          <Text style={{ fontSize: 9 }}>
                            {exp.company || exp.companyName || "Company"}
                            {exp.location ? ` - ${exp.location}` : ""}
                          </Text>
                          <Text style={{ fontSize: 8, fontStyle: "italic" }}>
                            {formatDateRange(
                              exp.startDate,
                              exp.endDate,
                              exp.isCurrently
                            )}
                          </Text>
                          {exp.description && (
                            <Text style={{ fontSize: 8, marginTop: 2 }}>
                              {exp.description}
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
                          style={{ marginBottom: 5, marginTop: 5 }}
                        >
                          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                            {project.name || project.title || "Project"}
                          </Text>
                          <Text style={{ fontSize: 8, fontStyle: "italic" }}>
                            {formatDateRange(
                              project.startDate,
                              project.endDate,
                              project.isOngoing
                            )}
                          </Text>
                          {project.url && (
                            <Link
                              src={project.url}
                              style={{
                                fontSize: 8,
                                color: styles.colors?.primary,
                              }}
                            >
                              {project.url.replace(/(^\w+:|^)\/\//, "")}
                            </Link>
                          )}
                          <Text style={{ fontSize: 8, marginTop: 2 }}>
                            {project.description || ""}
                          </Text>
                        </View>
                      ))}
                  </View>
                )}

                {/* Achievements section */}
                {achievements && achievements.length > 0 && (
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
                      ACHIEVEMENTS
                    </Text>
                    <View style={{ marginTop: 5 }}>
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
          </View>
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
  const [errorState, setErrorState] = useState(null);

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
      setErrorState(null);
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
      setErrorState("Failed to generate PDF. Please check your data.");
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
      {errorState && (
        <div style={{ color: "red", marginBottom: 8 }}>{errorState}</div>
      )}
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
        {({ loading, error }) =>
          children
            ? typeof children === "function"
              ? children({ loading, error })
              : children
            : loading
            ? "Generating PDF..."
            : error
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
    profileSummary: PropTypes.shape({
      content: PropTypes.string,
    }),
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        position: PropTypes.string,
        jobTitle: PropTypes.string,
        company: PropTypes.string,
        companyName: PropTypes.string,
        location: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        isCurrentlyWorking: PropTypes.bool,
        isVisible: PropTypes.bool,
        description: PropTypes.string,
      })
    ),
    education: PropTypes.arrayOf(
      PropTypes.shape({
        degree: PropTypes.string,
        fieldOfStudy: PropTypes.string,
        institution: PropTypes.string,
        location: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        isCurrentlyStudying: PropTypes.bool,
        isVisible: PropTypes.bool,
        graduationYear: PropTypes.string,
        gpa: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        skillName: PropTypes.string,
        level: PropTypes.string,
        isVisible: PropTypes.bool,
      })
    ),
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        isOngoing: PropTypes.bool,
        isVisible: PropTypes.bool,
      })
    ),
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        certificationName: PropTypes.string,
        issuer: PropTypes.string,
        issuingOrganization: PropTypes.string,
        issueDate: PropTypes.string,
        dateObtained: PropTypes.string,
        date: PropTypes.string,
        url: PropTypes.string,
        isVisible: PropTypes.bool,
      })
    ),
    achievements: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        description: PropTypes.string,
        isVisible: PropTypes.bool,
      })
    ),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        language: PropTypes.string,
        proficiency: PropTypes.string,
        isVisible: PropTypes.bool,
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
