const ResumePreviewLayout2 = ({ formData }) => {
  return (
    <div className="h-screen max-w-4xl mx-auto bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-800">
              {formData.personal?.name || "Kabilan S"}
            </h1>
            <div className="text-sm text-gray-600 mb-4">
              {formData.personal?.email || "kabilanselvakumar313@gmail.com"} |{" "}
              {formData.personal?.phone || "+91 6383438049"} |{" "}
              {formData.personal?.location || "City, Country"}
            </div>
            <div className="flex justify-center space-x-4">
              {formData.personal?.linkedin && (
                <a
                  href={formData.personal.linkedin}
                  className="text-blue-500 hover:text-blue-600 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              )}
              {formData.personal?.github && (
                <a
                  href={formData.personal.github}
                  className="text-blue-500 hover:text-blue-600 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}
            </div>
          </header>

          {/* Education Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              EDUCATION
            </h2>
            {formData.education.slice(0, 2).map((edu, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold text-gray-800">
                  {edu.institution || "Saranathan college of engineering"}
                </p>
                <p className="text-sm text-gray-600">
                  {edu.graduationYear || "2021-2025"}
                </p>
                <p className="text-sm text-gray-600">
                  {edu.degree || "Information Technology"}
                </p>
              </div>
            ))}
          </section>

          {/* Skills Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              SKILL
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
              {formData.skills.slice(0, 6).map((skill, index) => (
                <li key={index}>{skill.skillName || "Problem solving"}</li>
              ))}
            </ul>
          </section>

          {/* Experience Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              WORK EXPERIENCE
            </h2>
            {formData.experience.slice(0, 3).map((exp, index) => (
              <div key={index} className="mb-6">
                <p className="font-semibold text-gray-800">
                  {exp.companyName || "UTILIZED"} -{" "}
                  {exp.jobTitle || "Front-End Developer Intern"}
                </p>
                <p className="text-sm text-gray-600">
                  {exp.yearsOfExperience || "2024-NOW"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {exp.description ||
                    "Developed and optimized website components, including frontend design for student and admin interfaces, ensuring efficient and responsive performance with low latency."}
                </p>
              </div>
            ))}
          </section>

          {/* Projects Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
              PROJECTS
            </h2>
            {formData.projects.slice(0, 2).map((project, index) => (
              <div key={index} className="mb-6">
                <p className="font-semibold text-gray-800">
                  {project.title || "Resume Builder"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {project.description ||
                    "A resume builder app designed to generate your resume by filling out the required form details, ensuring compliance with industry standards."}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Technologies: {project.technologiesUsed || "Technologies"}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewLayout2;
