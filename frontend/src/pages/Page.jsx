import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/ui/sidebar";
import MobileTopNav from "../components/ui/MobileTopNav";
import MobileBottomNav from "../components/ui/MobileBottomNav";
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
  FaArrowLeft,
  FaLock,
  FaTimes,
  FaSignInAlt,
} from "react-icons/fa";
import { ResumeViewer } from "../components/ReactPDFResume";

import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import CertificationsForm from "../components/forms/CertificationsForm";
import CustomSectionForm from "../components/forms/CustomSectionForm";
import AchievementsForm from "../components/forms/AchievementsForm";
import LanguagesForm from "../components/forms/LanguagesForm";
import ResumeTemplates from "../components/ResumeTemplates";
import VersionHistory from "../components/VersionHistory";
import TemplateCustomizer from "../components/TemplateCustomizer";
import ResumeDownload from "../components/ResumeDownload";
import SectionManager from "../components/SectionManager";

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
import { languageCreate } from "../services/routes/language";

// Import template images
import ModernTwoColumnImg from "../assets/modern_two_column.png";
import ProfessionalTwoColumnImg from "../assets/professional_two_column.png";
// Add imports for the new template images - we'll use placeholders for now
import ATSSimpleCleanImg from "../assets/ats_simple_clean.png";
import ATSFunctionalImg from "../assets/ats_functional.png";

// Import the axiosInstance and getAuthToken at the top of the file after other imports
import axiosInstance from "../services/api";
import {
  getAuthToken,
  isAuthenticated,
  getCurrentUser,
} from "../utils/userUtils";

import layout4 from "../assets/minimal-layout4.png";
import layout5 from "../assets/executive-layout5.png";
import layout6 from "../assets/acadamic-layout6.png";
import ATSFunctional from "../assets/ATSFunctional.png";
import ModernTwoColumn from "../assets/ModernTwoColumn.png";
import ProfessionalTwoColumn from "../assets/ProfessionalTwoColumn.png";
import professional from "../assets/Professional.png";
import ATSsimpleClean from "../assets/ATSSimpleClean.png";
import CompactTwoColumn from "../assets/CompactTwoColumn.png";

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
      image: professional,
      settings: templateSettings,
    },
    {
      id: "Layout4",
      name: "Minimal",
      description: "Clean and simple design focused on content",
      image: layout4,
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
      image: layout5,
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
      image: layout6,
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
      image: ModernTwoColumn,
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
      image: ProfessionalTwoColumn,
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
      id: "CompactTwoColumn",
      name: "Compact Two-Column",
      description:
        "Space-efficient design with thin header and comprehensive sidebar",
      image: CompactTwoColumn,
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
      image: ATSsimpleClean,
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
      image: ATSFunctional,
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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState(""); // 'save' or 'download'

  // Add these state variables after other state declarations, around line 476
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [resumeToEdit, setResumeToEdit] = useState(null);

  const [userData, setUserData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

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
      // Get resumes from the API
      const response = await getAllResumes();

      if (!response || response.success === false) {
        throw new Error(response?.error || "Failed to fetch resumes");
      }

      const resumesData = response.data || [];
      console.log("Fetched resumes:", resumesData);
      setSavedResumes(resumesData); // Update saved resumes state

      return resumesData;
    } catch (error) {
      console.error("Error fetching resumes:", error); // Log the error for debugging
      setErrorLoadingResumes(error.message || "Failed to fetch resumes");

      // Display error toast
      setSnackbar({
        open: true,
        message: `Error: ${error.message || "Failed to fetch resumes"}`,
        severity: "error",
      });

      return []; // Return empty array on error
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
    if (!isAuthenticated()) {
      handleAuthRequired("save");
      return;
    }

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
        setSnackbar({
          open: true,
          message: "Please fill in all required fields.",
          severity: "error",
        });

        return;
      }

      // Create resume data object
      const resumeData = {
        name: formData.personal.name || "Untitled Resume",
        personal: formData.personal,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        languages: formData.languages,
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
        "fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-lg z-50";
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

          // Check different possible locations of the ID in the response
          if (response && response.data) {
            // Check if the ID is in data._id (MongoDB standard)
            if (response.data._id) {
              setEditingResumeId(response.data._id);
            }
            // Check if the ID is directly in data (in case server formats it differently)
            else if (response.data.data && response.data.data._id) {
              setEditingResumeId(response.data.data._id);
            }
            // Check if the ID might be in a simple id field
            else if (response.data.id) {
              setEditingResumeId(response.data.id);
            }
            // Check if the ID might be in a nested data object with simple id field
            else if (response.data.data && response.data.data.id) {
              setEditingResumeId(response.data.data.id);
            } else {
              console.error("Resume ID structure unexpected:", response.data);
            }
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

      // No need for duplicate toast here
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
  const loadResumeForEditing = async (resumeId) => {
    // Show confirmation dialog instead of immediately loading
    setResumeToEdit(resumeId);
    setShowEditConfirmation(true);
  };

  const confirmLoadResumeForEditing = async () => {
    if (!resumeToEdit) return;

    const resumeId = resumeToEdit;
    try {
      setIsLoading(true);
      console.log(`Loading resume with ID: ${resumeId}`);

      // Try to find in cache first
      let resume = savedResumes.find((r) => r._id === resumeId);

      if (resume) {
        console.log("Found resume in cached savedResumes data");
      } else {
        console.log("Resume not found in cache, fetching from server");
      }

      // If not in cache or we want to ensure we have latest data, fetch from server
      if (!resume) {
        // Fetch the resume from the server using the API
        console.log(`Fetching resume data from: /resume/r/${resumeId}`);

        try {
          const response = await axiosInstance.get(`/resume/r/${resumeId}`, {
            headers: {
              Authorization: `Bearer ${getAuthToken()}`,
            },
          });

          console.log("API response:", response);

          if (response.data && response.data.success) {
            resume = response.data.data;
            console.log("Successfully fetched resume data:", resume);
          } else {
            console.error("API returned unsuccessful response:", response.data);
            throw new Error(
              response.data?.error || "Failed to fetch resume data"
            );
          }
        } catch (apiError) {
          console.error("API call error:", apiError);
          throw new Error(`API error: ${apiError.message}`);
        }
      }

      if (!resume) {
        throw new Error("Resume not found");
      }

      console.log("Loading resume for editing:", resume);

      // Set form data
      setFormData({
        personal: resume.personal || {},
        education: resume.education || [],
        experience: resume.experience || [],
        skills: resume.skills || [],
        projects: resume.projects || [],
        certifications: resume.certifications || [],
        achievements: resume.achievements || [],
        languages: resume.languages || [],
        customSections: resume.customSections || [],
        layout: resume.layout || "Layout1",
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

      // Close the confirmation dialog
      setShowEditConfirmation(false);
      setResumeToEdit(null);

      // Show success toast
      setSnackbar({
        open: true,
        message: "Resume loaded successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error loading resume for editing:", error);
      // Show error message
      setSnackbar({
        open: true,
        message: `Failed to load resume: ${error.message}`,
        severity: "error",
      });
      // Close the confirmation dialog
      setShowEditConfirmation(false);
      setResumeToEdit(null);
    } finally {
      setIsLoading(false);
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

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [
        ...(formData.languages || []),
        {
          language: "",
          proficiency: "Intermediate",
          isVisible: true,
        },
      ],
    });
  };

  const removeLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: updatedLanguages });
  };

  const handleSubmitLanguages = async () => {
    try {
      const response = await languageCreate(formData.languages);
      if (response && response.success) {
        console.log("Languages info submitted", formData.languages);
      }
    } catch (error) {
      console.log(error.message || "Failed to submit languages information");
    }
    console.log("Languages Submitted", formData.languages);
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
    // Show confirmation dialog instead of immediately deleting
    console.log(`Preparing to delete resume with ID: ${resumeId}`);
    setResumeToDelete(resumeId);
    setShowDeleteConfirmation(true);
  };

  // Add this after confirmDeleteResume function
  // Function to refresh resumes after operations
  const refreshResumes = async () => {
    try {
      console.log("Refreshing resume list");
      await fetchAllResumes();
      console.log("Resume list refreshed successfully");
    } catch (error) {
      console.error("Error refreshing resumes:", error);
      setSnackbar({
        open: true,
        message: `Error refreshing resumes: ${error.message}`,
        severity: "error",
      });
    }
  };

  // Update this part in confirmDeleteResume
  const confirmDeleteResume = async () => {
    if (!resumeToDelete) {
      console.error("No resume ID to delete");
      return;
    }

    const resumeId = resumeToDelete;
    console.log(`Confirming deletion of resume ID: ${resumeId}`);

    try {
      // Call the delete function from services
      console.log(`Calling deleteResume service for ID: ${resumeId}`);
      const response = await deleteResume(resumeId);
      console.log(`Delete service response:`, response);

      // Update the UI by removing the deleted resume
      setSavedResumes((prevResumes) =>
        prevResumes.filter((resume) => resume._id !== resumeId)
      );

      // Refresh the resume list to ensure we have the latest data
      await refreshResumes();

      // Show success message
      setSnackbar({
        open: true,
        message: "Resume deleted successfully",
        severity: "success",
      });

      // Close the confirmation dialog
      setShowDeleteConfirmation(false);
      setResumeToDelete(null);
    } catch (error) {
      console.error("Error deleting resume:", error);
      // Show error message
      setSnackbar({
        open: true,
        message: `Failed to delete resume: ${error.message}`,
        severity: "error",
      });
      // Close the confirmation dialog but keep the resume ID in case user wants to retry
      setShowDeleteConfirmation(false);
    }
  };

  // Use ReactPDF for PDF generation
  const downloadResume = () => {
    if (!isAuthenticated()) {
      handleAuthRequired("download");
      return;
    }
    // Just redirect to PDF Export page for now
    setSelectedItem("PDF Export");
  };

  // For the Create Resume section
  const renderCreateResumeSection = () => {
    return (
      <div className="space-y-6">
        {/* Floating action buttons */}
        <div className="fixed bottom-24 md:bottom-8 right-6 z-10 flex flex-col space-y-3">
          {/* Download Button */}
          <button
            onClick={downloadResume}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaDownload size={18} />
          </button>

          {/* Save Button */}
          <button
            onClick={saveResume}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaSave size={18} />
          </button>

          {/* Authentication notice for unauthenticated users */}
          {!isAuthenticated() && (
            <div className="absolute bottom-28 right-0 bg-white p-2 rounded-lg shadow-md text-xs text-gray-800 w-40 border border-gray-200">
              Sign in to save or download your resume
              <div className="absolute right-4 bottom-full w-2 h-2 transform rotate-45 bg-white border-t border-l border-gray-200"></div>
            </div>
          )}
        </div>

        {/* Rest of the create resume section */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4">
          {/* Section Navigation - hidden on mobile when a section is active */}
          <div className="md:col-span-2 mb-4 md:mb-0 order-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 md:sticky md:top-4">
              {/* Section title */}
              <div className="mb-3 border-b border-gray-100 pb-2 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1 text-indigo-600"
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
              </div>

              {/* Horizontal scrollable section buttons for mobile */}
              <div className="md:hidden flex overflow-x-auto space-x-2 py-2 pb-3 -mx-3 px-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`
                      flex-shrink-0 flex items-center p-2 rounded-md text-left transition-all duration-200
                      whitespace-nowrap
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
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Desktop vertical section buttons */}
              <div className="hidden md:block space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className={`
                      w-full flex items-center p-2 rounded-md text-left transition-all duration-200
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
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Extra management buttons */}
              <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                  <button
                    onClick={() => setActiveSection("SectionManager")}
                    className="bg-white border border-gray-200 text-gray-700 py-1.5 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <FaCogs className="mr-1.5 text-gray-500" size={10} /> Manage
                  </button>

                  <button
                    onClick={() => setActiveSection("CustomSections")}
                    className="bg-white border border-gray-200 text-gray-700 py-1.5 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    <FaPlus className="mr-1.5 text-gray-500" size={10} /> Custom
                  </button>
                </div>

                <button
                  onClick={() => setSelectedItem("Template Settings")}
                  className="w-full bg-white border border-gray-200 text-gray-700 py-1.5 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <FaThLarge className="mr-1.5 text-gray-500" size={10} />{" "}
                  Customize
                </button>

                <button
                  onClick={saveResume}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center mt-2 shadow-sm"
                >
                  <FaSave className="mr-1.5" size={10} /> Save Resume
                </button>
              </div>
            </div>
          </div>

          {/* Form section */}
          <div className="md:col-span-4 mb-6 md:mb-0 order-2">
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

              <div className="p-4">
                {renderResumeSectionForm(activeSection)}
              </div>
            </div>
          </div>

          {/* Preview section */}
          <div className="md:col-span-6 order-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:sticky md:top-4">
              <div className="mb-3 pb-3 border-b border-gray-100 flex flex-wrap justify-between items-center gap-2">
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
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={saveResume}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 rounded-md transition-colors duration-200 flex items-center"
                  >
                    <FaSave className="mr-1.5" size={12} />
                    <span className="hidden sm:inline">Save Resume</span>
                    <span className="sm:hidden">Save</span>
                  </button>

                  <button
                    type="button"
                    onClick={downloadResume}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 rounded-md transition-colors duration-200 flex items-center"
                  >
                    <FaDownload className="mr-1.5" size={12} />
                    <span className="hidden sm:inline">Download PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </button>
                </div>
              </div>

              {/* Preview container with zoom controls for mobile */}
              <div className="border border-gray-200 rounded-md overflow-hidden bg-gray-50">
                <div className="overflow-auto">
                  <div className="py-10 px-4 transform origin-top min-w-[350px] md:min-w-full">
                    {renderResumePreview()}
                  </div>
                </div>
              </div>

              {/* Mobile shortcuts */}
              <div className="md:hidden flex justify-center mt-4 space-x-4">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-md flex items-center"
                >
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  Form
                </button>

                <button
                  onClick={saveResume}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-md flex items-center"
                >
                  <FaSave className="w-3 h-3 mr-1" />
                  Save
                </button>
              </div>

              {/* Template info */}
              <div className="mt-3 py-2 px-2.5 bg-gray-50 rounded-md flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-xs text-gray-600 font-medium mr-2">
                    Template:
                  </span>
                  <span className="text-xs text-gray-500">
                    {selectedLayout === "Layout1"
                      ? "Modern"
                      : selectedLayout === "Layout2"
                      ? "Professional"
                      : selectedLayout === "Layout3"
                      ? "ATS-Friendly"
                      : selectedLayout === "ATSOptimized"
                      ? "Maximum ATS"
                      : selectedLayout === "MinimalistATS"
                      ? "Minimalist ATS"
                      : selectedLayout}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem("Resume Templates")}
                  className="text-xs text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                >
                  Change Template
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
      <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Resume Templates
          </h1>
          <p className="text-gray-500 text-sm">
            Select a professionally designed template to showcase your career
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`
          group relative border rounded-xl overflow-hidden transition-all duration-200 cursor-pointer
          hover:shadow-lg hover:-translate-y-1
          ${
            selectedLayout === template.id
              ? "ring-4 ring-indigo-500/30 border-indigo-500"
              : "border-gray-200 hover:border-gray-300"
          }
        `}
              onClick={() => handleLayoutSelect(template.id, template.settings)}
            >
              <div className="relative aspect-[1/1.414] bg-gray-50">
                {" "}
                {/* Standard A4 paper ratio */}
                <img
                  src={
                    template.image ||
                    "https://via.placeholder.com/300x424?text=Template+Preview"
                  }
                  alt={template.name}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                {selectedLayout === template.id && (
                  <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center">
                    <div className="bg-white rounded-full p-2 shadow-lg transform scale-110 transition-all">
                      <FaCheck className="text-indigo-600 w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {template.description}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedLayout === template.id
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                    }`}
                  >
                    {selectedLayout === template.id ? "Selected" : "Select"}
                  </span>
                </div>
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
          <h1 className="text-xl font-bold text-gray-800 mb-3">
            Welcome to Resume Builder
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Create a professional resume in minutes with our easy-to-use
            builder.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div
              className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedItem("Create Resume")}
            >
              <FaFileAlt className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Create New Resume
              </h3>
              <p className="text-gray-600 text-sm">
                Build a professional resume with our templates
              </p>
            </div>

            <div
              className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedItem("My Resumes")}
            >
              <FaFolder className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                My Resumes
              </h3>
              <p className="text-gray-600 text-sm">
                Access and edit your saved resumes
              </p>
            </div>

            <div
              className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedItem("Resume Templates")}
            >
              <FaThLarge className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Resume Templates
              </h3>
              <p className="text-gray-600 text-sm">
                Browse and select from our template collection
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Tips for a Great Resume
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                <span className="text-gray-700 text-sm">
                  Keep your resume concise and focused on relevant information
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                <span className="text-gray-700 text-sm">
                  Tailor your resume for each job application
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                <span className="text-gray-700 text-sm">
                  Use action verbs and quantify your achievements
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 mt-2 mr-2"></span>
                <span className="text-gray-700 text-sm">
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
        return renderMyResumesSection();
      case "Resume Templates":
        return renderResumeTemplatesSection();
      case "Template Settings":
        return (
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-gray-800">
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
                        className="w-full text-sm px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full px-2 text-sm py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 text-sm rounded-lg transition-colors duration-200"
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
                  <div className=" origin-top-left mb-4 transform overflow-hidden">
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
            <h1 className="text-xl font-bold text-gray-800 mb-6">Settings</h1>

            <div className="space-y-6">
              <div className="p-5 border border-gray-200 rounded-xl">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Account Settings
                </h2>
                <p className="text-gray-600 mb-4 text-sm">
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
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Help & Support
                </h2>
                <p className="text-gray-600 text-sm">
                  Need help? Contact our support team at
                  kabilanselvakumar313@gmail.com
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
              <h2 className="text-xl font-bold">Resume Export</h2>
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
      case "Languages":
        return (
          <LanguagesForm
            formData={formData}
            onFormChange={(field, updatedLanguages) => {
              if (field === "languages" && Array.isArray(updatedLanguages)) {
                // Handle the case where the entire languages array is updated
                setFormData({
                  ...formData,
                  languages: updatedLanguages,
                });
              } else {
                // Handle the legacy case
                handleFormChange("languages", field, updatedLanguages);
              }
            }}
            onSubmit={handleSubmitLanguages}
            errors={{}}
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
        <div className="bg-indigo-50 p-2 border-l-4 border-indigo-500 rounded-md mb-3 flex items-center">
          <FaDownload className="text-indigo-600 mr-2" />
          <p className="text-sm text-indigo-700">
            {isAuthenticated()
              ? "Use the save button to save and download buttons"
              : "Sign in to download or print your resume"}
          </p>
        </div>
        <div className="resume-content">
          <ResumeViewer
            formData={formData}
            templateSettings={templateSettings}
            selectedLayout={selectedLayout}
            sectionConfig={sectionConfig}
            isAuthenticated={isAuthenticated()} // Pass authentication status to control toolbar visibility
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

  const handleAuthRequired = (action) => {
    setAuthAction(action);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const renderAuthModal = () => {
    if (!showAuthModal) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FaLock className="mr-2 text-indigo-600" />
              Authentication Required
            </h2>
            <button
              onClick={closeAuthModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <p className="mb-4 text-gray-600">
            You need to sign in to{" "}
            {authAction === "save"
              ? "save your resume"
              : "download your resume"}
            .
          </p>

          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
            <p className="text-sm text-indigo-700">
              While anyone can create and edit resumes, you need an account to
              save or download them.
            </p>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={closeAuthModal}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={navigateToLogin}
              className="px-4 py-2 bg-indigo-600 rounded-md text-white hover:bg-indigo-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderMyResumesSection = () => {
    if (!isAuthenticated()) {
      return (
        <div className="p-8 rounded-xl bg-white shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
            <FaLock className="text-indigo-600 text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Authentication Required
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            You need to sign in to view and manage your saved resumes.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center"
          >
            <FaSignInAlt className="mr-2" />
            Sign In
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-800">My Resumes</h1>
            <button
              onClick={handleResumeCreate}
              className="bg-indigo-600 text-sm hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
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

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <FaTimes className="text-red-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                  Delete Resume
                </h2>
              </div>
              <p className="mb-6 text-gray-600 text-sm">
                Are you sure you want to delete this resume? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-2 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteResume}
                  className="px-2 py-1 text-sm bg-red-600 rounded-md text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Confirmation Dialog */}
        {showEditConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <FaFileAlt className="text-indigo-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Edit Resume</h2>
              </div>
              <p className="mb-6 text-gray-600 text-sm">
                Loading this resume will replace your current work. Do you want
                to continue?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditConfirmation(false)}
                  className="px-2 py-1 border text-sm border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLoadResumeForEditing}
                  className="px-2 py-1 text-sm bg-indigo-600 rounded-md text-white hover:bg-indigo-700"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  // Add this useEffect to get user data when component mounts
  useEffect(() => {
    const user = getCurrentUser();
    setUserData(user);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Mobile Top Navigation */}
      <MobileTopNav userName={userData?.name} onLogout={handleLogout} />

      <div className="flex flex-1 h-full">
        {/* Sidebar - Only shown on desktop */}
        <Sidebar
          onMenuClick={handleMenuClick}
          userName={userData?.name}
          onLogout={handleLogout}
          selectedItem={selectedItem}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden flex flex-col relative h-screen">
          {/* Main content with padding adjusted for mobile navigation */}
          <div className="flex-1 overflow-auto h-full pb-16 md:pb-0 pt-14 md:pt-0">
            {/* Content container */}
            <div className="px-4 py-4 md:px-8 md:py-6 h-full">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        onMenuClick={handleMenuClick}
        selectedItem={selectedItem}
      />

      {/* Snackbar notification */}
      {snackbar.open && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            snackbar.severity === "success"
              ? "bg-green-600"
              : snackbar.severity === "error"
              ? "bg-red-600"
              : "bg-indigo-600"
          }`}
        >
          <div className="flex items-center text-white">
            <span>{snackbar.message}</span>
            <button
              onClick={closeSnackbar}
              className="ml-3 text-white hover:text-gray-200"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && renderAuthModal()}

      {/* Delete/Edit Confirmation Dialogs */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <FaTimes className="text-red-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Delete Resume</h2>
            </div>
            <p className="mb-6 text-gray-600 text-sm">
              Are you sure you want to delete this resume? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-2 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteResume}
                className="px-2 py-1 text-sm bg-red-600 rounded-md text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <FaFileAlt className="text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Edit Resume</h2>
            </div>
            <p className="mb-6 text-gray-600 text-sm">
              Loading this resume will replace your current work. Do you want to
              continue?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditConfirmation(false)}
                className="px-2 py-1 border text-sm border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmLoadResumeForEditing}
                className="px-2 py-1 text-sm bg-indigo-600 rounded-md text-white hover:bg-indigo-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
