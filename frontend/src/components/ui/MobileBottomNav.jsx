import React from "react";
import { FaHome, FaFileAlt, FaFolder, FaThLarge, FaCog } from "react-icons/fa";

const MobileBottomNav = ({ onMenuClick, selectedItem }) => {
  // Main menu items for bottom navigation (limited to 5 for mobile)
  const menuItems = [
    { name: "Home", icon: FaHome },
    { name: "Create Resume", icon: FaFileAlt },
    { name: "My Resumes", icon: FaFolder },
    { name: "Resume Templates", icon: FaThLarge },
    { name: "Settings", icon: FaCog },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => onMenuClick(item.name)}
            className="flex flex-col items-center justify-center py-1 px-3 w-full h-full"
            aria-label={item.name}
          >
            <item.icon
              className={`w-5 h-5 mb-1 ${
                selectedItem === item.name ? "text-indigo-600" : "text-gray-500"
              }`}
            />
            <span
              className={`text-xs truncate ${
                selectedItem === item.name
                  ? "text-indigo-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;
