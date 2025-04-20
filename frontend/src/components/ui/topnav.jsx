import React from "react";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaCogs,
  FaProjectDiagram,
  FaCertificate,
  FaLanguage,
  FaTrophy,
} from "react-icons/fa";

const TopNav = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: "PersonalInfo", label: "Personal Info", icon: FaUser },
    { id: "Education", label: "Education", icon: FaGraduationCap },
    { id: "Experience", label: "Experience", icon: FaBriefcase },
    { id: "Skills", label: "Skills", icon: FaCogs },
    { id: "Languages", label: "Languages", icon: FaLanguage },
    { id: "Achievements", label: "Achievements", icon: FaTrophy },
    { id: "Projects", label: "Projects", icon: FaProjectDiagram },
    { id: "Certifications", label: "Certifications", icon: FaCertificate },
  ];

  return (
    <nav className="flex overflow-x-auto py-3 px-2 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex space-x-3 px-2 min-w-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`
              flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ease-in-out
              ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md transform scale-105"
                  : "bg-slate-50 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }
            `}
          >
            <item.icon
              className={`mr-2 ${
                activeSection === item.id ? "text-white" : "text-indigo-400"
              }`}
              size={16}
            />
            <span
              className={`text-sm font-medium whitespace-nowrap ${
                activeSection === item.id ? "text-white" : ""
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TopNav;
