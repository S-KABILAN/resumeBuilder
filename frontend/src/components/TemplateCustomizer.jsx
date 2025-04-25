import React, { useState } from "react";

const TemplateCustomizer = ({ templateSettings, onSettingsChange }) => {
  // Color palette options
  const colorPalettes = [
    {
      id: "classic",
      name: "Classic Blue",
      primary: "#2563eb",
      secondary: "#1e40af",
      accent: "#3b82f6",
      text: "#1f2937",
      background: "#ffffff",
    },
    {
      id: "modern",
      name: "Modern Gray",
      primary: "#4b5563",
      secondary: "#374151",
      accent: "#6b7280",
      text: "#111827",
      background: "#f9fafb",
    },
    {
      id: "professional",
      name: "Professional Green",
      primary: "#059669",
      secondary: "#047857",
      accent: "#10b981",
      text: "#1f2937",
      background: "#f0fdf4",
    },
    {
      id: "creative",
      name: "Creative Purple",
      primary: "#7c3aed",
      secondary: "#6d28d9",
      accent: "#8b5cf6",
      text: "#1f2937",
      background: "#ffffff",
    },
    {
      id: "elegant",
      name: "Elegant Maroon",
      primary: "#be123c",
      secondary: "#9f1239",
      accent: "#e11d48",
      text: "#1f2937",
      background: "#fff1f2",
    },
  ];

  // Font family options
  const fontOptions = [
    {
      id: "sans",
      name: "Sans-Serif",
      value: "ui-sans-serif, system-ui, sans-serif",
    },
    { id: "serif", name: "Serif", value: "ui-serif, Georgia, Cambria, serif" },
    {
      id: "mono",
      name: "Monospace",
      value: "ui-monospace, SFMono-Regular, Menlo, monospace",
    },
    {
      id: "poppins",
      name: "Poppins",
      value: "Poppins, sans-serif",
    },
    {
      id: "roboto",
      name: "Roboto",
      value: "Roboto, sans-serif",
    },
    {
      id: "open-sans",
      name: "Open Sans",
      value: "Open Sans, sans-serif",
    },
  ];

  // Font size options
  const fontSizeOptions = [
    { id: "small", name: "Small", value: "small" },
    { id: "medium", name: "Medium", value: "medium" },
    { id: "large", name: "Large", value: "large" },
  ];

  // Section ordering options
  const sectionOrderOptions = [
    {
      id: "standard",
      name: "Standard",
      order: [
        "education",
        "experience",
        "skills",
        "projects",
        "certifications",
      ],
    },
    {
      id: "skills-first",
      name: "Skills First",
      order: [
        "skills",
        "experience",
        "education",
        "projects",
        "certifications",
      ],
    },
    {
      id: "projects-first",
      name: "Projects First",
      order: [
        "projects",
        "experience",
        "skills",
        "education",
        "certifications",
      ],
    },
  ];

  // Spacing options
  const spacingOptions = [
    { id: "compact", name: "Compact", value: "tight" },
    { id: "balanced", name: "Balanced", value: "normal" },
    { id: "spacious", name: "Spacious", value: "relaxed" },
  ];

  // Content spacing options
  const contentSpacingOptions = [
    { id: "narrow", name: "Narrow", value: "narrow" },
    { id: "standard", name: "Standard", value: "standard" },
    { id: "wide", name: "Wide", value: "wide" },
  ];

  const handleColorPaletteChange = (paletteId) => {
    const selectedPalette = colorPalettes.find(
      (palette) => palette.id === paletteId
    );
    if (selectedPalette) {
      onSettingsChange({
        ...templateSettings,
        colors: {
          primary: selectedPalette.primary,
          secondary: selectedPalette.secondary,
          accent: selectedPalette.accent,
          text: selectedPalette.text,
          background: selectedPalette.background,
        },
      });
    }
  };

  const handleFontChange = (fontId) => {
    const selectedFont = fontOptions.find((font) => font.id === fontId);
    if (selectedFont) {
      onSettingsChange({
        ...templateSettings,
        font: selectedFont.value,
      });
    }
  };

  const handleFontSizeChange = (sizeId) => {
    const selectedSize = fontSizeOptions.find((size) => size.id === sizeId);
    if (selectedSize) {
      onSettingsChange({
        ...templateSettings,
        fontSize: selectedSize.value,
      });
    }
  };

  const handleContentSpacingChange = (contentSpacingId) => {
    const selectedContentSpacing = contentSpacingOptions.find(
      (option) => option.id === contentSpacingId
    );
    if (selectedContentSpacing) {
      onSettingsChange({
        ...templateSettings,
        contentSpacing: selectedContentSpacing.value,
      });
    }
  };

  const handleSectionOrderChange = (orderId) => {
    const selectedOrder = sectionOrderOptions.find(
      (option) => option.id === orderId
    );
    if (selectedOrder) {
      onSettingsChange({
        ...templateSettings,
        sectionOrder: selectedOrder.order,
      });
    }
  };

  const handleSpacingChange = (spacingId) => {
    const selectedSpacing = spacingOptions.find(
      (option) => option.id === spacingId
    );
    if (selectedSpacing) {
      onSettingsChange({
        ...templateSettings,
        spacing: selectedSpacing.value,
      });
    }
  };

  // Custom color handler
  const handleCustomColorChange = (colorType, value) => {
    onSettingsChange({
      ...templateSettings,
      colors: {
        ...templateSettings.colors,
        [colorType]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 resume-content">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 resume-section-title">
        Customize Your Template
      </h2>

      {/* Color Palette Selection */}
      <div className="mb-8 resume-section">
        <h3 className="text-lg font-medium mb-3 text-gray-700 pb-1 border-b">
          Color Palette
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {colorPalettes.map((palette) => (
            <div
              key={palette.id}
              className={`cursor-pointer rounded-lg p-3 border transition-all ${
                templateSettings.colors.primary === palette.primary
                  ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleColorPaletteChange(palette.id)}
            >
              <div className="flex items-center mb-2">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: palette.primary }}
                ></div>
                <span className="text-sm font-medium">{palette.name}</span>
              </div>
              <div className="flex space-x-1">
                {[palette.primary, palette.secondary, palette.accent].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: color }}
                    ></div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom color pickers */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={templateSettings.colors.primary}
                onChange={(e) =>
                  handleCustomColorChange("primary", e.target.value)
                }
                className="h-8 w-8 cursor-pointer rounded border border-gray-300"
              />
              <input
                type="text"
                value={templateSettings.colors.primary}
                onChange={(e) =>
                  handleCustomColorChange("primary", e.target.value)
                }
                className="ml-2 h-8 text-sm px-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secondary Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={templateSettings.colors.secondary}
                onChange={(e) =>
                  handleCustomColorChange("secondary", e.target.value)
                }
                className="h-8 w-8 cursor-pointer rounded border border-gray-300"
              />
              <input
                type="text"
                value={templateSettings.colors.secondary}
                onChange={(e) =>
                  handleCustomColorChange("secondary", e.target.value)
                }
                className="ml-2 h-8 text-sm px-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Accent Color
            </label>
            <div className="flex">
              <input
                type="color"
                value={templateSettings.colors.accent}
                onChange={(e) =>
                  handleCustomColorChange("accent", e.target.value)
                }
                className="h-8 w-8 cursor-pointer rounded border border-gray-300"
              />
              <input
                type="text"
                value={templateSettings.colors.accent}
                onChange={(e) =>
                  handleCustomColorChange("accent", e.target.value)
                }
                className="ml-2 h-8 text-sm px-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Font Selection */}
      <div className="mb-8 resume-section">
        <h3 className="text-lg font-medium mb-3 text-gray-700 pb-1 border-b">
          Font Style
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {fontOptions.map((font) => (
            <div
              key={font.id}
              className={`cursor-pointer rounded-lg p-3 border transition-all ${
                templateSettings.font === font.value
                  ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleFontChange(font.id)}
              style={{ fontFamily: font.value }}
            >
              <span className="text-sm font-medium">{font.name}</span>
              <p className="text-xs mt-1 text-gray-500">Aa Bb Cc 123</p>
            </div>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="mb-8 resume-section">
        <h3 className="text-lg font-medium mb-3 text-gray-700 pb-1 border-b">
          Font Size
        </h3>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {fontSizeOptions.map((size) => (
            <div
              key={size.id}
              className={`cursor-pointer rounded-lg p-3 border transition-all ${
                templateSettings.fontSize === size.value
                  ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleFontSizeChange(size.id)}
            >
              <div className="flex items-center justify-center">
                <span
                  className={`font-medium ${
                    size.id === "small"
                      ? "text-sm"
                      : size.id === "medium"
                      ? "text-base"
                      : "text-lg"
                  }`}
                >
                  {size.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Spacing */}
      <div className="mb-8 resume-section">
        <h3 className="text-lg font-medium mb-3 text-gray-700 pb-1 border-b">
          Content Spacing
        </h3>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {contentSpacingOptions.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer rounded-lg p-3 border transition-all ${
                templateSettings.contentSpacing === option.value
                  ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleContentSpacingChange(option.id)}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium mb-1">{option.name}</span>
                <div className="flex flex-col w-full mt-1">
                  <div
                    className={`w-full h-1 bg-gray-300 rounded-full mb-${
                      option.id === "narrow"
                        ? "1"
                        : option.id === "standard"
                        ? "2"
                        : "3"
                    }`}
                  ></div>
                  <div
                    className={`w-full h-1 bg-gray-300 rounded-full mb-${
                      option.id === "narrow"
                        ? "1"
                        : option.id === "standard"
                        ? "2"
                        : "3"
                    }`}
                  ></div>
                  <div className="w-full h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing Selection */}
      <div className="mb-8 resume-section">
        <h3 className="text-lg font-medium mb-3 text-gray-700 pb-1 border-b">
          Section Spacing
        </h3>
        <div className="grid grid-cols-3 gap-3 mt-4">
          {spacingOptions.map((spacing) => (
            <div
              key={spacing.id}
              className={`cursor-pointer rounded-lg p-3 border transition-all ${
                templateSettings.spacing === spacing.value
                  ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleSpacingChange(spacing.id)}
            >
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium">{spacing.name}</span>
              </div>
              <div className="flex flex-col items-center mt-2">
                <div className="bg-gray-200 h-2 w-16 mb-1"></div>
                <div className="bg-gray-300 h-4 w-16 mb-1"></div>
                <div
                  className={`h-${
                    spacing.id === "compact"
                      ? "1"
                      : spacing.id === "balanced"
                      ? "2"
                      : "3"
                  }`}
                ></div>
                <div className="bg-gray-200 h-2 w-16 mb-1"></div>
                <div className="bg-gray-300 h-4 w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Order */}
      <div className="mb-8 resume-section">
        <h3 className="text-lg font-medium mb-3 text-gray-700 pb-1 border-b">
          Section Order
        </h3>
        <div className="grid grid-cols-1 gap-3 mt-4">
          {sectionOrderOptions.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer rounded-lg p-3 border transition-all ${
                JSON.stringify(templateSettings.sectionOrder) ===
                JSON.stringify(option.order)
                  ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleSectionOrderChange(option.id)}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{option.name}</span>
                <div className="flex flex-col space-y-1">
                  {option.order.slice(0, 3).map((section, i) => (
                    <div
                      key={i}
                      className="flex items-center text-xs text-gray-500"
                    >
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100 mr-1">
                        {i + 1}
                      </span>
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer;
