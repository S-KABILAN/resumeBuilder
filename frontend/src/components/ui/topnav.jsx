import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaCogs,
  FaProjectDiagram,
  FaCertificate,
  FaLanguage,
  FaTrophy,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const TopNav = ({
  activeSection,
  onSectionChange,
  isAuthenticated,
  onLogout,
}) => {
  const navigate = useNavigate();

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

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="flex justify-between overflow-x-auto py-4 px-3 bg-white rounded-xl shadow-sm border border-gray-100 mb-4 sticky top-0 z-10">
      

      <div className="flex shrink-0 ml-3">
        {isAuthenticated ? (
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <FaSignOutAlt className="mr-2 text-gray-600" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleLogin}
              className="flex items-center px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <FaSignInAlt className="mr-2" />
              <span className="text-sm font-medium">Sign In</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
