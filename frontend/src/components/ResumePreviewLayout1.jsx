import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumePreviewLayout1 = ({ formData }) => {
  // Reference to the resume container
  const resumeRef = useRef();

  // Function to handle downloading as PDF
  const handleDownloadPDF = async () => {
    const input = resumeRef.current;
    if (input) {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume.pdf");
    }
  };

  return (
    <div>
      {/* Button to download the PDF */}
      <button
        onClick={handleDownloadPDF}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download as PDF
      </button>

      {/* Resume Preview */}
      <div
        ref={resumeRef}
        id="resumeContainer"
        className="mx-auto p-8 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden scale-75 md:scale-90 lg:scale-100 relative"
      >
        {/* Personal Info */}
        <div className="max-w-[800px] mx-auto p-8 bg-white">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-light mb-2">
              {formData.personal?.name || "John Doe"}
            </h1>
            <div className="text-sm text-gray-600 mt-1">
              {formData.personal?.email || "johndoe@example.com"} |{" "}
              {formData.personal?.phone || "(123) 456-7890"} |{" "}
              {formData.personal?.location || "Trichy"}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {formData.personal?.github && (
                <a
                  href={formData.personal.github}
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
              )}
              {formData.personal?.linkedin && (
                <a
                  href={formData.personal.linkedin}
                  className="text-blue-500 hover:underline ml-2"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </header>

          <div className="grid grid-cols-[2fr_3fr] gap-8">
            {/* Left Column */}
            <div>
              {/* Education */}
              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
                  Education
                </h2>
                {formData.education.slice(0, 3).map((edu, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-semibold">{edu.degree || "Degree"}</p>
                    <p>
                      {edu.institution || "Institution"},{" "}
                      {edu.graduationYear || "Year"}
                    </p>
                  </div>
                ))}
              </section>

              {/* Skills */}
              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
                  Technical Skills
                </h2>
                <ul className="list-disc ml-5 mt-4">
                  {formData.skills.slice(0, 5).map((skill, index) => (
                    <li key={index} className="text-sm">
                      {skill.skill || "Skill"} - {skill.skillLevel || "Level"}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Achievements */}
              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
                  Achievements
                </h2>
                <div className="space-y-2 text-sm">
                  {formData.achievements?.map((achievement, index) => (
                    <p key={index}>{achievement || "Achievement"}</p>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div>
              {/* Experience */}
              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
                  Experience
                </h2>
                {formData.experience.slice(0, 3).map((exp, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-semibold">
                      {exp.jobTitle || "Job Title"} -{" "}
                      {exp.companyName || "Company"}
                    </p>
                    <p>{exp.yearsOfExperience || "Years"} years</p>
                    <p>{exp.description || "Description"}</p>
                  </div>
                ))}
              </section>

              {/* Projects */}
              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
                  Projects
                </h2>
                {formData.projects.slice(0, 2).map((project, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-semibold">
                      {project.title || "Project Title"}
                    </p>
                    <p>{project.description || "Description"}</p>
                    <p>
                      Technologies: {project.technologies || "Technologies"}
                    </p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewLayout1;
