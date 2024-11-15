import ResumePreviewLayout1 from "./ResumePreviewLayout1";
import ResumePreviewLayout2 from "./ResumePreviewLayout2";

const ResumeTemplates = ({ onSelectTemplate, formData }) => {
  const previewWidth = 210; // width in pixels to approximate A4 proportions
  const previewHeight = 297; // height in pixels to approximate A4 proportions

  const templates = [
    { id: "Layout1", name: "Modern Clean", component: ResumePreviewLayout1 },
    {
      id: "Layout2",
      name: "Professional Classic",
      component: ResumePreviewLayout2,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Choose a Resume Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">{template.name}</h3>
              <div
                className="border rounded-md overflow-hidden mb-4 mx-auto"
                style={{
                  width: `${previewWidth}px`,
                  height: `${previewHeight}px`,
                  transform: "scale(0.9)",
                  transformOrigin: "top center",
                }}
              >
                <template.component formData={formData} />
              </div>
              <button
                onClick={() => onSelectTemplate(template.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Select Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
