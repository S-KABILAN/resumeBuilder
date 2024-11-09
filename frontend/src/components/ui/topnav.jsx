const TopNav = ({ activeSection, onSectionChange }) => {
  return (
    <nav className="flex justify-center space-x-4 bg-gray-100 p-4">
      <button
        onClick={() => onSectionChange("PersonalInfo")}
        className={`px-4 py-2 rounded-lg ${
          activeSection === "PersonalInfo"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Personal Info
      </button>

      <button
        onClick={() => onSectionChange("Education")}
        className={`px-4 py-2 rounded-lg ${
          activeSection === "Education"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Education
      </button>
      <button
        onClick={() => onSectionChange("Experience")}
        className={`px-4 py-2 rounded-lg ${
          activeSection === "Experience"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Experience
      </button>
      <button
        onClick={() => onSectionChange("Skills")}
        className={`px-4 py-2 rounded-lg ${
          activeSection === "Skills"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Skills
      </button>
      <button
        onClick={() => onSectionChange("Projects")}
        className={`px-4 py-2 rounded-lg ${
          activeSection === "Projects"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Projects
      </button>
      <button
        onClick={() => onSectionChange("Certifications")}
        className={`px-4 py-2 rounded-lg ${
          activeSection === "Certifications"
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
        }`}
      >
        Certifications
      </button>
    </nav>
  );
};

export default TopNav;
