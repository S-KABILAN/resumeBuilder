
const ResumeTemplate = ({ data }) => (
  
  <div className="max-w-[800px] mx-auto p-8 bg-white">
    {/* Header */}
    <header className="text-center mb-8">
      <h1 className="text-4xl font-light mb-2">
        {data.fullName || "Your Name"}
      </h1>
      <div className="text-sm text-gray-600">
        {data.portfolio && <span>My Portfolio | </span>}
        {data.github && <span>GitHub Profile | </span>}
        {data.linkedin && <span>LinkedIn Profile</span>}
      </div>
      <div className="text-sm text-gray-600 mt-1">
        {data.email && <span>{data.email}</span>}
        {data.phone && <span> | {data.phone}</span>}
        {data.location && <span> | {data.location}</span>}
      </div>
    </header>

    <div className="grid grid-cols-[2fr_3fr] gap-8">
      {/* Left Column */}
      <div>
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
            Education
          </h2>
          <div className="space-y-3 text-sm">
            {data.education && (
              <div className="whitespace-pre-line">{data.education}</div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
            Technical Skills
          </h2>
          <div className="space-y-2 text-sm">
            {data.skills && (
              <div className="whitespace-pre-line">{data.skills}</div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
            Achievements
          </h2>
          <div className="space-y-2 text-sm">
            {data.achievements && (
              <div className="whitespace-pre-line">{data.achievements}</div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
            Course Work
          </h2>
          <div className="space-y-2 text-sm">
            {data.courseWork && (
              <div className="whitespace-pre-line">{data.courseWork}</div>
            )}
          </div>
        </section>
      </div>

      {/* Right Column */}
      <div>
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
            Experience
          </h2>
          <div className="space-y-4 text-sm">
            {data.experience && (
              <div className="whitespace-pre-line">{data.experience}</div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-medium mb-3 uppercase tracking-wider text-gray-700">
            Projects
          </h2>
          <div className="space-y-4 text-sm">
            {data.projects && (
              <div className="whitespace-pre-line">{data.projects}</div>
            )}
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default ResumeTemplate