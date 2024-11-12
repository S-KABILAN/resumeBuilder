import ResumePreviewLayout1 from "./ResumePreviewLayout1";
import ResumePreviewLayout2 from "./ResumePreviewLayout2";

const ResumeTemplates = ({ onSelectTemplate, formData }) => {
  const previewWidth = 210; // width in pixels to approximate A4 proportions
  const previewHeight = 297; // height in pixels to approximate A4 proportions

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose a Resume Template</h2>
      <div className="flex space-x-4">
        <div
          className="border p-4 cursor-pointer"
          onClick={() => onSelectTemplate("Layout1")}
        >
          <h3 className="text-lg font-bold mb-2">Template 1</h3>
          {/* Render ResumePreviewLayout1 with fixed dimensions */}
          <div
            className="overflow-hidden border"
            style={{
              width: `${previewWidth}px`,
              height: `${previewHeight}px`,
            }}
          >
            <ResumePreviewLayout1 formData={formData} />
          </div>
        </div>
        <div
          className="border p-4 cursor-pointer"
          onClick={() => onSelectTemplate("Layout2")}
        >
          <h3 className="text-lg font-bold mb-2">Template 2</h3>
          {/* Render ResumePreviewLayout2 with fixed dimensions */}
          <div
            className="overflow-hidden border"
            style={{
              width: `${previewWidth}px`,
              height: `${previewHeight}px`,
            }}
          >
            <ResumePreviewLayout2 formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplates;
