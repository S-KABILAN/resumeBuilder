import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Layout1Preview from "../assets/resume1.png"; // Example image paths
import Layout2Preview from "../assets/resume2.png";
import Layout3Preview from "../assets/resume2.png"; // Temporarily reusing Layout2 image
import TemplateCustomizer from "./TemplateCustomizer";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaTags,
  FaRegStar,
  FaStar,
  FaArrowLeft,
  FaEye,
  FaTh,
  FaList,
} from "react-icons/fa";

const ResumeTemplates = ({
  onSelectTemplate,
  initialTemplateSettings,
  onNavigateBack,
  // eslint-disable-next-line no-unused-vars
  formData,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 4;

  // Default template settings
  const [templateSettings, setTemplateSettings] = useState(
    initialTemplateSettings || {
      colors: {
        primary: "#2563eb",
        secondary: "#1e40af",
        accent: "#3b82f6",
        text: "#1f2937",
        background: "#ffffff",
      },
      font: "ui-sans-serif, system-ui, sans-serif",
      spacing: "normal",
      sectionOrder: [
        "education",
        "experience",
        "skills",
        "projects",
        "certifications",
      ],
    }
  );

  const templates = [
    {
      id: "Layout1",
      name: "Modern Clean",
      image: Layout1Preview,
      description:
        "A modern, clean layout with a two-column design that emphasizes readability.",
      category: "modern",
      popular: true,
    },
    {
      id: "Layout2",
      name: "Professional Classic",
      image: Layout2Preview,
      description:
        "A traditional single-column layout that presents your information in a clear, straightforward manner.",
      category: "classic",
      popular: true,
    },
    {
      id: "Layout3",
      name: "Standard ATS-Friendly",
      image: Layout3Preview,
      description:
        "An optimized layout for Applicant Tracking Systems (ATS) with simple formatting and clear section headings.",
      category: "ats",
      popular: false,
    },
    {
      id: "ATSOptimized",
      name: "Maximum ATS Compatibility",
      image: Layout2Preview, // Using existing image for now
      description:
        "Specifically designed for maximum ATS compatibility. Uses semantic headings, strategic spacing, and industry-standard formatting to ensure your resume gets parsed correctly by all recruiting software.",
      category: "ats",
      popular: true,
    },
    {
      id: "MinimalistATS",
      name: "Minimalist ATS Format",
      image: Layout1Preview, // Using existing image with different tone for distinction
      description:
        "Ultra-clean minimalist layout optimized for ATS with compact spacing and essential formatting. Perfect for professionals who want maximum readability with a modern, understated appearance.",
      category: "minimal",
      popular: false,
    },
    {
      id: "ATSTwoColumnLayout1",
      name: "ATS Two-Column Modern",
      image: Layout2Preview, // Using existing image for now
      description:
        "An ATS-friendly design with a two-column layout that balances visual appeal with optimal parsing. Features skills and education in the left column with experience in the right column.",
      category: "ats",
      popular: false,
    },
    {
      id: "ATSTwoColumnLayout2",
      name: "ATS Two-Column Compact",
      image: Layout1Preview, // Using existing image for now
      description:
        "A compact two-column ATS-optimized layout with contact info and skills in a narrow left column, and the main content in a wider right column. Ideal for professionals with extensive experience.",
      category: "ats",
      popular: true,
    },
  ];

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteTemplates");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("favoriteTemplates", JSON.stringify(favorites));
  }, [favorites]);

  const handleSelectTemplate = (templateId) => {
    const template = templates.find((t) => t.id === templateId);
    setSelectedTemplate(template);

    // Show customizer after template selection
    setShowCustomizer(true);
  };

  const handleTemplateSettingsChange = (newSettings) => {
    setTemplateSettings(newSettings);
  };

  const handleFinalSelection = () => {
    // Pass both the template ID and the template settings to the parent component
    onSelectTemplate(selectedTemplate.id, templateSettings);
  };

  const toggleFavorite = (templateId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(templateId)) {
        return prevFavorites.filter((id) => id !== templateId);
      } else {
        return [...prevFavorites, templateId];
      }
    });
  };

  // Filter templates based on search term and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || categoryFilter === "favorites"
        ? true
        : template.category === categoryFilter;

    // Special case for favorites filter
    if (categoryFilter === "favorites") {
      return matchesSearch && favorites.includes(template.id);
    }

    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = filteredTemplates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);

  // Categories for filter
  const categories = [
    { id: "all", name: "All Templates" },
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "ats", name: "ATS-Friendly" },
    { id: "minimal", name: "Minimalist" },
    { id: "favorites", name: "My Favorites" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      {/* Header with navigation */}
      <div className="bg-white shadow-md py-6 px-4 mb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={onNavigateBack}
              className="btn btn-secondary flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Back to Editor
            </button>
            <h2 className="text-2xl font-bold text-gray-800 gradient-text">
              Choose Your Resume Template
            </h2>
            <div className="w-32">{/* Empty div for alignment */}</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        {selectedTemplate && showCustomizer ? (
          <div className="card bg-white p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {selectedTemplate.name}
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                {selectedTemplate.description}
              </p>
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => setShowCustomizer(false)}
                  className="btn btn-secondary flex items-center"
                >
                  <FaChevronLeft className="mr-2" />
                  Back to Templates
                </button>
                <button
                  onClick={handleFinalSelection}
                  className="btn btn-primary flex items-center"
                >
                  Use This Template
                  <FaChevronRight className="ml-2" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="order-2 lg:order-1">
                <TemplateCustomizer
                  templateSettings={templateSettings}
                  onSettingsChange={handleTemplateSettingsChange}
                />
              </div>

              <div className="order-1 lg:order-2">
                <div className="sticky top-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Preview
                  </h3>
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg hover-shadow transition-all">
                    <div className="relative">
                      <img
                        src={selectedTemplate.image}
                        alt={`${selectedTemplate.name} preview`}
                        className="w-full h-auto object-cover"
                        style={{
                          filter: `sepia(1) hue-rotate(${
                            templateSettings.colors.primary === "#2563eb"
                              ? "190deg"
                              : templateSettings.colors.primary === "#059669"
                              ? "120deg"
                              : templateSettings.colors.primary === "#7c3aed"
                              ? "270deg"
                              : templateSettings.colors.primary === "#be123c"
                              ? "330deg"
                              : "0deg"
                          }) saturate(${
                            templateSettings.colors.primary === "#4b5563"
                              ? "0.2"
                              : "1.5"
                          })`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center">
                        <button className="mb-4 btn btn-primary flex items-center">
                          <FaEye className="mr-2" />
                          Full Preview
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500 italic text-center">
                    This is a visual approximation. Your actual resume will look
                    even better!
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Search and filters */}
            <div className="card bg-white p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="relative w-full md:w-72">
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field w-full pl-10"
                  />
                  <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 whitespace-nowrap hidden md:inline-block">
                    <FaTags className="inline mr-1" /> Filter:
                  </span>
                  <div className="flex overflow-x-auto py-1 space-x-2 md:space-x-1 max-w-full">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setCategoryFilter(category.id)}
                        className={`py-1.5 px-3 rounded-full text-xs whitespace-nowrap transition-colors ${
                          categoryFilter === category.id
                            ? "bg-indigo-100 text-indigo-700 font-medium"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-500 mr-2 hidden md:inline-block">
                    View:
                  </span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md ${
                      viewMode === "grid"
                        ? "bg-gray-100 text-indigo-600"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                    aria-label="Grid view"
                  >
                    <FaTh size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md ${
                      viewMode === "list"
                        ? "bg-gray-100 text-indigo-600"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                    aria-label="List view"
                  >
                    <FaList size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* No results */}
            {filteredTemplates.length === 0 && (
              <div className="card bg-white p-10 text-center">
                <div className="text-7xl mb-4 text-gray-300">
                  <FaSearch className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No templates found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("all");
                  }}
                  className="btn btn-primary"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Templates display */}
            {filteredTemplates.length > 0 && (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {currentTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="card bg-white overflow-hidden hover-shadow transition-all duration-300 relative group"
                      >
                        <div className="relative">
                          <div className="relative overflow-hidden">
                            <img
                              src={template.image}
                              alt={`${template.name} preview`}
                              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                <button
                                  onClick={() =>
                                    handleSelectTemplate(template.id)
                                  }
                                  className="btn btn-primary mx-1 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300"
                                >
                                  Select Template
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Popular tag */}
                          {template.popular && (
                            <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                              Popular
                            </div>
                          )}

                          {/* Favorite button */}
                          <button
                            onClick={() => toggleFavorite(template.id)}
                            className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition-colors"
                          >
                            {favorites.includes(template.id) ? (
                              <FaStar className="text-yellow-400" size={16} />
                            ) : (
                              <FaRegStar
                                className="text-gray-400 hover:text-yellow-400"
                                size={16}
                              />
                            )}
                          </button>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                            {template.name}
                          </h3>
                          <p className="text-gray-600 mb-6 text-sm h-12 overflow-hidden">
                            {template.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
                              {template.category}
                            </span>
                            <button
                              onClick={() => handleSelectTemplate(template.id)}
                              className="btn btn-secondary btn-sm"
                            >
                              Customize
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentTemplates.map((template) => (
                      <div
                        key={template.id}
                        className="card bg-white overflow-hidden transition-all hover-shadow duration-300"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative">
                            <img
                              src={template.image}
                              alt={`${template.name} preview`}
                              className="w-full h-full object-cover"
                            />
                            {template.popular && (
                              <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                                Popular
                              </div>
                            )}
                          </div>
                          <div className="md:w-2/3 p-6 flex flex-col">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {template.name}
                              </h3>
                              <button
                                onClick={() => toggleFavorite(template.id)}
                                className="p-1 rounded-full"
                              >
                                {favorites.includes(template.id) ? (
                                  <FaStar
                                    className="text-yellow-400"
                                    size={18}
                                  />
                                ) : (
                                  <FaRegStar
                                    className="text-gray-400 hover:text-yellow-400"
                                    size={18}
                                  />
                                )}
                              </button>
                            </div>
                            <p className="text-gray-600 mb-4 flex-grow">
                              {template.description}
                            </p>
                            <div className="flex justify-between items-center mt-auto">
                              <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
                                {template.category}
                              </span>
                              <div className="space-x-3">
                                <button
                                  onClick={() =>
                                    handleSelectTemplate(template.id)
                                  }
                                  className="btn btn-secondary"
                                >
                                  Customize
                                </button>
                                <button
                                  onClick={() =>
                                    handleSelectTemplate(template.id)
                                  }
                                  className="btn btn-primary"
                                >
                                  Select Template
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${
                          currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <FaChevronLeft size={16} />
                      </button>

                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === index + 1
                              ? "bg-indigo-600 text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md ${
                          currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <FaChevronRight size={16} />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ResumeTemplates.propTypes = {
  onSelectTemplate: PropTypes.func.isRequired,
  initialTemplateSettings: PropTypes.object,
  onNavigateBack: PropTypes.func,
  formData: PropTypes.object,
};

export default ResumeTemplates;
