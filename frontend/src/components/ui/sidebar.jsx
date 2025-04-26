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

const Sidebar = ({ onMenuClick, userName, onLogout, selectedItem }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { name: "Home", icon: FaHome },
    { name: "Create Resume", icon: FaFileAlt },
    { name: "My Resumes", icon: FaFolder },
    { name: "Resume Templates", icon: FaThLarge },
    { name: "Settings", icon: FaCog },
  ];

  const handleMenuClick = (itemName) => {
    onMenuClick(itemName); // This will call the parent's menu click handler
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={`${
        isExpanded ? "w-72" : "w-20"
      } shrink-0 border-r border-gray-200 bg-white h-screen flex flex-col transition-all duration-300 ease-in-out relative shadow-md`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 text-indigo-600 hover:text-indigo-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 z-10"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <FaChevronLeft className="w-3 h-3" />
        ) : (
          <FaChevronRight className="w-3 h-3" />
        )}
      </button>
      <div
        className={`px-6 py-8 flex flex-col items-center bg-gradient-to-br from-indigo-700 to-purple-700 ${
          isExpanded ? "" : "px-2"
        }`}
      >
        <div className="w-16 h-16 mb-4 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
          <FaUserCircle className="w-10 h-10" />
        </div>
        {isExpanded && (
          <>
            <h1 className="text-xl font-bold text-white text-center tracking-wide">
              Resume Builder
            </h1>
            <p className="text-indigo-100 text-sm mt-2 font-medium opacity-90">
              Welcome, {userName || "User"}
            </p>
          </>
        )}
      </div>
      <nav className="flex-grow py-6">
        <ul className={`space-y-2 ${isExpanded ? "px-4" : "px-2"}`}>
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleMenuClick(item.name)}
                className={`w-full text-left flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 ease-in-out ${
                  selectedItem === item.name
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md transform scale-[1.02]"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                } ${isExpanded ? "" : "justify-center"}`}
                title={item.name}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    selectedItem === item.name
                      ? "text-white"
                      : "text-indigo-500"
                  }`}
                />
                {isExpanded && (
                  <span
                    className={`text-sm font-medium ${
                      selectedItem === item.name ? "" : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className={`px-4 py-6 ${isExpanded ? "" : "px-2"}`}>
        <button
          onClick={onLogout}
          className={`w-full bg-white text-gray-700 border border-red-300 py-3 px-4 rounded-xl hover:bg-red-50 hover:border-red-400 transition-all duration-200 flex items-center ${
            isExpanded ? "justify-start space-x-3" : "justify-center"
          }`}
          title="Logout"
        >
          <FaSignOutAlt className="w-4 h-4 text-red-500" />
          {isExpanded && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
