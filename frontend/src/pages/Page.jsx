import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/ui/sidebar";
import TopNav from "../components/ui/topnav";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaFileAlt,
  FaFolder,
  FaThLarge,
  FaSave,
  FaPlus,
  FaCheck,
  FaSignOutAlt,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaCogs,
  FaLanguage,
  FaTrophy,
  FaProjectDiagram,
  FaCertificate,
  FaPalette,
  FaArrowLeft,
} from "react-icons/fa";
import {
  ResumeDownloadButton,
  ResumeViewer,
} from "../components/ReactPDFResume";

import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import CertificationsForm from "../components/forms/CertificationsForm";
import SectionManager from "../components/SectionManager";
import CustomSectionForm from "../components/forms/CustomSectionForm";
import ResumeTemplates from "../components/ResumeTemplates";
import VersionHistory from "../components/VersionHistory";
import TemplateCustomizer from "../components/TemplateCustomizer";
import AchievementsForm from "../components/forms/AchievementsForm";
import ResumeDownload from "../components/ResumeDownload";

import { PersonalInfoSubmit } from "../services/routes/personal";
import { educationCreate } from "../services/routes/education";
import { experienceCreate } from "../services/routes/experience";
import { skillCreate } from "../services/routes/skill";
import { projectCreate } from "../services/routes/project";
import { certificateCreate } from "../services/routes/certificate";
import { achievementCreate } from "../services/routes/achievement";
import {
  getAllResumes,
  resumeCreate,
  updateResume,
  deleteResume,
} from "../services/routes/resume";
import { saveVersion } from "../services/versionControlService";

// Import template images
import ModernTwoColumnImg from "../assets/modern_two_column.png";
import ProfessionalTwoColumnImg from "../assets/professional_two_column.png";
// Add imports for the new template images - we'll use placeholders for now
import ATSSimpleCleanImg from "../assets/ats_simple_clean.png";
import ATSFunctionalImg from "../assets/ats_functional.png";

// Default resume data for demonstration
const defaultResumeData = {
  personal: {
    name: "Kabilan S",
    email: "kabilanselvakumar313@gmail.com",
    phone: "+91-6383438049",
    location: "Trichy, TN",
    linkedin: "https://www.linkedin.com/in/kabilan-s-3aab74256",
    github: "https://github.com/S-KABILAN",
    website: "https://kabilan-portfolio.vercel.app/",
  },
  education: [
    {
      degree: "B.Tech,",
      institution: "Saranathan College of Engineering",
      graduationYear: "2021-2025",
    },
    {
      degree: "Intermediate",
      institution: "Laurel Higher Secondary School",
      graduationYear: "2021",
    },
    {
      degree: "High School",
      institution: "Govt High School",
      graduationYear: "2019",
    },
  ],
  experience: [
    {
      jobTitle: "Software Developer Intern",
      companyName: "StartupBricks",
      yearsOfExperience: "Feb 2025 - Mar 2025",
      description:
        "Developed responsive client projects using React.js and Tailwind CSS. Optimized website performance and code reusability, improving load times by 30%.",
    },
    {
      jobTitle: "Front-End Developer Intern",
      companyName: "Utilized",
      yearsOfExperience: "Aug 2024 - Oct 2024",
      description:
        "Developed modular, responsive interfaces for dashboards using React.js and TypeScript. Improved user engagement by 20% through UI/UX updates.",
    },
    {
      jobTitle: "Web Developer Intern",
      companyName: "SunriseDesignHive",
      yearsOfExperience: "Jun 2024 - Aug 2024",
      description:
        "Built a fully responsive business website using Next.js and Tailwind CSS, achieving a 95+ mobile responsiveness score.",
    },
  ],
  skills: [
    { skillType: "Languages", skillName: "JavaScript (ES6+), Java, C++, SQL" },
    {
      skillType: "Frontend",
      skillName: "React.js, Next.js, Tailwind CSS, HTML5, CSS3",
    },
    { skillType: "Backend", skillName: "Node.js, Express.js, MongoDB" },
    { skillType: "Tools", skillName: "Git, GitHub, Postman, Vercel, Netlify" },
    {
      skillType: "Concepts",
      skillName:
        "REST APIs, CRUD Operations, Responsive Design, State Management (Redux/Context API)",
    },
  ],
  achievements: [
    { description: "Solved 100+ DSA problems on LeetCode." },
    { description: "Led a 3-day C Programming workshop for 50+ students." },
    { description: "2nd Place in National Web-Design Contest." },
    { description: "1st Place in National Project Expo." },
  ],
  projects: [
    {
      title: "Resume Builder App",
      description:
        "Created a form-based resume generator with dynamic PDF export.",
      technologiesUsed: "React.js, Node.js, Express.js, MongoDB",
    },
    {
      title: "Expense Tracker App",
      description:
        "Real-time expense tracking, budget management, and visualization.",
      technologiesUsed: "React.js, Tailwind CSS, Node.js, MongoDB",
    },
    {
      title: "CRUD Task Manager",
      description:
        "MERN-based task manager with CRUD operations and RESTful APIs.",
      technologiesUsed: "Next.js, Node.js, Express.js, MongoDB",
    },
    {
      title: "SunriseDesignHive Landing Page",
      description:
        "Home interiors business website with seamless mobile and desktop views.",
      technologiesUsed: "Next.js, Tailwind CSS, Vercel",
    },
  ],
  certifications: [
    {
      certificationName: "HTML and CSS in Depth",
      issuingOrganization: "Meta (Coursera)",
      dateObtained: "2023",
      certificationId: "ABC123",
    },
    {
      certificationName: "Programming with JavaScript",
      issuingOrganization: "Meta (Coursera)",
      dateObtained: "2023",
      certificationId: "DEF456",
    },
  ],
  customSections: [
    {
      id: "profile-summary",
      title: "Profile Summary",
      content:
        "Full Stack Developer with hands-on experience in building scalable, responsive web applications using React.js, Next.js, Node.js, Express, and MongoDB. Passionate about creating seamless UI/UX experiences and backend systems with RESTful APIs. Successfully delivered multiple client and startup projects with a focus on performance, responsiveness, and code maintainability.",
    },
  ],
};

const Page = () => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [activeSection, setActiveSection] = useState("PersonalInfo");
  const [selectedLayout, setSelectedLayout] = useState("Layout1");
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [selectedResumeForHistory, setSelectedResumeForHistory] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Add template settings state first, before using it in templates
  const [templateSettings, setTemplateSettings] = useState({
    colors: {
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#3b82f6",
      text: "#1f2937",
      background: "#ffffff",
    },
    font: "ui-sans-serif, system-ui, sans-serif",
    fontSize: "medium",
    spacing: "normal",
    contentSpacing: "standard",
    sectionOrder: [
      "education",
      "experience",
      "skills",
      "languages",
      "projects",
      "certifications",
    ],
  });

  // Define navItems for section navigation
  const navItems = [
    { id: "PersonalInfo", label: "Personal Info", icon: FaUser },
    { id: "Education", label: "Education", icon: FaGraduationCap },
    { id: "Experience", label: "Experience", icon: FaBriefcase },
    { id: "Skills", label: "Skills", icon: FaCogs },
    { id: "Languages", label: "Languages", icon: FaLanguage },
    { id: "Achievements", label: "Achievements", icon: FaTrophy },
    { id: "Projects", label: "Projects", icon: FaProjectDiagram },
    { id: "Certifications", label: "Certifications", icon: FaCertificate },
  ];

  // Define templates for resume templates section
  const templates = [
    {
      id: "Layout1",
      name: "Professional",
      description: "Clean and professional layout, perfect for most industries",
      image: "https://via.placeholder.com/300x400?text=Professional",
      settings: templateSettings,
    },
    {
      id: "Layout2",
      name: "Modern",
      description: "Contemporary design with a fresh look",
      image: "https://via.placeholder.com/300x400?text=Modern",
      settings: templateSettings,
    },
    {
      id: "Layout3",
      name: "Creative",
      description: "Showcase your creativity with this unique layout",
      image: "https://via.placeholder.com/300x400?text=Creative",
      settings: templateSettings,
    },
    {
      id: "Layout4",
      name: "Minimal",
      description: "Clean and simple design focused on content",
      image: "https://via.placeholder.com/300x400?text=Minimal",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#374151",
          secondary: "#1f2937",
        },
      },
    },
    {
      id: "Layout5",
      name: "Executive",
      description: "Elegant and professional for senior positions",
      image: "https://via.placeholder.com/300x400?text=Executive",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#10b981",
          secondary: "#047857",
        },
      },
    },
    {
      id: "Layout6",
      name: "Academic",
      description: "Perfect for academic and research positions",
      image: "https://via.placeholder.com/300x400?text=Academic",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#7c3aed",
          secondary: "#5b21b6",
        },
      },
    },
    {
      id: "ModernTwoColumn",
      name: "Modern Two-Column",
      description:
        "A stylish two-column layout with a colored sidebar for personal info and skills",
      image: ModernTwoColumnImg,
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#4f46e5",
          secondary: "#4338ca",
        },
      },
    },
    {
      id: "ProfessionalTwoColumn",
      name: "Professional Two-Column",
      description:
        "A balanced professional layout with a centered header and two-column body",
      image: ProfessionalTwoColumnImg,
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#0891b2",
          secondary: "#0e7490",
        },
      },
    },
    {
      id: "ElegantTwoColumn",
      name: "Elegant Two-Column",
      description:
        "Clean design with a colored left sidebar for contact info and skills",
      image: "https://via.placeholder.com/300x400?text=ElegantTwoColumn",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#6366f1",
          secondary: "#4f46e5",
        },
      },
    },
    {
      id: "ModernSplit",
      name: "Modern Split",
      description:
        "Horizontal header with thin left sidebar for skills and education",
      image: "https://via.placeholder.com/300x400?text=ModernSplit",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#3b82f6",
          secondary: "#2563eb",
        },
      },
    },
    {
      id: "CreativeTwoColumn",
      name: "Creative Two-Column",
      description:
        "Vibrant design with photo placeholder and visual skill indicators",
      image: "https://via.placeholder.com/300x400?text=CreativeTwoColumn",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#ec4899",
          secondary: "#db2777",
        },
      },
    },
    {
      id: "ExecutiveTwoColumn",
      name: "Executive Two-Column",
      description:
        "Sophisticated layout for executives with competencies section",
      image: "https://via.placeholder.com/300x400?text=ExecutiveTwoColumn",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#0f766e",
          secondary: "#0d9488",
        },
      },
    },
    {
      id: "CompactTwoColumn",
      name: "Compact Two-Column",
      description:
        "Space-efficient design with thin header and comprehensive sidebar",
      image: "https://via.placeholder.com/300x400?text=CompactTwoColumn",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#8b5cf6",
          secondary: "#7c3aed",
        },
      },
    },
    // Add the two new ATS-friendly single-column templates
    {
      id: "ATSSimpleClean",
      name: "ATS Simple Clean",
      description:
        "ATS-optimized single-column layout with clean formatting for maximum readability by both humans and resume screening software",
      image:
        ATSSimpleCleanImg ||
        "https://via.placeholder.com/300x400?text=ATSSimpleClean",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#2a3b4c",
          secondary: "#34495e",
        },
      },
    },
    {
      id: "ATSFunctional",
      name: "ATS Functional",
      description:
        "Skills-focused single-column layout that highlights your competencies while maintaining ATS compatibility",
      image:
        ATSFunctionalImg ||
        "https://via.placeholder.com/300x400?text=ATSFunctional",
      settings: {
        ...templateSettings,
        colors: {
          ...templateSettings.colors,
          primary: "#01579b",
          secondary: "#0277bd",
        },
      },
    },
  ];

  const navigate = useNavigate(); // Initialize useNavigate hook
  const resumePreviewRef = useRef(); // Create a ref for the resume preview
  const [activeItem, setActiveItem] = useState("Home");

  // For the My Resumes section - use savedResumes for consistency
  const [resumes, setResumes] = useState([]);

  // Initialize with default sections configuration
  const defaultSectionConfig = [
    {
      id: "personal",
      type: "standard",
      label: "Personal Information",
      active: true,
      enabled: true,
    },
    {
      id: "education",
      type: "standard",
      label: "Education",
      active: true,
      enabled: true,
    },
    {
      id: "experience",
      type: "standard",
      label: "Experience",
      active: true,
      enabled: true,
    },
    {
      id: "skills",
      type: "standard",
      label: "Skills",
      active: true,
      enabled: true,
    },
    {
      id: "languages",
      type: "standard",
      label: "Languages",
      active: true,
      enabled: true,
    },
    {
      id: "projects",
      type: "standard",
      label: "Projects",
      active: true,
      enabled: true,
    },
    {
      id: "certifications",
      type: "standard",
      label: "Certifications",
      active: true,
      enabled: true,
    },
    {
      id: "achievements",
      type: "standard",
      label: "Achievements",
      active: true,
      enabled: true,
    },
    {
      id: "profile-summary",
      type: "custom",
      label: "Profile Summary",
      active: true,
      enabled: true,
    },
  ];

  const [sectionConfig, setSectionConfig] = useState(defaultSectionConfig);

  const [formData, setFormData] = useState({
    personal: defaultResumeData.personal,
    education: defaultResumeData.education,
    experience: defaultResumeData.experience,
    skills: defaultResumeData.skills,
    achievements: defaultResumeData.achievements,
    projects: defaultResumeData.projects,
    certifications: defaultResumeData.certifications,
    languages: [
      { language: "English", proficiency: "Native", isVisible: true },
      { language: "Spanish", proficiency: "Intermediate", isVisible: true },
    ],
    customSections: defaultResumeData.customSections, // Added for custom user sections
  });

  const [savedResumes, setSavedResumes] = useState([]);
  const [editingResumeId, setEditingResumeId] = useState(null);
  const [loadingResumes, setLoadingResumes] = useState(true); // New state for loading resumes
  const [errorLoadingResumes, setErrorLoadingResumes] = useState(null); // State for error handling

  // Add profile summary section on initial load
  useEffect(() => {
    // Check if profile-summary exists in the default resume data
    if (
      defaultResumeData.customSections.some(
        (section) => section.id === "profile-summary"
      )
    ) {
      // Check if profile summary section is already in section config
      const profileSummaryExists = sectionConfig.some(
        (section) => section.id === "profile-summary"
      );

      // Add profile summary to section config if it doesn't exist
      if (!profileSummaryExists) {
        setSectionConfig([
          ...sectionConfig,
          {
            id: "profile-summary",
            type: "custom",
            label: "Profile Summary",
            active: true,
            enabled: true,
          },
        ]);
      }
    }
  }, []);

  // Initial form data
  const initialFormData = {
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    customSections: [],
    layout: "Layout1",
  };

  // Function to populate with demo data
  const populateWithDemoData = () => {
    // Demo data
    setFormData({
      ...formData,
      personal: {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        website: "alexjohnson.dev",
        linkedin: "linkedin.com/in/alexjohnson",
        github: "github.com/alexjohnson",
      },
      education: [
        {
          institution: "Columbia University",
          degree: "Master of Science",
          fieldOfStudy: "Computer Science",
          location: "New York, NY",
          startDate: "2020-09",
          endDate: "2022-05",
          graduationYear: "2022",
          gpa: "3.9/4.0",
          description:
            "Specialized in Artificial Intelligence and Machine Learning",
          isVisible: true,
        },
        {
          institution: "Boston University",
          degree: "Bachelor of Science",
          fieldOfStudy: "Software Engineering",
          location: "Boston, MA",
          startDate: "2016-09",
          endDate: "2020-05",
          graduationYear: "2020",
          gpa: "3.8/4.0",
          description: "Dean's List, Software Engineering Club President",
          isVisible: true,
        },
      ],
      experience: [
        {
          company: "Tech Innovations Inc.",
          position: "Senior Software Engineer",
          location: "New York, NY",
          startDate: "2022-06",
          endDate: "",
          isCurrentlyWorking: true,
          description:
            "• Led a team of 5 engineers in developing a cloud-based analytics platform\n• Implemented CI/CD pipelines that reduced deployment time by 40%\n• Optimized database queries resulting in 50% faster application performance\n• Created comprehensive documentation and conducted knowledge transfer sessions",
          isVisible: true,
        },
        {
          company: "Digital Solutions LLC",
          position: "Software Developer",
          location: "Boston, MA",
          startDate: "2020-07",
          endDate: "2022-05",
          isCurrentlyWorking: false,
          description:
            "• Developed RESTful APIs using Node.js and Express\n• Built responsive frontend interfaces with React and Redux\n• Collaborated with UX designers to implement user-friendly interfaces\n• Participated in agile development cycles with bi-weekly sprints",
          isVisible: true,
        },
      ],
      skills: [
        {
          skillType: "Programming Languages",
          skillName: "JavaScript, Python, Java, C++",
          isVisible: true,
        },
        {
          skillType: "Frontend",
          skillName: "React, Vue.js, HTML5, CSS3, Tailwind CSS",
          isVisible: true,
        },
        {
          skillType: "Backend",
          skillName: "Node.js, Express, Django, Spring Boot",
          isVisible: true,
        },
        {
          skillType: "Database",
          skillName: "MongoDB, PostgreSQL, MySQL, Redis",
          isVisible: true,
        },
        {
          skillType: "DevOps",
          skillName: "Docker, Kubernetes, AWS, CI/CD, Git",
          isVisible: true,
        },
      ],
      projects: [
        {
          title: "E-commerce Platform",
          description:
            "Built a full-stack e-commerce platform with features like user authentication, product catalog, shopping cart, payment processing, and order tracking.",
          technologiesUsed:
            "React, Node.js, Express, MongoDB, Stripe API, AWS S3",
          isVisible: true,
        },
        {
          title: "Machine Learning Image Classifier",
          description:
            "Developed a CNN-based image classification system that can identify objects with 95% accuracy. Implemented a web interface for easy image uploads and predictions.",
          technologiesUsed: "Python, TensorFlow, Flask, HTML/CSS, JavaScript",
          isVisible: true,
        },
      ],
      certifications: [
        {
          certificationName: "AWS Certified Solutions Architect",
          issuingOrganization: "Amazon Web Services",
          dateObtained: "2022-11",
          certificationId: "AWS-ASA-12345",
          isVisible: true,
        },
        {
          certificationName: "Professional Scrum Master I (PSM I)",
          issuingOrganization: "Scrum.org",
          dateObtained: "2021-08",
          certificationId: "PSM-I-98765",
          isVisible: true,
        },
      ],
      achievements: [
        {
          description: "Led team that won 1st place in National Hackathon 2021",
          isVisible: true,
        },
        {
          description:
            "Published research paper on 'Efficient Algorithms for Real-time Data Processing' in IEEE Journal",
          isVisible: true,
        },
        {
          description:
            "Received 'Outstanding Engineer Award' at Digital Solutions LLC",
          isVisible: true,
        },
      ],
      customSections: [
        {
          id: "profile-summary",
          title: "Professional Summary",
          content:
            "Results-driven Software Engineer with 4+ years of experience in full-stack development, specializing in building scalable web applications. Proven track record of leading teams and delivering high-quality projects on time. Passionate about creating efficient, maintainable code and solving complex technical challenges.",
          isVisible: true,
        },
      ],
      layout: selectedLayout,
    });
  };

  const resetFormData = () => {
    setFormData({
      personal: {
        name: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
      certifications: [],
      achievements: [],
      customSections: [],
      layout: "Layout1",
    });
  };

  // Function to fetch all resumes
  const fetchAllResumes = async () => {
    setLoadingResumes(true); // Set loading state to true
    setErrorLoadingResumes(null); // Reset error state

    try {
      // Using the updated getAllResumes that doesn't require userId parameter
      const resumesResponse = await getAllResumes();

      if (resumesResponse && resumesResponse.success === false) {
        throw new Error(resumesResponse.error || "Failed to fetch resumes");
      }

      const resumesData = resumesResponse.data || [];
      console.log("Fetched resumes:", resumesData);
      setSavedResumes(resumesData); // Update saved resumes state

      return resumesResponse;
    } catch (error) {
      console.error("Error fetching resumes:", error); // Log the error for debugging
      setErrorLoadingResumes(error.message || "Failed to fetch resumes");

      // If the error is authentication related, redirect to login
      if (
        error.message.includes("log in again") ||
        error.message.includes("Authentication required")
      ) {
        // Show error message to user
        const errorToast = document.createElement("div");
        errorToast.className =
          "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50";
        errorToast.textContent =
          "Your session has expired. Please log in again.";
        document.body.appendChild(errorToast);

        // Remove error message after 3 seconds
        setTimeout(() => {
          if (document.body.contains(errorToast)) {
            document.body.removeChild(errorToast);
          }
          // Redirect to login page
          navigate("/login");
        }, 3000);
      }
      return { success: false, error: error.message };
    } finally {
      setLoadingResumes(false); // Set loading state to false
    }
  };

  // useEffect to fetch resumes when "My Resumes" is selected
  useEffect(() => {
    if (selectedItem === "My Resumes") {
      fetchAllResumes();
    }
  }, [selectedItem]);

  // Handler for applying version data
  const handleApplyVersion = (versionData) => {
    setFormData({
      personal: versionData.personal || {},
      education: versionData.education || [],
      experience: versionData.experience || [],
      skills: versionData.skills || [],
      projects: versionData.projects || [],
      certifications: versionData.certifications || [],
      achievements: versionData.achievements || [],
      customSections: versionData.customSections || [],
      layout: versionData.layout || "Layout1",
    });
  };

  // Handle template settings change
  const handleTemplateSettingsChange = (newSettings) => {
    setTemplateSettings(newSettings);
  };

  // Handle section config changes
  const handleSectionConfigChange = (newConfig) => {
    // Update section configuration and sync with template settings
    setSectionConfig(newConfig);

    // Update template settings section order based on visible sections
    const visibleSections = newConfig
      .filter((section) => section.active || section.enabled)
      .map((section) => section.id);

    // Only update if the order has changed to avoid unnecessary re-renders
    if (
      JSON.stringify(visibleSections) !==
      JSON.stringify(templateSettings.sectionOrder)
    ) {
      setTemplateSettings({
        ...templateSettings,
        sectionOrder: visibleSections,
      });
    }
  };

  // Add a custom section to form data
  const addCustomSection = (newSection) => {
    // Add to form data
    setFormData({
      ...formData,
      customSections: [...formData.customSections, newSection],
    });

    // Add to section config
    setSectionConfig([
      ...sectionConfig,
      {
        id: newSection.id,
        type: "custom",
        label: newSection.title,
        active: true,
        enabled: true,
      },
    ]);
  };

  // Remove a custom section
  const removeCustomSection = (sectionId) => {
    // Remove from form data
    setFormData({
      ...formData,
      customSections: formData.customSections.filter(
        (section) => section.id !== sectionId
      ),
    });

    // Remove from section config
    setSectionConfig(
      sectionConfig.filter((section) => section.id !== sectionId)
    );
  };

  // Update section config when custom section title changes
  useEffect(() => {
    // Update section config labels when custom section titles change
    const updatedConfig = sectionConfig.map((section) => {
      if (section.type === "custom") {
        const customSection = formData.customSections.find(
          (cs) => cs.id === section.id
        );
        if (customSection) {
          return { ...section, label: customSection.title };
        }
      }
      return section;
    });

    setSectionConfig(updatedConfig);
  }, [formData.customSections]);

  // Add effect to properly sync section visibility with formData
  useEffect(() => {
    // Skip this effect on initial render
    const updatedFormData = { ...formData };
    let hasChanges = false;

    // For education, experience, skills, projects, certifications, achievements
    const sectionTypes = [
      "education",
      "experience",
      "skills",
      "projects",
      "certifications",
      "achievements",
    ];

    // Helper function to deeply compare arrays of objects
    const arraysAreDifferent = (arr1, arr2) => {
      if (!arr1 || !arr2 || arr1.length !== arr2.length) return true;

      for (let i = 0; i < arr1.length; i++) {
        const item1 = arr1[i];
        const item2 = arr2[i];

        // Compare isVisible property specifically
        if (item1.isVisible !== item2.isVisible) return true;
      }

      return false;
    };

    sectionTypes.forEach((sectionType) => {
      const section = sectionConfig.find((s) => s.id === sectionType);
      if (section && Array.isArray(updatedFormData[sectionType])) {
        const enabled = !!section.enabled;

        // Only update if the visibility actually changed
        const potentialNewItems = updatedFormData[sectionType].map((item) => ({
          ...item,
          isVisible: enabled,
        }));

        if (
          arraysAreDifferent(updatedFormData[sectionType], potentialNewItems)
        ) {
          updatedFormData[sectionType] = potentialNewItems;
          hasChanges = true;
        }
      }
    });

    // For custom sections
    if (Array.isArray(updatedFormData.customSections)) {
      let customSectionsChanged = false;
      const newCustomSections = updatedFormData.customSections.map(
        (section) => {
          const configSection = sectionConfig.find((s) => s.id === section.id);
          if (configSection && section.isVisible !== configSection.enabled) {
            customSectionsChanged = true;
            return {
              ...section,
              isVisible: configSection.enabled,
            };
          }
          return section;
        }
      );

      if (customSectionsChanged) {
        updatedFormData.customSections = newCustomSections;
        hasChanges = true;
      }
    }

    // Only update if there were changes to avoid infinite loops
    if (hasChanges) {
      setFormData(updatedFormData);
    }
  }, [sectionConfig]); // Only run when sectionConfig changes

  // Save a new resume or update an existing one
  const saveResume = async () => {
    try {
      setIsLoading(true);
      setErrors({});

      // Validate required fields
      let hasErrors = false;
      const requiredFields = {
        "personal.name": formData.personal?.name,
        "personal.email": formData.personal?.email,
        "personal.phone": formData.personal?.phone,
      };

      const newErrors = {};
      Object.entries(requiredFields).forEach(([field, value]) => {
        if (!value || value.trim() === "") {
          newErrors[field] = "This field is required";
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setErrors(newErrors);
        setIsLoading(false);

        // Display error message
        const errorToast = document.createElement("div");
        errorToast.className =
          "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50";
        errorToast.textContent = "Please fill in all required fields.";
        document.body.appendChild(errorToast);

        // Remove error message after 3 seconds
        setTimeout(() => {
          if (document.body.contains(errorToast)) {
            document.body.removeChild(errorToast);
          }
        }, 3000);

        return;
      }

      // Create resume data object
      const resumeData = {
        name: formData.personal.name,
        personal: formData.personal,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        projects: formData.projects,
        certifications: formData.certifications,
        achievements: formData.achievements,
        customSections: formData.customSections,
        layout: selectedLayout,
        sectionConfig: sectionConfig,
        templateSettings: templateSettings,
      };

      // Display loading indicator
      const loadingToast = document.createElement("div");
      loadingToast.className =
        "fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded shadow-lg z-50";
      loadingToast.textContent = "Saving your resume...";
      document.body.appendChild(loadingToast);

      try {
        // Save the current version to history
        saveVersion({
          ...resumeData,
          timestamp: new Date().toISOString(),
          versionName: `Version ${new Date().toLocaleString()}`,
        });

        let response;
        if (editingResumeId) {
          // Update existing resume
          response = await updateResume(editingResumeId, resumeData);
          console.log("Resume update response:", response);
        } else {
          // Create new resume
          response = await resumeCreate(resumeData);
          console.log("Resume create response:", response);
          if (response && response.data && response.data._id) {
            setEditingResumeId(response.data._id);
          } else {
            throw new Error("No resume ID received from server");
          }
        }

        // Remove loading indicator
        if (document.body.contains(loadingToast)) {
          document.body.removeChild(loadingToast);
        }

        // Show success message
        setSnackbar({
          open: true,
          message: `Resume ${
            editingResumeId ? "updated" : "saved"
          } successfully!`,
          severity: "success",
        });

        // Also display a visual toast
        const successToast = document.createElement("div");
        successToast.className =
          "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50";
        successToast.textContent = `Resume ${
          editingResumeId ? "updated" : "saved"
        } successfully!`;
        document.body.appendChild(successToast);

        // Remove success message after 3 seconds
        setTimeout(() => {
          if (document.body.contains(successToast)) {
            document.body.removeChild(successToast);
          }
        }, 3000);

        // Fetch all resumes to update the list
        fetchAllResumes();
      } catch (error) {
        // Remove loading indicator if it exists
        if (document.body.contains(loadingToast)) {
          document.body.removeChild(loadingToast);
        }

        throw error; // Propagate the error to the outer catch block
      }
    } catch (error) {
      console.error("Error saving resume:", error);

      // Update error state
      setSnackbar({
        open: true,
        message: `Error: ${
          error.message || "Failed to save resume. Please try again."
        }`,
        severity: "error",
      });

      // Show error message
      const errorToast = document.createElement("div");
      errorToast.className =
        "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50";
      errorToast.textContent = `Error: ${
        error.message || "Failed to save resume. Please try again."
      }`;
      document.body.appendChild(errorToast);

      // Remove error message after 5 seconds
      setTimeout(() => {
        if (document.body.contains(errorToast)) {
          document.body.removeChild(errorToast);
        }
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResumeCreate = async () => {
    try {
      // Reset the editing state and form data for a new resume
      setEditingResumeId(null);

      // Start with a clean form with defaults
      setFormData({
        personal: {
          name: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          linkedin: "",
          github: "",
        },
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certifications: [],
        achievements: [],
        customSections: [],
        layout: "Layout1",
      });

      // Switch to the Create Resume tab
      setSelectedItem("Create Resume");
      setActiveSection("PersonalInfo");

      // Show a success message
      setSnackbar({
        open: true,
        message: "Start creating your new resume!",
        severity: "info",
      });
    } catch (error) {
      console.error("Error creating new resume:", error.message || error);
      // Show error message to the user
      setSnackbar({
        open: true,
        message: "Error creating new resume. Please try again.",
        severity: "error",
      });
    }
  };

  // Load a resume into the form for editing
  const loadResumeForEditing = (resumeId) => {
    try {
      const resume = savedResumes.find((resume) => resume._id === resumeId);
      if (!resume) return;

      // Set form data
      setFormData({
        personal: resume.personal || {},
        education: resume.education || [],
        experience: resume.experience || [],
        skills: resume.skills || [],
        projects: resume.projects || [],
        certifications: resume.certifications || [],
        achievements: resume.achievements || [],
        customSections: resume.customSections || [],
      });

      // Set layout and template settings
      setSelectedLayout(resume.layout || "Layout1");
      if (resume.templateSettings) {
        setTemplateSettings(resume.templateSettings);
      }

      // Set section config if available
      if (resume.sectionConfig && Array.isArray(resume.sectionConfig)) {
        setSectionConfig(resume.sectionConfig);
      }

      // Set editing resume ID
      setEditingResumeId(resumeId);

      // Switch to Create Resume tab
      setSelectedItem("Create Resume");
    } catch (error) {
      console.error("Error loading resume for editing:", error);
      setSnackbar({
        open: true,
        message: "Error loading resume. Please try again.",
        severity: "error",
      });
    }
  };

  const handleMenuClick = (item) => {
    setSelectedItem(item);
    setActiveItem(item);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleFormChange = (section, field, value, index = null) => {
    if (section === "personal") {
      setFormData({
        ...formData,
        personal: { ...formData.personal, [field]: value },
      });
    } else if (section === "education" && index !== null) {
      const updatedEducation = [...formData.education];
      updatedEducation[index] = { ...updatedEducation[index], [field]: value };
      setFormData({ ...formData, education: updatedEducation });
    } else if (section === "experience" && index !== null) {
      const updatedExperience = [...formData.experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };
      setFormData({ ...formData, experience: updatedExperience });
    } else if (section === "skills" && index !== null) {
      const updatedSkills = [...formData.skills];
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };
      setFormData({ ...formData, skills: updatedSkills });
    } else if (section === "projects" && index !== null) {
      const updatedProjects = [...formData.projects];
      updatedProjects[index] = { ...updatedProjects[index], [field]: value };
      setFormData({ ...formData, projects: updatedProjects });
    } else if (section === "certifications" && index !== null) {
      const updatedCertifications = [...formData.certifications];
      updatedCertifications[index] = {
        ...updatedCertifications[index],
        [field]: value,
      };
      setFormData({ ...formData, certifications: updatedCertifications });
    } else if (section === "achievements" && index !== null) {
      const updatedachievemets = [...formData.achievements];
      updatedachievemets[index] = {
        ...updatedachievemets[index],
        [field]: value,
      };
      setFormData({ ...formData, achievements: updatedachievemets });
    } else {
      setFormData({
        ...formData,
        [section]: { ...formData[section], [field]: value },
      });
    }
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: "", institution: "", graduationYear: "" },
      ],
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        {
          jobTitle: "",
          companyName: "",
          yearsOfExperience: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { skill: "", skillLevel: "" }],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { description: "" }],
    });
  };

  const removeAchievement = (index) => {
    const updatedachievemets = formData.achievements.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, achievements: updatedachievemets });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", technologies: "" },
      ],
    });
  };

  const removeProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        {
          certificationName: "",
          issuingOrganization: "",
          dateObtained: "",
          certificationId: "",
        },
      ],
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = formData.certifications.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const handleSubmitPersonalInfo = async () => {
    try {
      const response = await PersonalInfoSubmit(formData.personal); // Ensure `formData.personal` has the correct fields

      if (response.success) {
        // Check for a success response if `PersonalInfoSubmit` returns it
        console.log("Personal Info Submitted", formData.personal);
      } else {
        console.error(response.message || "Submission did not succeed.");
      }
    } catch (error) {
      console.error(error.message || "Failed to submit personal information.");
    }
  };

  const handleSubmitEducation = async () => {
    try {
      const response = await educationCreate(formData.education);
      if (response.success) {
        console.log("Education Info Submitted", formData.education);
      }
    } catch (error) {
      console.error(error.message || "Failed to submit education information.");
    }

    // Add logic to handle education submission
  };

  const handleSubmitExperience = async () => {
    try {
      const response = await experienceCreate(formData.experience);
      if (response.success) {
        console.log("Experience info submitted", formData.experience);
      }
    } catch (error) {
      console.log(error.message || "Failed to submit experience information");
    }
    console.log("Experience Submitted", formData.experience);
    // Add logic to handle experience submission
  };

  const handleSubmitSkills = async () => {
    try {
      const response = await skillCreate(formData.skills);
      if (response.success) {
        console.log("Skills info submitted", formData.skills);
      }
    } catch (error) {
      console.log(error.message || "Failed to submit skills information");
    }
    // Add logic to handle skills submission
  };

  const handleSubmitAchievements = async () => {
    try {
      const response = await achievementCreate(formData.achievements);
      if (response.success) {
        console.log("Achievements info submitted", formData.achievements);
      }
    } catch (error) {
      console.log(error.message || "Failed to submit achievements information");
    }
    // Add logic to handle skills submission
  };

  const handleSubmitProjects = async () => {
    try {
      const response = await projectCreate(formData.projects);
      if (response.success) {
        console.log("Project info submitted", formData.projects);
      }
    } catch (error) {
      console.log(error.message || "Failed to sumbit project information");
    }
    // Add logic to handle projects submission
  };

  const handleSubmitCertifications = async () => {
    try {
      const response = await certificateCreate(formData.certifications);
      if (response.success) {
        console.log("Certificate info submitted", formData.certifications);
      }
    } catch (error) {
      console.log(
        error.message || "Failed to submit certification information"
      );
    }

    console.log("Certifications Submitted", formData.certifications);
    // Add logic to handle certifications submission
  };

  const handleLayoutTemplate = (layout) => {
    setSelectedLayout(layout);
    setSelectedItem("Resume Templates"); // Redirect to "Resume Templates" page
  };

  const handleLayoutSelect = (layout, settings) => {
    setSelectedLayout(layout || "Layout1");
    if (settings) {
      setTemplateSettings(settings);
    }
    setSelectedItem("Create Resume"); // Redirect to "Create Resume" page
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      await deleteResume(resumeId); // Call the delete function from services
      setSavedResumes((prevResumes) =>
        prevResumes.filter((resume) => resume._id !== resumeId)
      );
    } catch (error) {
      console.error("Error deleting resume:", error.message || error);
    }
  };

  // Use ReactPDF for PDF generation
  const downloadResume = () => {
    // Just redirect to PDF Export page for now
    setSelectedItem("PDF Export");
  };

  // For the Create Resume section
  const renderCreateResumeSection = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left sidebar for section navigation - IMPROVED UI */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-4">
            <div className="mb-3 border-b border-gray-100 pb-3">
              <h2 className="text-base font-semibold text-gray-800 mb-1 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                Resume Sections
              </h2>
              <p className="text-xs text-gray-500">
                Build your resume section by section
              </p>
            </div>

            {/* Section Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                <span>Completion</span>
                <span className="font-medium">
                  {Math.round(
                    (Object.keys(formData.personal).filter(
                      (key) => formData.personal[key]
                    ).length /
                      7) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-1.5 rounded-full"
                  style={{
                    width: `${Math.round(
                      (Object.keys(formData.personal).filter(
                        (key) => formData.personal[key]
                      ).length /
                        7) *
                        100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`
                    w-full flex items-center px-2.5 py-2 rounded-md text-left transition-all duration-200
                    ${
                      activeSection === item.id
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <div
                    className={`
                    flex items-center justify-center w-6 h-6 rounded-full mr-2
                    ${
                      activeSection === item.id
                        ? "bg-indigo-100"
                        : "bg-gray-100"
                    }
                  `}
                  >
                    <item.icon
                      className={
                        activeSection === item.id
                          ? "text-indigo-600"
                          : "text-gray-500"
                      }
                      size={13}
                    />
                  </div>
                  <div>
                    <span className="font-medium text-xs">{item.label}</span>
                    {item.id === "PersonalInfo" && formData.personal && (
                      <div className="text-[10px] mt-0.5">
                        {formData.personal.name ? (
                          <span className="text-green-600">Complete</span>
                        ) : (
                          <span className="text-orange-500">Required</span>
                        )}
                      </div>
                    )}
                    {item.id === "Education" && (
                      <div className="text-[10px] mt-0.5">
                        {formData.education && formData.education.length > 0 ? (
                          <span className="text-green-600">
                            {formData.education.length} added
                          </span>
                        ) : (
                          <span className="text-gray-400">Recommended</span>
                        )}
                      </div>
                    )}
                    {item.id === "Experience" && (
                      <div className="text-[10px] mt-0.5">
                        {formData.experience &&
                        formData.experience.length > 0 ? (
                          <span className="text-green-600">
                            {formData.experience.length} added
                          </span>
                        ) : (
                          <span className="text-gray-400">Recommended</span>
                        )}
                      </div>
                    )}
                    {item.id === "Skills" && (
                      <div className="text-[10px] mt-0.5">
                        {formData.skills && formData.skills.length > 0 ? (
                          <span className="text-green-600">
                            {formData.skills.length} added
                          </span>
                        ) : (
                          <span className="text-gray-400">Recommended</span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Add Manage Sections button */}
            <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
              <button
                onClick={() => setActiveSection("SectionManager")}
                className="w-full bg-white border border-gray-200 text-gray-700 py-1.5 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center hover:bg-gray-50"
              >
                <FaCogs className="mr-1.5 text-gray-500" size={12} /> Manage
                Sections
              </button>

              <button
                onClick={() => setActiveSection("CustomSections")}
                className="w-full bg-white border border-gray-200 text-gray-700 py-1.5 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center hover:bg-gray-50"
              >
                <FaPlus className="mr-1.5 text-gray-500" size={12} /> Add Custom
                Section
              </button>

              <button
                onClick={() => setSelectedItem("Template Settings")}
                className="w-full bg-white border border-gray-200 text-gray-700 py-1.5 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center hover:bg-gray-50"
              >
                <FaPalette className="mr-1.5 text-gray-500" size={12} />{" "}
                Customize Template
              </button>

              <button
                onClick={saveResume}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center mt-2 shadow-sm"
              >
                <FaSave className="mr-1.5" size={12} /> Save Resume
              </button>
            </div>
          </div>
        </div>

        {/* Middle section with form - IMPROVED UI */}
        <div className="col-span-1 lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="border-b border-gray-100">
              <div className="px-4 py-3 flex items-center">
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-gray-800">
                    {navItems.find((item) => item.id === activeSection)
                      ?.label ||
                      (activeSection === "SectionManager"
                        ? "Manage Sections"
                        : activeSection === "CustomSections"
                        ? "Custom Sections"
                        : "Resume Details")}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {activeSection === "PersonalInfo"
                      ? "Add your personal and contact information"
                      : activeSection === "Education"
                      ? "Add your educational background and qualifications"
                      : activeSection === "Experience"
                      ? "Add your work experience and internships"
                      : activeSection === "Skills"
                      ? "Add your key skills and competencies"
                      : activeSection === "Languages"
                      ? "Add languages you know and proficiency levels"
                      : activeSection === "Projects"
                      ? "Add notable projects you've worked on"
                      : activeSection === "SectionManager"
                      ? "Configure which sections appear in your resume"
                      : activeSection === "CustomSections"
                      ? "Add and edit custom sections"
                      : "Fill in the details for this section"}
                  </p>
                </div>
                {activeSection === "PersonalInfo" && (
                  <div className="bg-indigo-50 rounded-full p-1.5 text-indigo-700">
                    <FaUser size={16} />
                  </div>
                )}
                {activeSection === "Education" && (
                  <div className="bg-blue-50 rounded-full p-1.5 text-blue-700">
                    <FaGraduationCap size={16} />
                  </div>
                )}
                {activeSection === "Experience" && (
                  <div className="bg-purple-50 rounded-full p-1.5 text-purple-700">
                    <FaBriefcase size={16} />
                  </div>
                )}
                {activeSection === "Skills" && (
                  <div className="bg-green-50 rounded-full p-1.5 text-green-700">
                    <FaCogs size={16} />
                  </div>
                )}
              </div>
            </div>

            <div className="p-4">{renderResumeSectionForm(activeSection)}</div>
          </div>
        </div>

        {/* Right section with preview - IMPROVED UI */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-4">
            <div className="mb-3 pb-3 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-base font-semibold text-gray-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Preview
              </h2>
              <div className="flex space-x-1.5">
                <button
                  onClick={() => setSelectedItem("Resume Templates")}
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-1.5 px-2 rounded text-xs transition-colors duration-200 flex items-center"
                >
                  <FaThLarge className="mr-1" size={10} />
                  <span className="hidden sm:inline">Templates</span>
                </button>
                <button
                  onClick={downloadResume}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-1.5 px-2 rounded text-xs transition-colors duration-200 flex items-center"
                >
                  <FaDownload className="mr-1" size={10} />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>
            </div>

            {/* Template info */}
            <div className="mb-3 py-2 px-2.5 bg-gray-50 rounded-md flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                  <FaThLarge className="text-indigo-600" size={11} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700">
                    {templates.find((t) => t.id === selectedLayout)?.name ||
                      "Template"}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {selectedLayout === "ATSSimpleClean" ||
                    selectedLayout === "ATSFunctional"
                      ? "ATS-Optimized"
                      : selectedLayout.includes("TwoColumn")
                      ? "Two-Column Layout"
                      : "Single-Column Layout"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem("Resume Templates")}
                className="text-indigo-600 hover:text-indigo-800 text-[10px] font-medium"
              >
                Change
              </button>
            </div>

            <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50">
              <div className="scale-[0.58] origin-top-left py-10 px-4">
                {renderResumePreview()}
              </div>
            </div>

            <div className="mt-3 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => setSelectedItem("PDF Export")}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-l-md hover:bg-gray-50 focus:z-10 focus:ring-1 focus:ring-indigo-500 focus:text-indigo-700"
                >
                  PDF Export
                </button>
                <button
                  type="button"
                  onClick={saveResume}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border-t border-b border-gray-200 hover:bg-gray-50 focus:z-10 focus:ring-1 focus:ring-indigo-500 focus:text-indigo-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem("Template Settings")}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-r-md hover:bg-gray-50 focus:z-10 focus:ring-1 focus:ring-indigo-500 focus:text-indigo-700"
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // For the Resume Templates section
  const renderResumeTemplatesSection = () => {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Resume Templates
          </h1>
          <p className="text-gray-600">Choose a template for your resume</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`
                border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer
                ${
                  selectedLayout === template.id
                    ? "ring-2 ring-indigo-500 ring-offset-2"
                    : "border-gray-200"
                }
              `}
              onClick={() => handleLayoutSelect(template.id, template.settings)}
            >
              <div className="relative aspect-[3/4] bg-gray-100">
                <img
                  src={
                    template.image ||
                    "https://via.placeholder.com/300x400?text=Template"
                  }
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {selectedLayout === template.id && (
                  <div className="absolute inset-0 bg-indigo-600 bg-opacity-20 flex items-center justify-center">
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <FaCheck className="text-indigo-600 w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Update renderContent to handle Template Settings
  const renderContent = () => {
    if (selectedItem === "Home") {
      return (
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome to Resume Builder
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Create a professional resume in minutes with our easy-to-use
            builder.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div
              className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedItem("Create Resume")}
            >
              <FaFileAlt className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Create New Resume
              </h3>
              <p className="text-gray-600">
                Build a professional resume with our templates
              </p>
            </div>

            <div
              className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedItem("My Resumes")}
            >
              <FaFolder className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                My Resumes
              </h3>
              <p className="text-gray-600">
                Access and edit your saved resumes
              </p>
            </div>

            <div
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedItem("Resume Templates")}
            >
              <FaThLarge className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Resume Templates
              </h3>
              <p className="text-gray-600">
                Browse and select from our template collection
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Tips for a Great Resume
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                <span className="text-gray-700">
                  Keep your resume concise and focused on relevant information
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                <span className="text-gray-700">
                  Tailor your resume for each job application
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                <span className="text-gray-700">
                  Use action verbs and quantify your achievements
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                <span className="text-gray-700">
                  Proofread your resume for errors before submitting
                </span>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    switch (selectedItem) {
      case "Create Resume":
        return renderCreateResumeSection();
      case "My Resumes":
        return (
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">My Resumes</h1>
              <button
                onClick={handleResumeCreate}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
              >
                <FaPlus className="mr-2" size={14} /> Create New
              </button>
            </div>

            {savedResumes && savedResumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedResumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {resume.title || resume.name || "Untitled Resume"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        Last updated:{" "}
                        {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => loadResumeForEditing(resume._id)}
                          className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2 px-3 rounded-lg text-sm flex-1 transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteResume(resume._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg text-sm transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <FaFileAlt className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-lg text-gray-600">No resumes found</p>
                <p className="text-gray-500 mb-4">
                  Create your first resume to get started
                </p>
                <button
                  onClick={handleResumeCreate}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Create Resume
                </button>
              </div>
            )}
          </div>
        );
      case "Resume Templates":
        return renderResumeTemplatesSection();
      case "Template Settings":
        return (
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Template Customization
              </h1>
              <button
                onClick={() => setSelectedItem("Create Resume")}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                <FaArrowLeft className="text-gray-500" size={14} />
                <span>Back to Editor</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Template Settings Form */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Customize Appearance
                </h2>

                <div className="space-y-6">
                  {/* Colors Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Colors
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Primary Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={templateSettings.colors.primary}
                            onChange={(e) =>
                              setTemplateSettings({
                                ...templateSettings,
                                colors: {
                                  ...templateSettings.colors,
                                  primary: e.target.value,
                                },
                              })
                            }
                            className="w-10 h-10 border-0 p-0 mr-2"
                          />
                          <span className="text-sm">
                            {templateSettings.colors.primary}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Secondary Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={templateSettings.colors.secondary}
                            onChange={(e) =>
                              setTemplateSettings({
                                ...templateSettings,
                                colors: {
                                  ...templateSettings.colors,
                                  secondary: e.target.value,
                                },
                              })
                            }
                            className="w-10 h-10 border-0 p-0 mr-2"
                          />
                          <span className="text-sm">
                            {templateSettings.colors.secondary}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Text Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={templateSettings.colors.text}
                            onChange={(e) =>
                              setTemplateSettings({
                                ...templateSettings,
                                colors: {
                                  ...templateSettings.colors,
                                  text: e.target.value,
                                },
                              })
                            }
                            className="w-10 h-10 border-0 p-0 mr-2"
                          />
                          <span className="text-sm">
                            {templateSettings.colors.text}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Background Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={templateSettings.colors.background}
                            onChange={(e) =>
                              setTemplateSettings({
                                ...templateSettings,
                                colors: {
                                  ...templateSettings.colors,
                                  background: e.target.value,
                                },
                              })
                            }
                            className="w-10 h-10 border-0 p-0 mr-2"
                          />
                          <span className="text-sm">
                            {templateSettings.colors.background}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Font Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Typography
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Font Family
                      </label>
                      <select
                        value={templateSettings.font}
                        onChange={(e) =>
                          setTemplateSettings({
                            ...templateSettings,
                            font: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="ui-sans-serif, system-ui, sans-serif">
                          Sans Serif
                        </option>
                        <option value="ui-serif, Georgia, Cambria, serif">
                          Serif
                        </option>
                        <option value="ui-monospace, SFMono-Regular, Menlo, monospace">
                          Monospace
                        </option>
                        <option value="'Poppins', sans-serif">Poppins</option>
                        <option value="'Roboto', sans-serif">Roboto</option>
                        <option value="'Open Sans', sans-serif">
                          Open Sans
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Spacing Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Spacing
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Content Spacing
                      </label>
                      <select
                        value={templateSettings.spacing}
                        onChange={(e) =>
                          setTemplateSettings({
                            ...templateSettings,
                            spacing: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="compact">Compact</option>
                        <option value="normal">Normal</option>
                        <option value="spacious">Spacious</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setSelectedItem("Create Resume")}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                      Apply Changes & Return to Editor
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Preview
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="scale-75 origin-top-left mb-4 transform overflow-hidden">
                    {renderResumePreview()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Settings":
        return (
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

            <div className="space-y-6">
              <div className="p-5 border border-gray-200 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Account Settings
                </h2>
                <p className="text-gray-600 mb-4">
                  Manage your account preferences
                </p>
                <button
                  onClick={handleLogout}
                  className="bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" size={14} /> Logout
                </button>
              </div>

              <div className="p-5 border border-gray-200 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Help & Support
                </h2>
                <p className="text-gray-600">
                  Need help? Contact our support team at
                  support@resumebuilder.com
                </p>
              </div>
            </div>
          </div>
        );
      case "CustomSections":
        return (
          <CustomSectionForm
            items={formData.customSections || []}
            onItemAdd={(item) => {
              addCustomSection(item);
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedCustomSections = [
                ...(formData.customSections || []),
              ];
              updatedCustomSections[index] = updatedItem;
              setFormData({
                ...formData,
                customSections: updatedCustomSections,
              });
            }}
            onItemRemove={(index) => {
              const sectionToRemove = formData.customSections[index];
              if (sectionToRemove && sectionToRemove.id) {
                removeCustomSection(sectionToRemove.id);
              } else {
                const updatedCustomSections = formData.customSections.filter(
                  (_, i) => i !== index
                );
                setFormData({
                  ...formData,
                  customSections: updatedCustomSections,
                });
              }
            }}
            onItemReorder={() => {}} // Add empty implementation for now
            errors={{}} // Add empty errors object
          />
        );
      case "SectionManager":
        return (
          <SectionManager
            activeSections={sectionConfig}
            onSectionsChange={handleSectionConfigChange}
          />
        );
      case "PDF Export":
        return (
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setSelectedItem("Create Resume")}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Editor
              </button>
              <h2 className="text-2xl font-bold">Resume Export</h2>
              <div className="w-32"></div>
            </div>

            <ResumeDownload
              formData={formData}
              templateSettings={templateSettings}
              selectedLayout={selectedLayout}
              sectionConfig={sectionConfig}
            />
          </div>
        );
      default:
        return <div>Home Page</div>;
    }
  };

  const renderResumeSectionForm = (section) => {
    switch (section) {
      case "PersonalInfo":
        return (
          <PersonalInfoForm
            formData={formData.personal}
            onFormChange={(field, value) =>
              handleFormChange("personal", field, value)
            }
            onSubmit={handleSubmitPersonalInfo}
          />
        );
      case "Education":
        return (
          <EducationForm
            formData={formData}
            onFormChange={(field, updatedEducation) => {
              if (field === "education" && Array.isArray(updatedEducation)) {
                // Handle the case where the entire education array is updated
                setFormData({
                  ...formData,
                  education: updatedEducation,
                });
              } else {
                // Handle the legacy case
                handleFormChange("education", field, updatedEducation);
              }
            }}
            onSubmit={handleSubmitEducation}
          />
        );
      case "Experience":
        return (
          <ExperienceForm
            formData={formData}
            onFormChange={(field, updatedExperience) => {
              if (field === "experience" && Array.isArray(updatedExperience)) {
                // Handle the case where the entire experience array is updated
                setFormData({
                  ...formData,
                  experience: updatedExperience,
                });
              } else {
                // Handle the legacy case
                handleFormChange("experience", field, updatedExperience);
              }
            }}
            onSubmit={handleSubmitExperience}
          />
        );
      case "Skills":
        return (
          <SkillsForm
            formData={formData}
            onFormChange={(field, updatedSkills) => {
              if (field === "skills" && Array.isArray(updatedSkills)) {
                // Handle the case where the entire skills array is updated
                setFormData({
                  ...formData,
                  skills: updatedSkills,
                });
              } else {
                // Handle the legacy case
                handleFormChange("skills", field, updatedSkills);
              }
            }}
            addSkill={addSkill}
            removeSkill={removeSkill}
            onSubmit={handleSubmitSkills}
          />
        );
      case "Achievements":
        return (
          <AchievementsForm
            formData={formData}
            onFormChange={(field, updatedAchievements) => {
              if (
                field === "achievements" &&
                Array.isArray(updatedAchievements)
              ) {
                // Handle the case where the entire achievements array is updated
                setFormData({
                  ...formData,
                  achievements: updatedAchievements,
                });
              } else {
                // Handle the legacy case
                handleFormChange("achievements", field, updatedAchievements);
              }
            }}
            addAchievement={addAchievement}
            removeAchievement={removeAchievement}
            onSubmit={handleSubmitAchievements}
          />
        );
      case "Projects":
        return (
          <ProjectsForm
            formData={formData}
            onFormChange={(field, updatedProjects) => {
              if (field === "projects" && Array.isArray(updatedProjects)) {
                // Handle the case where the entire projects array is updated
                setFormData({
                  ...formData,
                  projects: updatedProjects,
                });
              } else {
                // Handle the legacy case
                handleFormChange("projects", field, updatedProjects);
              }
            }}
            addProject={addProject}
            removeProject={removeProject}
            onSubmit={handleSubmitProjects}
          />
        );
      case "Certifications":
        return (
          <CertificationsForm
            formData={formData}
            onFormChange={(field, updatedCertifications) => {
              if (
                field === "certifications" &&
                Array.isArray(updatedCertifications)
              ) {
                // Handle the case where the entire certifications array is updated
                setFormData({
                  ...formData,
                  certifications: updatedCertifications,
                });
              } else {
                // Handle the legacy case
                handleFormChange(
                  "certifications",
                  field,
                  updatedCertifications
                );
              }
            }}
            addCertification={addCertification}
            removeCertification={removeCertification}
            onSubmit={handleSubmitCertifications}
          />
        );
      case "CustomSections":
        return (
          <CustomSectionForm
            items={formData.customSections || []}
            onItemAdd={(item) => {
              addCustomSection(item);
            }}
            onItemUpdate={(index, updatedItem) => {
              const updatedCustomSections = [
                ...(formData.customSections || []),
              ];
              updatedCustomSections[index] = updatedItem;
              setFormData({
                ...formData,
                customSections: updatedCustomSections,
              });
            }}
            onItemRemove={(index) => {
              const sectionToRemove = formData.customSections[index];
              if (sectionToRemove && sectionToRemove.id) {
                removeCustomSection(sectionToRemove.id);
              } else {
                const updatedCustomSections = formData.customSections.filter(
                  (_, i) => i !== index
                );
                setFormData({
                  ...formData,
                  customSections: updatedCustomSections,
                });
              }
            }}
            onItemReorder={() => {}} // Add empty implementation for now
            errors={{}} // Add empty errors object
          />
        );
      case "SectionManager":
        return (
          <SectionManager
            activeSections={sectionConfig}
            onSectionsChange={handleSectionConfigChange}
          />
        );
      default:
        return null;
    }
  };

  const renderResumePreview = () => {
    // Using ResumeViewer for all layouts with section config
    return (
      <div
        className={`resume-container content-spacing-${templateSettings.contentSpacing} font-size-${templateSettings.fontSize}`}
      >
        <div className="resume-content">
          <ResumeViewer
            formData={formData}
            templateSettings={templateSettings}
            selectedLayout={selectedLayout}
            sectionConfig={sectionConfig}
          />
        </div>
      </div>
    );
  };

  const storedUserData = localStorage.getItem("user");
  let userName = "User "; // Default name
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    userName = userData.name; // Assuming the user object has a 'name' property
  }

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    localStorage.removeItem("jwtToken");
    navigate("/login"); // Redirect to the login page
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onMenuClick={handleMenuClick}
        userName={formData.personal?.name || "User"}
        onLogout={handleLogout}
        selectedItem={selectedItem}
      />
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-4 md:p-6 space-y-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Page;
