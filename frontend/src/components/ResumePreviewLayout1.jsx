import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";

const ResumePreviewLayout1 = ({ formData }) => {
  const resumeRef = useRef();

  const handleDownloadPDF = async () => {
    const input = resumeRef.current;
    if (input) {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // A4 size in mm: 210 x 297
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = 297;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Resume.pdf");
    }
  };

  return (
    <div className=" h-screen max-w-4xl mx-auto">
      {/* <button
        onClick={handleDownloadPDF}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center w-full sm:w-auto"
      >
        <FaDownload className="mr-2" />
        Download as PDF
      </button> */}

      <div
        ref={resumeRef}
        className="mx-auto bg-white shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-light mb-2 text-gray-800">
              {formData.personal?.name || "John Doe"}
            </h1>
            <div className="text-sm text-gray-600 mb-2">
              {formData.personal?.email || "johndoe@example.com"} |{" "}
              {formData.personal?.phone || "(123) 456-7890"} |{" "}
              {formData.personal?.location || "City, Country"}
            </div>
            <div className="flex justify-center space-x-4">
              {formData.personal?.github && (
                <a
                  href={formData.personal.github}
                  className="text-blue-500 hover:text-blue-600 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="inline mr-1" />
                  GitHub
                </a>
              )}
              {formData.personal?.linkedin && (
                <a
                  href={formData.personal.linkedin}
                  className="text-blue-500 hover:text-blue-600 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="inline mr-1" />
                  LinkedIn
                </a>
              )}
            </div>
          </header>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 text-gray-700 border-b border-gray-300 pb-1">
                  Education
                </h2>
                {formData.education.slice(0, 3).map((edu, index) => (
                  <div key={index} className="mb-3">
                    <p className="font-semibold text-sm">
                      {edu.degree || "Degree"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {edu.institution || "Institution"},{" "}
                      {edu.graduationYear || "Year"}
                    </p>
                  </div>
                ))}
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 text-gray-700 border-b border-gray-300 pb-1">
                  Skills
                </h2>
                <ul className="list-disc ml-5 text-sm">
                  {formData.skills.slice(0, 5).map((skill, index) => (
                    <li key={index}>
                      {skill.skillType || "Skill"}: {skill.skillName || "Level"}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 text-gray-700 border-b border-gray-300 pb-1">
                  Certifications
                </h2>
                {formData.certifications.slice(0, 3).map((cert, index) => (
                  <div key={index} className="mb-2 text-sm">
                    <p className="font-semibold">
                      {cert.certificationName || "Certification"}
                    </p>
                    <p className="text-gray-600">
                      {cert.issuingOrganization || "Organization"}
                    </p>
                  </div>
                ))}
              </section>
            </div>

            <div className="col-span-2">
              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 text-gray-700 border-b border-gray-300 pb-1">
                  Experience
                </h2>
                {formData.experience.slice(0, 3).map((exp, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold text-sm">
                      {exp.jobTitle || "Job Title"} -{" "}
                      {exp.companyName || "Company"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {exp.yearsOfExperience || "Years"} years
                    </p>
                    <p className="text-sm mt-1">
                      {exp.description || "Description"}
                    </p>
                  </div>
                ))}
              </section>

              <section className="mb-6">
                <h2 className="text-lg font-medium mb-3 text-gray-700 border-b border-gray-300 pb-1">
                  Projects
                </h2>
                {formData.projects.slice(0, 2).map((project, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold text-sm">
                      {project.title || "Project Title"}
                    </p>
                    <p className="text-sm mt-1">
                      {project.description || "Description"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Technologies: {project.technologiesUsed || "Technologies"}
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
