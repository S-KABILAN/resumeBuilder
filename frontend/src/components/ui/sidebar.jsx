import React, { useState, useEffect } from "react";
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
  FaBars,
  FaTimes,
  FaGithub,
  FaStar,
} from "react-icons/fa";

const Sidebar = ({ onMenuClick, userName, onLogout, selectedItem }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse sidebar on mobile
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const menuItems = [
    { name: "Home", icon: FaHome },
    { name: "Create Resume", icon: FaFileAlt },
    { name: "My Resumes", icon: FaFolder },
    { name: "Resume Templates", icon: FaThLarge },
    { name: "Settings", icon: FaCog },
  ];

  const handleMenuClick = (itemName) => {
    onMenuClick(itemName); // Call the parent's menu click handler
    if (isMobile) {
      setIsMobileMenuOpen(false); // Close mobile menu when an item is clicked
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mobile menu button that appears only on small screens
  const mobileMenuButton = (
    <button
      onClick={toggleMobileMenu}
      className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-md text-indigo-600"
      aria-label="Toggle mobile menu"
    >
      {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
    </button>
  );

  // Main sidebar content
  const sidebarContent = (
    <>
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
            <a
              href="/"
              className="text-xl font-bold text-white text-center tracking-wide"
            >
              Resume Builder
            </a>
            <p className="text-indigo-100 text-sm mt-2 font-medium opacity-90">
              Welcome, {userName || "User"}
            </p>

            {/* GitHub Star Button */}
            <a
              href="https://github.com/S-KABILAN/resume-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-full flex items-center transition-all duration-300 group"
            >
              <FaGithub className="mr-2" />
              <span>Give a Star</span>
              <FaStar className="ml-2 text-yellow-400 animate-pulse group-hover:animate-spin" />
            </a>
          </>
        )}
        {!isExpanded && (
          <a
            href="https://github.com/S-KABILAN/resume-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 p-2 bg-gray-800 hover:bg-black text-white rounded-full flex items-center justify-center transition-all duration-300"
            title="Star us on GitHub"
          >
            <FaGithub className="text-lg" />
          </a>
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
    </>
  );

  // Desktop sidebar
  const desktopSidebar = (
    <aside
      className={`hidden md:flex ${
        isExpanded ? "w-72" : "w-20"
      } shrink-0 border-r border-gray-200 bg-white h-screen flex-col transition-all duration-300 ease-in-out relative shadow-md`}
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
      {sidebarContent}
    </aside>
  );

  // Mobile sidebar (overlay)
  const mobileSidebar = (
    <>
      {mobileMenuButton}
      <div
        className={`md:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 w-72 h-screen bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default Sidebar;
