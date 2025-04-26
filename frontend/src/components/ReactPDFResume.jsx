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

    // Variables used across different cases
    let leftSideTypes, leftSections, rightSections;
    let sidebarTypes, sidebarSections, mainSections;

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
        leftSideTypes = ["skills", "certifications", "achievements"];

        // Filter sections based on the correct order from sectionOrder
        leftSections = sectionOrder.filter((id) => leftSideTypes.includes(id));
        rightSections = sectionOrder.filter(
          (id) => !leftSideTypes.includes(id)
        );

        return (
          <>
            {/* Header stays at top */}
            {renderHeader(personal, styles)}

            {/* Two column content */}
            <View style={styles.twoColumnLayout}>
              <View style={styles.leftColumn}>
                {/* Left column sections in the user's preferred order */}
                {leftSections.map((sectionId) => renderSection(sectionId))}
              </View>

              <View style={styles.rightColumn}>
                {/* Right column sections in the user's preferred order */}
                {rightSections.map((sectionId) => renderSection(sectionId))}
              </View>
            </View>

            {/* Custom sections at bottom */}
            {renderCustomSections(customSections, styles, "profile-summary")}
          </>
        );

      case "ModernTwoColumn":
        // Modern two-column layout with colored sidebar
        sidebarTypes = ["skills", "languages", "achievements"];

        // Filter sections based on the correct order from sectionOrder
        sidebarSections = sectionOrder.filter((id) =>
          sidebarTypes.includes(id)
        );
        mainSections = sectionOrder.filter(
          (id) => !sidebarTypes.includes(id) && id !== "profile-summary"
        );

        return (
          <>
            <View style={styles.twoColumnLayout}>
              {/* Left sidebar with colored background */}
              <View
                style={{
                  width: "30%",
                  paddingRight: 10,
                  paddingLeft: 10,
                  paddingTop: 12,
                  paddingBottom: 12,
                  backgroundColor:
                    templateSettings?.colors?.primary + "15" || "#33333315", // Light version of primary color
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
                      marginBottom: 5,
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
                          color: templateSettings?.colors?.accent || "#4a6cf7",
                        }}
                      >
                        GitHub
                      </Link>
                    )}
                  </View>
                </View>

                {/* Sidebar sections in user's preferred order */}
                {sidebarSections.map((sectionId) => renderSection(sectionId))}
              </View>

              {/* Main content column */}
              <View
                style={{
                  width: "70%",
                  paddingLeft: 15,
                  paddingRight: 5,
                }}
              >
                {/* Profile summary first if it exists */}
                {profileSummary && (
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        ...styles.sectionTitle,
                        borderBottomWidth: 1,
                        borderBottomColor:
                          templateSettings?.colors?.primary || "#333333",
                        fontSize: 14,
                        fontWeight: "bold",
                        color: templateSettings?.colors?.primary || "#333333",
                        marginBottom: 5,
                      }}
                    >
                      PROFESSIONAL SUMMARY
                    </Text>
                    <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
                      {profileSummary.content}
                    </Text>
                  </View>
                )}

                {/* Main content sections in user's preferred order */}
                {mainSections.map((sectionId) => renderSection(sectionId))}
              </View>
            </View>
          </>
        );

      case "ProfessionalTwoColumn":
        // Professional two-column layout with balanced design
        // Define which sections should be in each column
        leftSideTypes = ["skills", "education", "certifications"];

        // Filter sections based on the correct order from sectionOrder
        leftSections = sectionOrder.filter((id) => leftSideTypes.includes(id));
        rightSections = sectionOrder.filter(
          (id) => !leftSideTypes.includes(id) && id !== "profile-summary"
        );

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

            {/* Profile summary */}
            {profileSummary && renderProfileSummary(profileSummary, styles)}

            {/* Two column content */}
            <View
              style={{
                ...styles.twoColumnLayout,
                justifyContent: "space-between",
              }}
            >
              {/* Left column with sections in user's preferred order */}
              <View
                style={{
                  width: "40%",
                  paddingRight: 15,
                }}
              >
                {/* Left column sections in user's preferred order */}
                {leftSections.map((sectionId) => renderSection(sectionId))}
              </View>

              {/* Right column with sections in user's preferred order */}
              <View
                style={{
                  width: "55%",
                  borderLeftWidth: 1,
                  borderLeftColor: styles.colors?.secondary || "#e5e7eb",
                  paddingLeft: 15,
                }}
              >
                {/* Right column sections in user's preferred order */}
                {rightSections.map((sectionId) => renderSection(sectionId))}
              </View>
            </View>
          </View>
        );

      case "CompactTwoColumn":
        // Compact two-column layout that maximizes information density with subtle styling
        // Define which sections should be in each column
        leftSideTypes = [
          "skills",
          "education",
          "certifications",
          "languages",
          "achievements",
        ];

        // Filter sections based on the correct order from sectionOrder
        leftSections = sectionOrder.filter((id) => leftSideTypes.includes(id));
        rightSections = sectionOrder.filter(
          (id) => !leftSideTypes.includes(id) && id !== "profile-summary"
        );

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

                {/* Left column sections in user's preferred order */}
                {leftSections.map((sectionId) => renderSection(sectionId))}
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
                {profileSummary && renderProfileSummary(profileSummary, styles)}

                {/* Right column sections in user's preferred order */}
                {rightSections.map((sectionId) => renderSection(sectionId))}
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

            {/* Main content in user's preferred order */}
            <View>
              {/* Render all sections in the user's preferred order */}
              {sectionOrder.map((sectionId) => renderSection(sectionId))}
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

            {/* Main content in user's preferred order */}
            <View>
              {/* Render all sections in the user's preferred order */}
              {sectionOrder.map((sectionId) => renderSection(sectionId))}
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
  isAuthenticated = false,
}) => (
  <PDFViewer
    className={`resume-pdf-viewer ${!isAuthenticated ? "hide-toolbar" : ""}`}
    style={{
      width: "100%",
      height: "600px",
      maxHeight: "90vh", // More responsive height
      border: "none", // Remove border for cleaner look
    }}
    showToolbar={isAuthenticated}
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
  isAuthenticated: PropTypes.bool,
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
