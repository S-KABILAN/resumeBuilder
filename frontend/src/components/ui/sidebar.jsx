const Sidebar = ({ onMenuClick }) => {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-gray-50 h-screen flex flex-col">
      <div className="px-4 py-6">
        <h1 className="text-2xl text-center font-bold text-gray-800">
          Resume Builder
        </h1>
        <p className="text-gray-500 text-center">Welcome, asdf</p>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-4 px-4">
          <li
            onClick={() => onMenuClick("Home")}
            className="text-gray-700 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => onMenuClick("Create Resume")}
            className="text-gray-700 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer"
          >
            Create Resume
          </li>
          <li
            onClick={() => onMenuClick("My Resumes")}
            className="text-gray-700 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer"
          >
            My Resumes
          </li>
          <li
            onClick={() => onMenuClick("Settings")}
            className="text-gray-700 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer"
          >
            Settings
          </li>
        </ul>
      </nav>
      <div className="px-4 py-3 mt-auto">
        <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
