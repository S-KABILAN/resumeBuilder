import React, { useState } from "react";
import {
  FaHome,
  FaFileAlt,
  FaFolder,
  FaThLarge,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = ({ onMenuClick }) => {
  const [activeItem, setActiveItem] = useState("Home");
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { name: "Home", icon: FaHome },
    { name: "Create Resume", icon: FaFileAlt },
    { name: "My Resumes", icon: FaFolder },
    { name: "Resume Templates", icon: FaThLarge },
    { name: "Settings", icon: FaCog },
  ];

  const handleMenuClick = (itemName) => {
    setActiveItem(itemName);
    onMenuClick(itemName);
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={`${
        isExpanded ? "w-64" : "w-20"
      } shrink-0 border-r border-gray-100 bg-white h-screen flex flex-col transition-all duration-300 ease-in-out relative`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white border border-gray-100 rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <FaChevronLeft className="w-4 h-4" />
        ) : (
          <FaChevronRight className="w-4 h-4" />
        )}
      </button>
      <div
        className={`px-6 py-8 flex flex-col items-center bg-gradient-to-b from-blue-50 to-white ${
          isExpanded ? "" : "px-2"
        }`}
      >
        <div className="w-16 h-16 mb-4 text-blue-500">
          <FaUserCircle className="w-full h-full" />
        </div>
        {isExpanded && (
          <>
            <h1 className="text-xl font-semibold text-gray-800 text-center">
              Resume Builder
            </h1>
            <p className="text-gray-500 text-sm mt-1">Welcome, User</p>
          </>
        )}
      </div>
      <nav className="flex-grow py-6">
        <ul className={`space-y-2 ${isExpanded ? "px-4" : "px-2"}`}>
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleMenuClick(item.name)}
                className={`w-full text-left flex items-center space-x-3 px-4 py-2.5 rounded-lg transition duration-150 ease-in-out ${
                  activeItem === item.name
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                } ${isExpanded ? "" : "justify-center"}`}
                title={item.name}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    activeItem === item.name ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                {isExpanded && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className={`px-4 py-6 ${isExpanded ? "" : "px-2"}`}>
        <button
          onClick={() => handleMenuClick("Logout")}
          className={`w-full bg-white text-gray-600 border border-gray-200 py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-300 flex items-center justify-center space-x-2 text-sm font-medium ${
            isExpanded ? "" : "px-0"
          }`}
          title="Logout"
        >
          <FaSignOutAlt className="w-4 h-4" />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
