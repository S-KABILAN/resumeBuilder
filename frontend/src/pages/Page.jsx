import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; // to generate unique IDs
import Sidebar from "../components/ui/sidebar";
import TopNav from "../components/ui/topnav";
import { useNavigate, useParams, Link } from "react-router-dom"; // Import useNavigate from react-router-dom
import html2pdf from "html2pdf.js";
import Footer from "../components/ui/footer";

import ResumePreviewLayout1 from "../components/ResumePreviewLayout1";
import ResumePreviewLayout2 from "../components/ResumePreviewLayout2";
import ResumePreviewLayout3 from "../components/ResumePreviewLayout3";
import ATSOptimizedLayout from "../components/ATSOptimizedLayout";
import MinimalistATSLayout from "../components/MinimalistATSLayout";
import ATSTwoColumnLayout1 from "../components/ATSTwoColumnLayout1";
import ATSTwoColumnLayout2 from "../components/ATSTwoColumnLayout2";
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

import { PersonalInfoSubmit } from "../services/routes/personal";
import { educationCreate } from "../services/routes/education";
import { experienceCreate } from "../services/routes/experience";
import { skillCreate } from "../services/routes/skill";
import { projectCreate } from "../services/routes/project";
import { certificateCreate } from "../services/routes/certificate";
import {
  getAllResumes,
  resumeCreate,
  updateResume,
  deleteResume,
} from "../services/routes/resume";
import { saveVersion } from "../services/versionControlService";

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

  const navigate = useNavigate(); // Initialize useNavigate hook
  const resumePreviewRef = useRef(); // Create a ref for the resume preview
  const [activeItem, setActiveItem] = useState("Home");

  // Add template settings state
  const [templateSettings, setTemplateSettings] = useState({
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
      "languages",
      "projects",
      "certifications",
    ],
  });

  // Initialize with default sections configuration
  const defaultSectionConfig = [
    {
      id: "personal",
      type: "standard",
      label: "Personal Information",
      enabled: true,
    },
    { id: "education", type: "standard", label: "Education", enabled: true },
    { id: "experience", type: "standard", label: "Experience", enabled: true },
    { id: "skills", type: "standard", label: "Skills", enabled: true },
    { id: "languages", type: "standard", label: "Languages", enabled: true },
    { id: "projects", type: "standard", label: "Projects", enabled: true },
    {
      id: "certifications",
      type: "standard",
      label: "Certifications",
      enabled: true,
    },
    {
      id: "achievements",
      type: "standard",
      label: "Achievements",
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

      setSavedResumes(resumesResponse.data || []); // Assuming resumes are in `data`
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
    // Update section config state
    setSectionConfig(newConfig);

    // Update visibility in form data based on section config
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      // Update education items
      if (Array.isArray(updatedFormData.education)) {
        const educationSectionEnabled = newConfig.find(
          (section) => section.id === "education"
        )?.enabled;
        updatedFormData.education = updatedFormData.education.map((item) => ({
          ...item,
          isVisible: educationSectionEnabled,
        }));
      }

      // Update experience items
      if (Array.isArray(updatedFormData.experience)) {
        const experienceSectionEnabled = newConfig.find(
          (section) => section.id === "experience"
        )?.enabled;
        updatedFormData.experience = updatedFormData.experience.map((item) => ({
          ...item,
          isVisible: experienceSectionEnabled,
        }));
      }

      // Update skills items
      if (Array.isArray(updatedFormData.skills)) {
        const skillsSectionEnabled = newConfig.find(
          (section) => section.id === "skills"
        )?.enabled;
        updatedFormData.skills = updatedFormData.skills.map((item) => ({
          ...item,
          isVisible: skillsSectionEnabled,
        }));
      }

      // Update projects items
      if (Array.isArray(updatedFormData.projects)) {
        const projectsSectionEnabled = newConfig.find(
          (section) => section.id === "projects"
        )?.enabled;
        updatedFormData.projects = updatedFormData.projects.map((item) => ({
          ...item,
          isVisible: projectsSectionEnabled,
        }));
      }

      // Update achievements items
      if (Array.isArray(updatedFormData.achievements)) {
        const achievementsSectionEnabled = newConfig.find(
          (section) => section.id === "achievements"
        )?.enabled;
        updatedFormData.achievements = updatedFormData.achievements.map(
          (item) => ({
            ...item,
            isVisible: achievementsSectionEnabled,
          })
        );
      }

      // Update certifications items
      if (Array.isArray(updatedFormData.certifications)) {
        const certificationsSectionEnabled = newConfig.find(
          (section) => section.id === "certifications"
        )?.enabled;
        updatedFormData.certifications = updatedFormData.certifications.map(
          (item) => ({
            ...item,
            isVisible: certificationsSectionEnabled,
          })
        );
      }

      // Update custom sections
      if (Array.isArray(updatedFormData.customSections)) {
        updatedFormData.customSections = updatedFormData.customSections.map(
          (section) => {
            const sectionConfig = newConfig.find(
              (config) => config.id === section.id
            );
            return {
              ...section,
              isVisible: sectionConfig
                ? sectionConfig.enabled
                : section.isVisible,
            };
          }
        );
      }

      return updatedFormData;
    });
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
      const response = await resumeCreate(formData);
      console.log("Resume created successfully:", response.data);
      // You can update state or UI here after success
    } catch (error) {
      console.error("Error creating resume:", error.message || error);
      // Show error message to the user
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
      const response = await achievementsCreate(formData.achievements);
      if (response.success) {
        console.log("Skills info submitted", formData.achievements);
      }
    } catch (error) {
      console.log(error.message || "Failed to submit skills information");
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

  const downloadResume = async () => {
    const element = resumePreviewRef.current;

    if (!element) {
      console.error("No resume preview element found");
      return;
    }

    try {
      // Create a loading indicator
      const loadingToast = document.createElement("div");
      loadingToast.className =
        "fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded shadow-lg z-50";
      loadingToast.textContent = "Preparing your perfect resume...";
      document.body.appendChild(loadingToast);

      // Create a clone of the resume element
      const clone = element.cloneNode(true);

      // Apply necessary styles for proper PDF generation
      const container = document.createElement("div");
      container.appendChild(clone);
      document.body.appendChild(container);

      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "-9999px";

      // Set specific styles on the clone
      clone.style.width = "210mm";
      clone.style.margin = "0";
      clone.style.padding = "0"; // Remove padding to avoid gaps
      clone.style.boxShadow = "none";
      clone.style.borderRadius = "0";
      clone.style.backgroundColor = "white";
      clone.style.minHeight = "auto"; // Allow content to determine height
      clone.style.height = "auto"; // Allow content to flow to multiple pages

      // Add print-specific styles
      const styleSheet = document.createElement("style");
      styleSheet.textContent = `
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          box-sizing: border-box !important;
        }
      `;
      clone.appendChild(styleSheet);

      // Configure html2pdf options
      const opt = {
        margin: [0, 0, 0, 0], // No margins to avoid gaps [top, right, bottom, left]
        filename: `${formData.personal.name || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          letterRendering: true,
          logging: false,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
          textWithLinks: true,
          putTotalPages: true,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        // Enable text extraction/selection
        enableLinks: true,
        keepHtml: true, // This option helps preserve content for text selection
      };

      // Generate PDF with html2pdf
      await html2pdf().set(opt).from(clone).save();

      // Clean up
      document.body.removeChild(container);
      document.body.removeChild(loadingToast);

      // Show success message
      const successToast = document.createElement("div");
      successToast.className =
        "fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50";
      successToast.textContent = "Resume downloaded successfully!";
      document.body.appendChild(successToast);

      // Remove success message after 3 seconds
      setTimeout(() => {
        document.body.removeChild(successToast);
      }, 3000);
    } catch (error) {
      console.error("Error generating PDF:", error);

      // Show error message
      const errorToast = document.createElement("div");
      errorToast.className =
        "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50";
      errorToast.textContent = "Error creating PDF. Please try again.";
      document.body.appendChild(errorToast);

      // Remove error message after 3 seconds
      setTimeout(() => {
        document.body.removeChild(errorToast);
      }, 3000);
    }
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "Home":
        return (
          <div className="h-screen flex flex-col items-center justify-center font-sans">
            <div className="py-16 px-8 text-center">
              <h1 className="text-4xl font-bold mb-4">
                Build Your Perfect Resume
              </h1>
              <p className="text-lg mb-6">
                Effortlessly craft professional resumes with our guided builder.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleLayoutSelect()}
                  className="bg-blue-500 text-white px-6 py-3 rounded"
                >
                  Get Started
                </button>
                <button
                  onClick={() => handleLayoutTemplate()}
                  className="bg-gray-200 px-6 py-3 rounded"
                >
                  Explore Templates
                </button>
              </div>
              <div className="mt-8">
                <button
                  onClick={populateWithDemoData}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Use Example Resume
                </button>
              </div>
            </div>
          </div>
        );
      case "Create Resume":
        return (
          <div className="h-full">
            <TopNav
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            <div className="flex mt-4 h-[85vh]">
              {/* Form Section */}
              <div className="w-1/2 pr-4 overflow-y-auto h-full">
                {renderResumeSectionForm(activeSection)}

                {/* Section Navigation */}
                <div className="mt-6 flex space-x-2 border-t pt-4">
                  <button
                    onClick={() => setActiveSection("CustomSections")}
                    className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                  >
                    Custom Sections
                  </button>
                  <button
                    onClick={() => setActiveSection("SectionManager")}
                    className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                  >
                    Manage Sections
                  </button>
                </div>
              </div>

              {/* Preview Section */}
              <div className="w-1/2 pl-4 border-l border-gray-300 h-full overflow-y-auto relative">
                {/* Buttons Container */}
                <div className="flex justify-between mt-4 sticky top-0 bg-white z-10 p-2">
                  <button
                    onClick={saveResume}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    {editingResumeId ? "Update Resume" : "Save Resume"}
                  </button>
                  <button
                    onClick={downloadResume}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    Download Resume
                  </button>
                  <button
                    onClick={() => setSelectedItem("Template Settings")}
                    className="bg-purple-500 text-white p-2 rounded"
                  >
                    Customize Template
                  </button>
                </div>

                {/* Scrollable Content with A4 proportions for better print fidelity */}
                <div className="flex justify-center mt-4">
                  <div
                    ref={resumePreviewRef}
                    className="w-[210mm] max-w-full mx-auto bg-white shadow-md print:shadow-none overflow-hidden"
                    style={{
                      minHeight: "297mm" /* A4 height */,
                      height: "auto",
                      boxSizing: "border-box",
                      padding: "0",
                      margin: "0",
                      position: "relative",
                    }}
                  >
                    {renderResumePreview()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Template Settings":
        return (
          <div className="h-full flex flex-col">
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
              <h2 className="text-2xl font-bold">Template Customization</h2>
              <div className="w-32"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <TemplateCustomizer
                  templateSettings={templateSettings}
                  onSettingsChange={handleTemplateSettingsChange}
                />
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-lg font-medium mb-4">Preview</h3>
                <div className="scale-75 origin-top-left">
                  {renderResumePreview()}
                </div>
              </div>
            </div>
          </div>
        );
      case "Resume Templates":
        return (
          <ResumeTemplates
            onSelectTemplate={handleLayoutSelect}
            formData={formData}
            initialTemplateSettings={templateSettings}
            onNavigateBack={() => setSelectedItem("Create Resume")}
          />
        );

      case "My Resumes":
        return (
          <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              {showVersionHistory ? (
                // Show Version History
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Version History
                    </h2>
                    <button
                      onClick={() => setShowVersionHistory(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      Back to Resumes
                    </button>
                  </div>
                  <VersionHistory onApplyVersion={handleApplyVersion} />
                </div>
              ) : (
                // Show Resume List
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Your Saved Resumes
                    </h2>
                    <button
                      onClick={resetFormData}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      New Resume
                    </button>
                  </div>

                  {loadingResumes ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div
                          key={index}
                          className="h-12 bg-gray-200 rounded animate-pulse"
                        ></div>
                      ))}
                    </div>
                  ) : errorLoadingResumes ? (
                    <div className="text-center py-4 text-red-500">
                      <p>Error: {errorLoadingResumes}</p>
                    </div>
                  ) : (
                    <div className="overflow-y-auto max-h-[550px] pr-2">
                      <ul className="space-y-3">
                        {savedResumes.map((resume) => (
                          <li
                            key={resume._id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          >
                            <span className="font-medium text-gray-700">
                              {resume.name}
                            </span>
                            <div className="space-x-2">
                              <button
                                onClick={() => loadResumeForEditing(resume._id)}
                                className="px-3 py-1 text-sm bg-white border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition-colors duration-200"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedResumeForHistory(resume._id);
                                  setShowVersionHistory(true);
                                }}
                                className="px-3 py-1 text-sm bg-white border border-purple-500 text-purple-500 rounded hover:bg-purple-50 transition-colors duration-200"
                              >
                                Version History
                              </button>
                              <button
                                onClick={() => handleDeleteResume(resume._id)}
                                className="px-3 py-1 text-sm bg-white border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors duration-200"
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      case "Settings":
        return <div>Adjust your settings</div>;
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
    // Switch based on selected layout template
    switch (selectedLayout) {
      case "Layout1":
        return (
          <ResumePreviewLayout1
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "Layout2":
        return (
          <ResumePreviewLayout2
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "Layout3":
        return (
          <ResumePreviewLayout3
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "ATSOptimized":
        return (
          <ATSOptimizedLayout
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "MinimalistATS":
        return (
          <MinimalistATSLayout
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "ATSTwoColumnLayout1":
        return (
          <ATSTwoColumnLayout1
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      case "ATSTwoColumnLayout2":
        return (
          <ATSTwoColumnLayout2
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
      default:
        return (
          <ResumePreviewLayout1
            formData={formData}
            templateSettings={templateSettings}
            sectionConfig={sectionConfig}
          />
        );
    }
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
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <Sidebar
          onMenuClick={handleMenuClick}
          selectedItem={selectedItem}
          userName={userName}
          onLogout={handleLogout}
        />
        <main className="flex-grow p-6 overflow-hidden">
          {/* Loading overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2">Saving your resume...</p>
              </div>
            </div>
          )}

          {/* Snackbar */}
          {snackbar.open && (
            <div
              className={`fixed top-4 right-4 px-6 py-3 rounded shadow-lg z-50 flex items-center justify-between
                ${
                  snackbar.severity === "success"
                    ? "bg-green-600 text-white"
                    : snackbar.severity === "error"
                    ? "bg-red-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
            >
              <span>{snackbar.message}</span>
              <button
                onClick={closeSnackbar}
                className="ml-4 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Page;
