// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
  FaClipboardList,
  FaFileAlt,
} from "react-icons/fa";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user details from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear token and user details from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {user ? (
              <div>
                <div className="flex items-center space-x-4 mb-8 p-4 bg-indigo-50 rounded-xl">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                    <FaUser className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Welcome, {user.name}
                    </h2>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FaEnvelope className="mr-2 text-indigo-500" />{" "}
                      {user.email}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Quick Actions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 hover:border-indigo-300"
                  >
                    <FaFileAlt className="w-8 h-8 text-indigo-500 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Create New Resume
                    </h3>
                    <p className="text-gray-600">
                      Build a professional resume with our easy-to-use templates
                    </p>
                  </div>

                  <div
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 hover:border-indigo-300"
                  >
                    <FaClipboardList className="w-8 h-8 text-indigo-500 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      My Resumes
                    </h3>
                    <p className="text-gray-600">
                      Access and edit your previously created resumes
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center p-8">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="ml-4 text-lg text-gray-600">
                  Loading user details...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
