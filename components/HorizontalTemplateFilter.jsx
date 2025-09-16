

"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function HorizontalTemplateFilter({ onFilterChange, onReset }) {
  const [selectedCareerStages, setSelectedCareerStages] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const filterRef = useRef(null);

  const careerStages = [
    { value: "fresher", label: "Fresher" },
    { value: "experienced", label: "Experienced" },
  ];

  const styles = [
    { value: "modern", label: "Modern" },
    { value: "professional", label: "Professional" },
    { value: "simple", label: "Simple" },
  ];

  const roles = [
    { value: "software-engineer", label: "Software Engineer" },
    { value: "product-manager", label: "Product Manager" },
    { value: "data-analyst", label: "Data Analyst" },
    { value: "ui-ux-designer", label: "UI/UX Designer" },
    { value: "marketing-manager", label: "Marketing Manager" },
    { value: "sales-executive", label: "Sales Executive" },
    { value: "project-manager", label: "Project Manager" },
    { value: "business-analyst", label: "Business Analyst" },
    { value: "graphic-designer", label: "Graphic Designer" },
    { value: "content-writer", label: "Content Writer" },
    { value: "teacher", label: "Teacher" },
    { value: "accountant", label: "Accountant" },
    { value: "investment-banking", label: "Investment Banking" },
    { value: "video-editor", label: "Video Editor" },
    { value: "model", label: "Model" },
    { value: "freelancer", label: "Freelancer" },
  ];

  const handleFilterChange = useCallback(() => {
    onFilterChange({
      careerStages: selectedCareerStages,
      styles: selectedStyles,
      roles: selectedRoles,
    });
  }, [selectedCareerStages, selectedStyles, selectedRoles, onFilterChange]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  const resetFilters = useCallback(() => {
    setSelectedCareerStages([]);
    setSelectedStyles([]);
    setSelectedRoles([]);
    setOpenDropdown(null);

    onFilterChange({ careerStages: [], styles: [], roles: [] });
    if (onReset) onReset();
  }, [onFilterChange, onReset]);

  const toggleFilter = useCallback((filterType, value) => {
    const toggle = (prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];

    if (filterType === "careerStage") setSelectedCareerStages(toggle);
    if (filterType === "style") setSelectedStyles(toggle);
    if (filterType === "role") setSelectedRoles(toggle);

    // ✅ Auto-close after selecting
    setOpenDropdown(null);
  }, []);

  const hasActiveFilters = useCallback(
    () =>
      selectedCareerStages.length > 0 ||
      selectedStyles.length > 0 ||
      selectedRoles.length > 0,
    [selectedCareerStages, selectedStyles, selectedRoles]
  );

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // ✅ close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // 🔽 helper: renders button with rotating arrow
  const FilterButton = ({ label, activeCount, isOpen, onClick }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs md:px-4 md:py-2 md:text-base rounded-full font-medium flex items-center gap-1 md:gap-2 transition-all whitespace-nowrap ${
        activeCount > 0
          ? "bg-teal-500 text-white shadow-md"
          : "bg-white text-gray-700 hover:bg-amber-50 border border-gray-200"
      }`}
    >
      {label}
      {activeCount > 0 && (
        <span className="bg-white text-teal-600 rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs">
          {activeCount}
        </span>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-3 w-3 md:h-4 md:w-4 transform transition-transform duration-200 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );

  return (
    <div
      ref={filterRef}
      className="
        relative mb-6 py-2 px-2 bg-white rounded-2xl shadow-sm border border-gray-200
        md:py-4 md:px-4
      "
    >
      {/* Scrollable row for buttons */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-nowrap md:flex-wrap md:overflow-visible md:gap-3">
        {/* Career */}
        <div className="relative flex-shrink-0">
          <FilterButton
            label="Career"
            activeCount={selectedCareerStages.length}
            isOpen={openDropdown === "career"}
            onClick={() => handleDropdownToggle("career")}
          />
        </div>

        {/* Style */}
        <div className="relative flex-shrink-0">
          <FilterButton
            label="Style"
            activeCount={selectedStyles.length}
            isOpen={openDropdown === "style"}
            onClick={() => handleDropdownToggle("style")}
          />
        </div>

        {/* Role */}
        <div className="relative flex-shrink-0">
          <FilterButton
            label="Role"
            activeCount={selectedRoles.length}
            isOpen={openDropdown === "role"}
            onClick={() => handleDropdownToggle("role")}
          />
        </div>

        {/* All Resumes */}
        <button
          onClick={resetFilters}
          className="bg-teal-500 text-white px-3 py-1 text-xs md:px-4 md:py-2 md:text-base rounded-full font-medium hover:bg-teal-600 transition-colors flex items-center ml-auto whitespace-nowrap"
        >
          All
        </button>

        {/* Clear */}
        {hasActiveFilters() && (
          <button
            onClick={resetFilters}
            className="text-[11px] md:text-sm text-gray-600 hover:text-gray-800 flex items-center transition-colors whitespace-nowrap"
          >
            Clear
          </button>
        )}
      </div>

      {/* Dropdown Panels */}
      {openDropdown === "career" && (
        <div className="absolute left-2 top-full mt-2 w-40 md:w-48 bg-white rounded-xl shadow-2xl z-20 border border-gray-200">
          <div className="py-2">
            {careerStages.map((stage) => (
              <button
                key={stage.value}
                onClick={() => toggleFilter("careerStage", stage.value)}
                className={`w-full text-left px-3 py-1.5 md:px-4 md:py-2 hover:bg-amber-50 flex items-center ${
                  selectedCareerStages.includes(stage.value)
                    ? "bg-amber-50 font-medium text-amber-700"
                    : "text-gray-700"
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {openDropdown === "style" && (
        <div className="absolute left-2 top-full mt-2 w-40 md:w-48 bg-white rounded-xl shadow-2xl z-20 border border-gray-200">
          <div className="py-2">
            {styles.map((style) => (
              <button
                key={style.value}
                onClick={() => toggleFilter("style", style.value)}
                className={`w-full text-left px-3 py-1.5 md:px-4 md:py-2 hover:bg-amber-50 flex items-center ${
                  selectedStyles.includes(style.value)
                    ? "bg-amber-50 font-medium text-amber-700"
                    : "text-gray-700"
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {openDropdown === "role" && (
        <div className="absolute left-2 top-full mt-2 w-60 md:w-72 bg-white rounded-xl shadow-2xl z-20 max-h-64 md:max-h-96 overflow-y-auto border border-gray-200">
          <div className="py-2">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => toggleFilter("role", role.value)}
                className={`w-full text-left px-3 py-1.5 md:px-4 md:py-2 hover:bg-amber-50 flex items-center ${
                  selectedRoles.includes(role.value)
                    ? "bg-amber-50 font-medium text-amber-700"
                    : "text-gray-700"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}