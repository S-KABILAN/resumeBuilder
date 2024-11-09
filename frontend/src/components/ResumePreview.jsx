// ResumePreview.js
const ResumePreview = ({ formData }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900">
          {formData.personal?.name || "John Doe"}
        </h1>
        <p className="text-lg text-gray-600">
          {formData.personal?.email || "johndoe@example.com"}
        </p>
        <p className="text-lg text-gray-600">
          {formData.personal?.phone || "(123) 456-7890"}
        </p>
        <p className="text-lg text-gray-600">
          {formData.personal?.location || "City, Country"}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
        {formData.education.map((edu, index) => (
          <div key={index} className="mt-4">
            <p className="text-lg font-semibold">{edu.degree || "Degree"}</p>
            <p className="text-md text-gray-600">
              {edu.institution || "Institution"}
            </p>
            <p className="text-md text-gray-600">
              {edu.graduationYear || "Graduation Year"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview;
