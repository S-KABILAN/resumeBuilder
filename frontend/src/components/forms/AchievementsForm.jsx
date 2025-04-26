import { useState } from "react";
import PropTypes from "prop-types";
import { FaPlus, FaTrophy, FaBuilding, FaCalendarAlt } from "react-icons/fa";
import {
  FormContainer,
  FormSection,
  FormGrid,
  FormField,
  FormTextArea,
  EntryTabs,
  EntryCard,
  FormFooter,
} from "./FormStyles";

const AchievementsForm = ({
  formData,
  onFormChange,
  onSubmit,
  errors = {},
}) => {
  // State to track which achievement entry is being edited
  const [activeIndex, setActiveIndex] = useState(0);

  // Get error for a specific field
  const getFieldError = (field, index = activeIndex) => {
    const errorKey = `achievements[${index}].${field}`;
    return errors[errorKey] || "";
  };

  // Initialize with default entries if none exist
  if (!formData.achievements || formData.achievements.length === 0) {
    const defaultAchievements = [
      {
        title: "Best Employee of the Year",
        issuer: "XYZ Corporation",
        date: "2022-05",
        description: "Recognized for exceptional performance and leadership.",
        isVisible: true,
      },
    ];

    onFormChange("achievements", defaultAchievements);
  }

  // Handler for input changes
  const handleChange = (e, index = activeIndex) => {
    const { name, value } = e.target;
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [name]: value,
    };

    onFormChange("achievements", updatedAchievements);
  };

  // Handler for checkbox changes
  const handleCheckboxChange = (e, index = activeIndex) => {
    const { name, checked } = e.target;
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [name]: checked,
    };

    onFormChange("achievements", updatedAchievements);
  };

  // Add new achievement entry
  const handleAddAchievement = () => {
    const newAchievement = {
      title: "",
      issuer: "",
      date: "",
      description: "",
      isVisible: true,
    };

    const updatedAchievements = [...formData.achievements, newAchievement];
    onFormChange("achievements", updatedAchievements);
    setActiveIndex(updatedAchievements.length - 1);
  };

  // Remove achievement entry
  const handleRemoveAchievement = (index) => {
    if (formData.achievements.length <= 1) return;

    const updatedAchievements = formData.achievements.filter(
      (_, i) => i !== index
    );
    onFormChange("achievements", updatedAchievements);

    // Adjust active index if needed
    if (activeIndex >= updatedAchievements.length) {
      setActiveIndex(updatedAchievements.length - 1);
    }
  };

  // Current achievement entry
  const currentAchievement = formData.achievements?.[activeIndex] || {};

  return (
    <FormContainer>
      {formData.achievements && formData.achievements.length > 0 && (
        <EntryTabs
          entries={formData.achievements}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onAdd={handleAddAchievement}
          onRemove={() => handleRemoveAchievement(activeIndex)}
          addButtonLabel="Add Achievement"
          addButtonIcon={<FaPlus size={10} />}
        />
      )}

      {formData.achievements && formData.achievements.length > 0 && (
        <EntryCard
          title={`Achievement #${activeIndex + 1}`}
          onRemove={() => handleRemoveAchievement(activeIndex)}
          disableRemove={formData.achievements.length <= 1}
          isVisible={currentAchievement.isVisible}
          onVisibilityChange={(e) =>
            handleCheckboxChange({
              target: { name: "isVisible", checked: e.target.checked },
            })
          }
        >
          <FormSection>
            {/* Title */}
            <FormField
              label="Achievement Title"
              name="title"
              value={currentAchievement.title || ""}
              onChange={(e) => handleChange(e)}
              placeholder="e.g. Employee of the Month, Excellence Award"
              error={getFieldError("title")}
              icon={<FaTrophy className="text-gray-400" size={11} />}
            />

            <FormGrid columns={2}>
              {/* Issuer */}
              <FormField
                label="Issuing Organization"
                name="issuer"
                value={currentAchievement.issuer || ""}
                onChange={(e) => handleChange(e)}
                placeholder="e.g. ABC Company, IEEE"
                error={getFieldError("issuer")}
                icon={<FaBuilding className="text-gray-400" size={11} />}
              />

              {/* Date */}
              <FormField
                label="Date Received"
                name="date"
                type="month"
                value={currentAchievement.date || ""}
                onChange={(e) => handleChange(e)}
                error={getFieldError("date")}
                icon={<FaCalendarAlt className="text-gray-400" size={11} />}
              />
            </FormGrid>

            {/* Description */}
            <FormTextArea
              label="Description"
              name="description"
              value={currentAchievement.description || ""}
              onChange={(e) => handleChange(e)}
              placeholder="Brief description of the achievement and its significance..."
              rows={2}
              error={getFieldError("description")}
              helpText="Describe what you achieved and why it was significant"
            />
          </FormSection>
        </EntryCard>
      )}

      <FormFooter onSubmit={onSubmit} />
    </FormContainer>
  );
};

AchievementsForm.propTypes = {
  formData: PropTypes.object.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default AchievementsForm;
