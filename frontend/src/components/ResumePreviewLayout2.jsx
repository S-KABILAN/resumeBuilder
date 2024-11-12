const ResumePreviewLayout2 = ({ formData }) => {
  return (
    <div
      className="p-8 bg-gray-50 rounded-lg shadow-lg border border-gray-200 overflow-hidden"

    >
      {/* Personal Info */}
      <div className="text-center border-b pb-4 mb-4">
        <h1 className="text-3xl font-bold">
          {formData.personal?.name || "John Doe"}
        </h1>
        <p className="text-gray-500">
          {formData.personal?.email || "johndoe@example.com"} |{" "}
          {formData.personal?.phone || "(123) 456-7890"}
        </p>
        <p className="text-gray-500">
          {formData.personal?.location || "City, Country"}
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href={formData.personal?.github}
            className="text-blue-500 hover:underline"
          >
            {formData.personal?.github || "GitHub"}
          </a>
          <a
            href={formData.personal?.linkedin}
            className="text-blue-500 hover:underline"
          >
            {formData.personal?.linkedin || "LinkedIn"}
          </a>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-2 gap-8">
        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold border-b pb-2">Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="mt-4">
              <p className="font-semibold">{edu.degree || "Degree"}</p>
              <p>
                {edu.institution || "Institution"},{" "}
                {edu.graduationYear || "Year"}
              </p>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-xl font-semibold border-b pb-2">Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mt-4">
              <p className="font-semibold">
                {exp.jobTitle || "Job Title"} - {exp.companyName || "Company"}
              </p>
              <p>{exp.yearsOfExperience || "Years"} years</p>
              <p>{exp.description || "Description"}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold border-b pb-2">Skills</h2>
        <ul className="list-disc ml-5">
          {formData.skills.map((skill, index) => (
            <li key={index}>
              {skill.skill || "Skill"} - {skill.skillLevel || "Skill Level"}
            </li>
          ))}
        </ul>
      </div>

      {/* Projects and Certifications in Two Columns */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-xl font-semibold border-b pb-2">Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="mt-4">
              <p className="font-semibold">
                {project.title || "Project Title"}
              </p>
              <p>{project.description || "Description"}</p>
              <p>Technologies: {project.technologies || "Technologies"}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold border-b pb-2">
            Certifications
          </h2>
          {formData.certifications.map((cert, index) => (
            <div key={index} className="mt-4">
              <p className="font-semibold">
                {cert.certificationName || "Certification Name"}
              </p>
              <p>Issued by: {cert.issuingOrganization || "Organization"}</p>
              <p>Date: {cert.dateObtained || "Date"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewLayout2;
