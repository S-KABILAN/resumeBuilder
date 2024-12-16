// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          {/* Display more details as needed */}
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Dashboard;
