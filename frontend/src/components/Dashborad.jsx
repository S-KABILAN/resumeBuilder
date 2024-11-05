import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/resume");
        setResumeData(data);
      } catch (error) {
        console.log("Error fetching resume data", error);
      }
    };

    fetchResumeData();
  }, []);

  const handleUpdateResume = async () => {
    const updatedData = {
      /* Collect updated resume data */
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/resume",
        updatedData
      );
      setResumeData(data);
    } catch (error) {
      console.log("Error updating resume data", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Display resume data */}
      <button onClick={handleUpdateResume}>Update Resume</button>
    </div>
  );
};

export default Dashboard;
