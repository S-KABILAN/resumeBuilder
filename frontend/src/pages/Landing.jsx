import { useNavigate } from "react-router-dom";
import {
  FaRegFileAlt,
  FaLightbulb,
  FaRegClock,
  FaDownload,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
} from "react-icons/fa";

// Import or define image URL
const heroImage =
  "https://img.freepik.com/free-vector/resume-concept-illustration_114360-91.jpg?w=1800";

const Landing = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="md:h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-white to-indigo-50 overflow-hidden">
      {/* Header */}
      <nav className="py-4 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <FaRegFileAlt className="text-indigo-600 text-xl mr-2" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Resume Builder
          </span>
        </div>
        <button
          onClick={goToLogin}
          className="px-4 sm:px-6 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Login
        </button>
      </nav>

      {/* Main Content - Single Screen */}
      <main className="flex-1 flex items-center justify-center px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl w-full z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-left order-2 md:order-1">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4">
                # Resume Builder Tool
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Create Professional Resumes in{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Minutes
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Stand out from the crowd with a beautifully designed resume. No
                design skills needed. Free and easy to use.
              </p>

              {/* Features as bullet points */}
              <div className="mb-4 sm:mb-6 grid gap-2">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Professional ATS-friendly templates
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Easy-to-use drag-and-drop builder
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Export to multiple formats
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={goToLogin}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                >
                  Get Started <FaArrowRight className="ml-2" />
                </button>
                <button
                  onClick={goToLogin}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-all"
                >
                  View Templates
                </button>
              </div>
            </div>

            <div className="flex justify-center order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25"></div>
                <div className="relative">
                  <img
                    src={heroImage}
                    alt="Resume Builder"
                    className="rounded-lg shadow-2xl"
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "auto",
                      maxHeight: "500px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Feature icons floating on the image */}
                <div className="absolute -bottom-6 right-8 flex space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <FaLightbulb className="text-indigo-600 text-sm sm:text-base" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <FaRegClock className="text-indigo-600 text-sm sm:text-base" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <FaDownload className="text-indigo-600 text-sm sm:text-base" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-3 px-4 sm:px-8 text-center text-xs sm:text-sm text-gray-500 border-t border-gray-200">
        <div className="flex justify-center space-x-4 mb-1">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-indigo-600"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-indigo-600"
          >
            <FaLinkedin />
          </a>
        </div>
        <p className="flex items-center justify-center">
          © {new Date().getFullYear()} Resume Builder • Made with{" "}
          <span className="text-red-500 mx-1">❤️</span> by Kabilan S
        </p>
      </footer>
    </div>
  );
};

export default Landing;
