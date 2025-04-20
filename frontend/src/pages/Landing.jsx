import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaRegFileAlt,
  FaLightbulb,
  FaRegClock,
  FaDownload,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// Import or define image URLs - Use local images if possible
const images = [
  "/images/resume1.jpg",
  "/images/resume2.jpg",
  "/images/resume3.jpg",
  "/images/resume4.jpg",
  "/images/resume5.jpg",
];

// Fallback images from external source if local ones aren't available
const fallbackImages = [
  "https://img.freepik.com/free-vector/resume-concept-illustration_114360-91.jpg?w=800",
  "https://img.freepik.com/free-vector/online-resume-concept-illustration_114360-5164.jpg?w=800",
  "https://img.freepik.com/free-vector/hiring-concept-illustration_114360-532.jpg?w=800",
  "https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg?w=800",
  "https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1474.jpg?w=800",
];

const Landing = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [useLocalImages, setUseLocalImages] = useState(true);
  const intervalRef = useRef(null);

  // Function to preload images and check which set to use
  useEffect(() => {
    // Try to load local images first
    const checkLocalImages = async () => {
      try {
        const responses = await Promise.all(
          images.map((src) =>
            fetch(src)
              .then((res) => res.status === 200)
              .catch(() => false)
          )
        );

        // If any local image fails to load, use fallback images
        if (responses.some((success) => !success)) {
          console.log(
            "Using fallback images due to local image loading failures"
          );
          setUseLocalImages(false);
        }

        setImagesLoaded(true);
      } catch (error) {
        console.error("Error checking images:", error);
        setUseLocalImages(false);
        setImagesLoaded(true);
      }
    };

    checkLocalImages();
  }, []);

  // Set up the image rotation interval
  useEffect(() => {
    if (imagesLoaded) {
      console.log("Starting carousel interval");
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          const newIndex =
            (prevIndex + 1) %
            (useLocalImages ? images.length : fallbackImages.length);
          console.log(`Changing image from ${prevIndex} to ${newIndex}`);
          return newIndex;
        });
      }, 3000);

      return () => {
        console.log("Clearing carousel interval");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [imagesLoaded, useLocalImages]);

  const goToLogin = () => {
    navigate("/login");
  };

  const goToPrevImage = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCurrentImageIndex((prevIndex) => {
      const imgCount = useLocalImages ? images.length : fallbackImages.length;
      const newIndex = prevIndex === 0 ? imgCount - 1 : prevIndex - 1;
      console.log(`Manual change to previous image: ${newIndex}`);
      return newIndex;
    });

    // Restart the interval
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          (useLocalImages ? images.length : fallbackImages.length)
      );
    }, 3000);
  };

  const goToNextImage = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCurrentImageIndex((prevIndex) => {
      const imgCount = useLocalImages ? images.length : fallbackImages.length;
      const newIndex = (prevIndex + 1) % imgCount;
      console.log(`Manual change to next image: ${newIndex}`);
      return newIndex;
    });

    // Restart the interval
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          (useLocalImages ? images.length : fallbackImages.length)
      );
    }, 3000);
  };

  // The actual images to use based on availability
  const currentImages = useLocalImages ? images : fallbackImages;

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

                {/* Image Carousel */}
                <div className="relative">
                  <div
                    className="carousel-container relative overflow-hidden rounded-lg shadow-2xl"
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "300px",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    {!imagesLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

                    {imagesLoaded &&
                      currentImages.map((image, index) => (
                        <div
                          key={index}
                          className={`carousel-slide absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                            index === currentImageIndex
                              ? "opacity-100 z-10"
                              : "opacity-0 z-0"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Resume Builder Slide ${index + 1}`}
                            className="max-w-full max-h-full object-contain"
                            onError={() => {
                              console.log(`Image failed to load: ${image}`);
                              if (useLocalImages) {
                                console.log("Switching to fallback images");
                                setUseLocalImages(false);
                              }
                            }}
                          />
                        </div>
                      ))}

                    {/* Navigation buttons */}
                    {imagesLoaded && (
                      <>
                        <button
                          onClick={goToPrevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 focus:outline-none transition-all"
                          aria-label="Previous image"
                        >
                          <FaChevronLeft className="text-indigo-700" />
                        </button>
                        <button
                          onClick={goToNextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 focus:outline-none transition-all"
                          aria-label="Next image"
                        >
                          <FaChevronRight className="text-indigo-700" />
                        </button>

                        {/* Dots indicators */}
                        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 z-20">
                          {currentImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                // Clear the existing interval
                                if (intervalRef.current) {
                                  clearInterval(intervalRef.current);
                                }

                                // Set the current image
                                setCurrentImageIndex(index);
                                console.log(
                                  `Dot clicked: changing to image ${index}`
                                );

                                // Restart the interval
                                intervalRef.current = setInterval(() => {
                                  setCurrentImageIndex(
                                    (prevIndex) =>
                                      (prevIndex + 1) % currentImages.length
                                  );
                                }, 3000);
                              }}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? "bg-indigo-600 w-4"
                                  : "bg-gray-300 hover:bg-gray-400"
                              }`}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
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
