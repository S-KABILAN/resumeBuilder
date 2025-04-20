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
      } shrink-0 border-r border-gray-200 bg-gradient-to-b from-slate-50 to-white h-screen flex flex-col transition-all duration-300 ease-in-out relative shadow-lg`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1.5 text-indigo-500 hover:text-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 z-10"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <FaChevronLeft className="w-3 h-3" />
        ) : (
          <FaChevronRight className="w-3 h-3" />
        )}
      </button>
      <div
        className={`px-6 py-10 flex flex-col items-center bg-gradient-to-br from-indigo-600 to-purple-600 ${
          isExpanded ? "" : "px-2"
        }`}
      >
        <div className="w-16 h-16 mb-4 bg-white text-indigo-500 rounded-full flex items-center justify-center shadow-md">
          <FaUserCircle className="w-10 h-10" />
        </div>
        {isExpanded && (
          <>
            <h1 className="text-2xl font-bold text-white text-center tracking-wide">
              Resume Builder
            </h1>
            <p className="text-indigo-100 text-sm mt-2 font-medium">
              Welcome, {userName || "User"}
            </p>
          </>
        )}
      </div>
      <nav className="flex-grow py-8">
        <ul className={`space-y-3 ${isExpanded ? "px-5" : "px-2"}`}>
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleMenuClick(item.name)}
                className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out ${
                  selectedItem === item.name
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-indigo-50"
                } ${isExpanded ? "" : "justify-center"}`}
                title={item.name}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    selectedItem === item.name
                      ? "text-white"
                      : "text-indigo-400"
                  }`}
                />
                {isExpanded && (
                  <span
                    className={`text-sm font-medium ${
                      selectedItem === item.name ? "" : "text-gray-600"
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
      <div className={`px-5 py-6 ${isExpanded ? "" : "px-2"}`}>
        <button
          onClick={onLogout}
          className={`w-full bg-white text-gray-700 border border-red-400 py-2.5 px-4 rounded-xl hover:bg-red-50 transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium ${
            isExpanded ? "" : "px-0"
          }`}
          title="Logout"
        >
          <FaSignOutAlt className="w-4 h-4 text-red-500" />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
