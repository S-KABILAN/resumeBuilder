const ResumePreviewLayout2 = ({ formData }) => {
  return (
    <div className="h-screen p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200 flex flex-col">
      {/* Personal Info */}
      <div className="text-center border-b pb-4 mb-4 flex-shrink-0">
        <h1 className="text-3xl font-bold truncate">
          {formData.personal?.name || "John Doe"}
        </h1>
        <p className="text-gray-500 truncate">
          {formData.personal?.email || "johndoe@example.com"} |{" "}
          {formData.personal?.phone || "(123) 456-7890"}
        </p>
        <p className="text-gray-500 truncate">
          {formData.personal?.location || "City, Country"}
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href={formData.personal?.github}
            className="text-blue-500 hover:underline truncate"
          >
            {formData.personal?.github || "GitHub"}
          </a>
          <a
            href={formData.personal?.linkedin}
            className="text-blue-500 hover:underline truncate"
          >
            {formData.personal?.linkedin || "LinkedIn"}
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow grid grid-cols-2 gap-8 overflow-hidden">
        {/* Education */}
        <div className="overflow-hidden">
          <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index}>
                <p className="font-semibold truncate">
                  {edu.degree || "Degree"}
                </p>
                <p className="truncate">
                  {edu.institution || "Institution"},{" "}
                  {edu.graduationYear || "Year"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="overflow-hidden">
          <h2 className="text-xl font-semibold border-b pb-2">Experience</h2>
          <div className="space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index}>
                <p className="font-semibold truncate">
                  {exp.jobTitle || "Job Title"} - {exp.companyName || "Company"}
                </p>
                <p className="truncate">
                  {exp.yearsOfExperience || "Years"} years
                </p>
                <p className="truncate">{exp.description || "Description"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-8 overflow-hidden flex-shrink-0">
        <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
        <ul className="list-disc ml-5 space-y-1">
          {formData.skills.map((skill, index) => (
            <li key={index}>
              {skill.skill || "Skill"} - {skill.skillLevel || "Skill Level"}
            </li>
          ))}
        </ul>
      </div>

      {/* Projects and Certifications */}
      <div className="grid grid-cols-2 gap-8 mt-8 flex-shrink-0 overflow-hidden">
        {/* Projects */}
        <div>
          <h2 className="text-xl font-semibold border-b pb-2">Projects</h2>
          <div className="space-y-4">
            {formData.projects.map((project, index) => (
              <div key={index}>
                <p className="font-semibold truncate">
                  {project.title || "Project Title"}
                </p>
                <p className="truncate">
                  {project.description || "Description"}
                </p>
                <p className="truncate">
                  Technologies: {project.technologies || "Technologies"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h2 className="text-xl font-semibold border-b pb-2">
            Certifications
          </h2>
          <div className="space-y-4">
            {formData.certifications.map((cert, index) => (
              <div key={index}>
                <p className="font-semibold truncate">
                  {cert.certificationName || "Certification Name"}
                </p>
                <p className="truncate">
                  Issued by: {cert.issuingOrganization || "Organization"}
                </p>
                <p className="truncate">Date: {cert.dateObtained || "Date"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewLayout2;
