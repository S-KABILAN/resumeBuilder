import React, { useState } from "react";
import {
  FaHome,
  FaFileAlt,
  FaFolder,
  FaThLarge,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ onMenuClick, onLayoutSelect }) => {
  const [activeItem, setActiveItem] = useState("Home");

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

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white h-screen flex flex-col shadow-sm">
      <div className="px-4 py-6 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img
            src="/placeholder.svg?height=96&width=96"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl text-center font-bold text-gray-800">
          Resume Builder
        </h1>
        <p className="text-gray-500 text-center mt-2 text-sm">Welcome, asdf</p>
      </div>
      <nav className="flex-grow py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleMenuClick(item.name)}
                className={`w-full text-left flex items-center space-x-3 px-4 py-2 rounded-md transition duration-150 ease-in-out ${
                  activeItem === item.name
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    activeItem === item.name ? "text-blue-700" : "text-gray-500"
                  }`}
                />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-4 py-4 border-t border-gray-200">
        <button
          onClick={() => handleMenuClick("Logout")}
          className="w-full bg-white text-red-500 border border-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition duration-300 flex items-center justify-center space-x-2"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
