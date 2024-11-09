const PersonalInfoForm = ({ formData, onFormChange }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Personal Information</h2>
      <form className="space-y-4 mt-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onFormChange("name", e.target.value)}
            placeholder="Enter your name"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onFormChange("title", e.target.value)}
            placeholder="Enter your job title"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onFormChange("email", e.target.value)}
            placeholder="Enter your email"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => onFormChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => onFormChange("location", e.target.value)}
            placeholder="Enter your location"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm">LinkedIn</label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => onFormChange("linkedin", e.target.value)}
            placeholder="Enter your LinkedIn URL"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm">GitHub</label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => onFormChange("github", e.target.value)}
            placeholder="Enter your GitHub URL"
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </form>
    </div>
  );
};


export default PersonalInfoForm