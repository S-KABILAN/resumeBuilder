// Footer.js
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-2 md:mb-0">
          <p className="font-bold text-lg">Resume Builder</p>
          <p className="text-xs text-indigo-200">
            Create professional resumes in minutes
          </p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-sm font-medium">Made with ❤️ by Kabilan S</p>
          <p className="text-xs text-indigo-200">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
