// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user details from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          {/* Display more details as needed */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default Dashboard;
