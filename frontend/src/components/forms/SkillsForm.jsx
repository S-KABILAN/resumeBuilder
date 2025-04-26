import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaCode, FaTags } from "react-icons/fa";
import {
  FormContainer,
  FormSection,
  FormField,
  EntryTabs,
  EntryCard,
  FormFooter,
} from "./FormStyles";

const SkillsForm = ({ formData, onFormChange, onSubmit, errors = {} }) => {
  // State to track which skill entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Get error for a specific field
  const getFieldError = (field, index = activeIndex) => {
    const errorKey = `skills[${index}].${field}`;
    return errors[errorKey] || "";
  };

  // Initialize with default entries if none exist
  if (!formData.skills || formData.skills.length === 0) {
    const defaultSkills = [
      {
        skillType: "Programming Languages",
        skillName: "JavaScript, TypeScript, Python, Java",
        isVisible: true,
      },
      {
        skillType: "Frontend",
        skillName: "React, Angular, Vue.js, HTML5, CSS3",
        isVisible: true,
      },
      {
        skillType: "Backend",
        skillName: "Node.js, Express, Django, Spring Boot",
        isVisible: true,
      },
      {
        skillType: "Databases",
        skillName: "MongoDB, PostgreSQL, MySQL, Redis",
        isVisible: true,
      },
      {
        skillType: "Tools & Others",
        skillName: "Git, Docker, AWS, CI/CD, Agile",
        isVisible: true,
      },
    ];

    onFormChange("skills", defaultSkills);
  }

  // Handler for input changes
  const handleChange = (e, index = activeIndex) => {
    const { name, value } = e.target;
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [name]: value };

    onFormChange("skills", updatedSkills);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e, index = activeIndex) => {
    const { name, checked } = e.target;
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [name]: checked };

    onFormChange("skills", updatedSkills);
  };

  // Add new skill entry
  const handleAddSkill = () => {
    const newSkill = {
      skillType: "",
      skillName: "",
      isVisible: true,
    };

    const updatedSkills = [...formData.skills, newSkill];
    onFormChange("skills", updatedSkills);
    setActiveIndex(updatedSkills.length - 1);
  };

  // Remove skill entry
  const handleRemoveSkill = (index) => {
    if (formData.skills.length <= 1) return;

    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    onFormChange("skills", updatedSkills);

    // Adjust active index if needed
    if (activeIndex >= updatedSkills.length) {
      setActiveIndex(updatedSkills.length - 1);
    }
  };

  // Current skill entry
  const currentSkill = formData.skills?.[activeIndex] || {};

  return (
    <FormContainer>
      {formData.skills && formData.skills.length > 0 && (
        <EntryTabs
          entries={formData.skills}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onAdd={handleAddSkill}
          onRemove={() => handleRemoveSkill(activeIndex)}
          addButtonLabel="Add Skill"
          addButtonIcon={<FaPlus size={10} />}
        />
      )}

      {formData.skills && formData.skills.length > 0 && (
        <EntryCard
          title={`Skill Category #${activeIndex + 1}`}
          onRemove={() => handleRemoveSkill(activeIndex)}
          disableRemove={formData.skills.length <= 1}
          isVisible={currentSkill.isVisible}
          onVisibilityChange={(e) =>
            handleCheckboxChange({
              target: { name: "isVisible", checked: e.target.checked },
            })
          }
        >
          <FormSection>
            {/* Skill Type */}
            <FormField
              label="Skill Category"
              name="skillType"
              value={currentSkill.skillType || ""}
              onChange={(e) => handleChange(e)}
              placeholder="e.g. Programming Languages, Tools, Soft Skills"
              error={getFieldError("skillType")}
              icon={<FaTags className="text-gray-400" size={11} />}
              helpText="Group your skills into categories for better organization"
            />

            {/* Skill Name/Description */}
            <FormField
              label="Skills"
              name="skillName"
              value={currentSkill.skillName || ""}
              onChange={(e) => handleChange(e)}
              placeholder="e.g. JavaScript, React, Node.js"
              error={getFieldError("skillName")}
              icon={<FaCode className="text-gray-400" size={11} />}
              helpText="Separate multiple skills with commas for better formatting"
            />
          </FormSection>
        </EntryCard>
      )}

      <FormFooter onSubmit={onSubmit} />
    </FormContainer>
  );
};

SkillsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default SkillsForm;
