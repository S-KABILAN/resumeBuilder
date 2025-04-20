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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Customize Your Template
      </h2>

      {/* Color Palette Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">
          Color Palette
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
      </div>

      {/* Font Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">Font Style</h3>
        <div className="grid grid-cols-3 gap-3">
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
            </div>
          ))}
        </div>
      </div>

      {/* Section Order */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">
          Section Order
        </h3>
        <div className="grid grid-cols-1 gap-3">
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
                    <div key={i} className="text-xs text-gray-500">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                      {i < 2 && " →"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-700">
          Layout Spacing
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {spacingOptions.map((option) => (
            <div
              key={option.id}
              className={`cursor-pointer rounded-lg p-3 border transition-all ${
                templateSettings.spacing === option.value
                  ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleSpacingChange(option.id)}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm font-medium">{option.name}</span>
                <div
                  className={`mt-1 flex ${
                    option.value === "tight"
                      ? "space-x-1"
                      : option.value === "normal"
                      ? "space-x-2"
                      : "space-x-3"
                  }`}
                >
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gray-300 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        These settings will be saved with your resume.
      </div>
    </div>
  );
};

export default TemplateCustomizer;
