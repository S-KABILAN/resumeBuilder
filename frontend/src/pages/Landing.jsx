import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaRegFileAlt,
  FaDownload,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaCogs,
  FaDesktop,
} from "react-icons/fa";
import { getImageWithFallback, fallbackImageBase64 } from "../utils/imageUtils";

// Define application images to show in the carousel
const appImages = [
  {
    src: "home.png",
    alt: "Resume Builder Dashboard",
    caption: "User-friendly dashboard to manage all your resumes",
  },
  {
    src: "create-resume.png",
    alt: "Resume Creation Process",
    caption: "Simple step-by-step process to create your resume",
  },
  {
    src: "resume-templates1.png",
    alt: "Available Resume Templates",
    caption: "Choose from numerous professional templates",
  },
  {
    src: "section-rearrange.png",
    alt: "Section Customization",
    caption: "Easily rearrange and customize resume sections",
  },
  {
    src: "template-cutomization.png",
    alt: "Template Customization",
    caption: "Personalize templates to match your style",
  },
  {
    src: "settings.png",
    alt: "Application Settings",
    caption: "Configure settings to suit your preferences",
  },
  {
    src: "Screenshot 2025-04-26 162120.png",
    alt: "Resume Builder Features",
    caption: "Additional tools and features to enhance your resume",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  // Set up the image rotation interval
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % appImages.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToPrevImage = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? appImages.length - 1 : prevIndex - 1
    );

    // Restart the interval
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % appImages.length);
    }, 3000);
  };

  const goToNextImage = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % appImages.length);

    // Restart the interval
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % appImages.length);
    }, 3000);
  };

  const goToSlide = (index) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCurrentImageIndex(index);

    // Restart the interval
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % appImages.length);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 via-white to-indigo-50 overflow-hidden">
      {/* Header */}
      <nav className="py-4 px-6 sm:px-10 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-sm z-30 border-b border-gray-100 shadow-sm">
        <div className="flex items-center">
          <FaRegFileAlt className="text-indigo-600 text-xl mr-2" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Resume Builder
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/S-KABILAN/resume-builder"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg font-medium text-white bg-gray-800 hover:bg-black transition-colors shadow-sm flex items-center group"
          >
            <FaGithub className="mr-2" />
            <span>Star</span>
            <FaStar className="ml-2 text-yellow-400 animate-pulse group-hover:animate-spin" />
          </a>
          <button
            onClick={goToLogin}
            className="px-4 sm:px-6 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 pb-20 px-4 md:px-8 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto z-10 relative">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left order-2 md:order-1">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-4 animate-fadeIn">
                # Resume Builder Tool
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight animate-slideUp">
                Create Professional Resumes in{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Minutes
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 animate-slideUp animation-delay-200">
                Stand out from the crowd with a beautifully designed resume. No
                design skills needed. Free and easy to use.
              </p>

              {/* Features as bullet points */}
              <div className="mb-8 sm:mb-10 grid gap-3 animate-slideUp animation-delay-300">
                <div className="flex items-center transform hover:translate-x-1 transition-transform">
                  <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Professional ATS-friendly templates
                  </span>
                </div>
                <div className="flex items-center transform hover:translate-x-1 transition-transform">
                  <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Easy-to-use drag-and-drop builder
                  </span>
                </div>
                <div className="flex items-center transform hover:translate-x-1 transition-transform">
                  <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Export to multiple formats
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-slideUp animation-delay-400">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-6 py-3 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  <FaRegFileAlt className="mr-2" />
                  Create Resume Now
                </button>
                <button
                  onClick={goToLogin}
                  className="px-6 py-3 rounded-lg font-medium border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center transform hover:-translate-y-1 transition-all"
                >
                  Sign In <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>

            {/* Right Column - Image Carousel */}
            <div className="flex justify-center order-1 md:order-2 animate-fadeIn">
              <div ref={carouselRef} className="relative w-full max-w-xl">
                {/* Enhanced Image Carousel */}
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-30 animate-pulse"></div>

                  <div className="carousel-container relative overflow-hidden rounded-lg shadow-2xl bg-white">
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-50 rounded-xl overflow-hidden">
                      <div
                        className="relative"
                        style={{ paddingBottom: "60%" }}
                      >
                        {appImages.map((image, index) => (
                          <div
                            key={image.src}
                            className={`absolute inset-0 transition-opacity duration-500 ${
                              index === currentImageIndex
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            style={{
                              zIndex: index === currentImageIndex ? 1 : 0,
                            }}
                          >
                            <img
                              src={getImageWithFallback(image.src)}
                              alt={image.alt}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                console.error(
                                  `Failed to load image: ${image.src}`
                                );
                                e.target.src = fallbackImageBase64;
                              }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-sm md:text-base">
                              {image.caption}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation buttons */}
                    <button
                      onClick={goToPrevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-indigo-700 rounded-full p-3 shadow-lg focus:outline-none transition-all hover:scale-110"
                      aria-label="Previous image"
                    >
                      <FaChevronLeft size={18} />
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-indigo-700 rounded-full p-3 shadow-lg focus:outline-none transition-all hover:scale-110"
                      aria-label="Next image"
                    >
                      <FaChevronRight size={18} />
                    </button>

                    {/* Dots indicators */}
                    <div className="absolute bottom-12 left-0 right-0 flex justify-center space-x-2 z-20">
                      {appImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? "bg-white w-6"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Everything you need to create impressive resumes that help you
              land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-5">
                <FaDesktop className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professional, ATS-friendly templates
                designed to impress recruiters.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-5">
                <FaCogs className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Customizable Sections
              </h3>
              <p className="text-gray-600">
                Drag and drop to rearrange sections, customize content, and
                tailor your resume to specific jobs.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-5">
                <FaDownload className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">One-Click Export</h3>
              <p className="text-gray-600">
                Download your resume as a PDF with a single click and apply for
                jobs immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FaRegFileAlt className="text-indigo-600 mr-2" />
            <span className="font-semibold text-gray-800">Resume Builder</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/S-KABILAN/resume-builder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-4 sm:text-center md:mt-0">
            © {new Date().getFullYear()} Resume Builder • Made with ❤️ by
            Kabilan S
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

// Add these animations to your CSS or tailwind config
// .animation-delay-200 { animation-delay: 0.2s; }
// .animation-delay-300 { animation-delay: 0.3s; }
// .animation-delay-400 { animation-delay: 0.4s; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
// .animate-fadeIn { animation: fadeIn 1s ease forwards; }
// .animate-slideUp { animation: slideUp 1s ease forwards; }
