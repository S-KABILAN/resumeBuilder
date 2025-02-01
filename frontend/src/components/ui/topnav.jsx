import React from "react";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaCogs,
  FaProjectDiagram,
  FaCertificate,
} from "react-icons/fa";

const TopNav = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: "PersonalInfo", label: "Personal Info", icon: FaUser },
    { id: "Education", label: "Education", icon: FaGraduationCap },
    { id: "Experience", label: "Experience", icon: FaBriefcase },
    { id: "Skills", label: "Skills", icon: FaCogs },
    { id: "Achievements", label: "Achievements", icon: FaCogs },
    { id: "Projects", label: "Projects", icon: FaProjectDiagram },
    { id: "Certifications", label: "Certifications", icon: FaCertificate },
  ];

  return (
    <nav className="flex justify-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={`
            flex items-center px-4 py-2 rounded-md transition-all duration-200 ease-in-out
            ${
              activeSection === item.id
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          <item.icon
            className={`mr-2 ${
              activeSection === item.id ? "text-white" : "text-gray-500"
            }`}
          />
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default TopNav;
