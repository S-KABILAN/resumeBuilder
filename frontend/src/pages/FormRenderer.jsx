const FormRenderer = ({
  activeSection,
  formData,
  onFormChange,
  addFormEntry,
  removeFormEntry,
}) => {
  if (Array.isArray(formData[activeSection])) {
    // Handle sections that are arrays (e.g., education, experience)
    return formData[activeSection].map((entry, index) => {
      switch (activeSection) {
        case "Education":
          return (
            <EducationForm
              key={index}
              formData={entry}
              onFormChange={(field, value) =>
                onFormChange(activeSection, field, value, index)
              }
              addEducation={addFormEntry}
              removeEducation={() => removeFormEntry(activeSection, index)}
            />
          );
        case "Experience":
          return (
            <ExperienceForm
              key={index}
              formData={entry}
              onFormChange={(field, value) =>
                onFormChange(activeSection, field, value, index)
              }
            />
          );
        // Add more cases for other array-based sections
        default:
          return null;
      }
    });
  } else {
    // Handle non-array sections (e.g., skills, projects, certifications)
    switch (activeSection) {
      case "Skills":
        return (
          <SkillsForm formData={formData.skills} onFormChange={onFormChange} />
        );
      case "Projects":
        return (
          <ProjectsForm
            formData={formData.projects}
            onFormChange={onFormChange}
          />
        );
      case "Certifications":
        return (
          <CertificationsForm
            formData={formData.certifications}
            onFormChange={onFormChange}
          />
        );
      default:
        return null;
    }
  }
};

export default FormRenderer;
