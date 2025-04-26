import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const MobileTopNav = ({ userName, onLogout }) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-30">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Resume Builder
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <FaUserCircle className="text-indigo-600 w-5 h-5 mr-1" />
            <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
              {userName || "User"}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
            aria-label="Logout"
          >
            <FaSignOutAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileTopNav;
