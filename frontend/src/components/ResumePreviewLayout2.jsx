const ResumePreviewImproved = ({ formData }) => {
  return (
    <div className="h-full max-w-[21cm] mx-auto bg-gray-100 p-6">
      <div className="bg-white p-6 shadow-lg rounded-lg space-y-6 max-w-[21cm] mx-auto">
        {/* Header Section */}
        <header className="text-center mb-6">
          <h1 className="text-4xl font-semibold text-gray-800">
            {formData.personal?.name || "John Doe"}
          </h1>
          <p className="text-xl font-medium text-gray-600">
            {formData.personal?.jobTitle || "Job Title"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {formData.personal?.location || "City, Country"}
          </p>
        </header>

        {/* Contact Information */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Info</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <i className="fas fa-envelope text-gray-600 mr-2"></i>
              <strong>Email: </strong>
              {formData.personal?.email || "johndoe@example.com"}
            </li>
            <li className="flex items-center">
              <i className="fas fa-phone-alt text-gray-600 mr-2"></i>
              <strong>Phone: </strong>
              {formData.personal?.phone || "(123) 456-7890"}
            </li>
            {formData.personal?.github && (
              <li className="flex items-center">
                <i className="fab fa-github text-gray-600 mr-2"></i>
                <strong>GitHub: </strong>
                <a
                  href={formData.personal.github}
                  className="text-blue-500 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formData.personal.github}
                </a>
              </li>
            )}
            {formData.personal?.linkedin && (
              <li className="flex items-center">
                <i className="fab fa-linkedin text-gray-600 mr-2"></i>
                <strong>LinkedIn: </strong>
                <a
                  href={formData.personal.linkedin}
                  className="text-blue-500 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formData.personal.linkedin}
                </a>
              </li>
            )}
          </ul>
        </section>

        {/* Education Section */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
          {formData.education.slice(0, 3).map((edu, index) => (
            <div key={index} className="mb-3">
              <p className="font-semibold text-lg">{edu.degree || "Degree"}</p>
              <p className="text-gray-600">
                {edu.institution || "Institution"} -{" "}
                {edu.graduationYear || "Year"}
              </p>
            </div>
          ))}
        </section>

        {/* Experience Section */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Experience</h2>
          {formData.experience.slice(0, 3).map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-lg">
                {exp.jobTitle || "Job Title"} - {exp.companyName || "Company"}
              </p>
              <p className="text-sm text-gray-600">
                {exp.yearsOfExperience || "Years"} years
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {exp.description || "Description"}
              </p>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
          <ul className="list-disc pl-6 space-y-1 text-gray-600">
            {formData.skills.slice(0, 5).map((skill, index) => (
              <li key={index}>
                <strong>{skill.skillType || "Skill"}: </strong>
                {skill.skillName || "Level"}
              </li>
            ))}
          </ul>
        </section>

        {/* Projects Section */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
          {formData.projects.slice(0, 2).map((project, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-lg">
                {project.title || "Project Title"}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {project.description || "Description"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Technologies: {project.technologiesUsed || "Technologies"}
              </p>
            </div>
          ))}
        </section>

        {/* Certifications Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">
            Certifications
          </h2>
          {formData.certifications.slice(0, 3).map((cert, index) => (
            <div key={index} className="mb-3">
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
    </div>
  );
};

export default ResumePreviewImproved;
