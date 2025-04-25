import React, { useState, useCallback, memo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimation,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Individual sortable section item - memoized for performance
const SortableSection = memo(({ section, onToggle }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  // Use both active and enabled for backward compatibility
  const isVisible =
    section.active !== undefined ? section.active : section.enabled;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 mb-2 border rounded-md shadow-sm cursor-move transition-all ${
        isVisible
          ? "bg-white"
          : "bg-gray-100 opacity-80 border-dashed border-gray-300"
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center">
        <div className="flex flex-col justify-center w-6 h-6 mr-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isVisible}
            onChange={() => onToggle(section.id)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
          <span
            className={`ml-2 font-medium ${
              isVisible ? "text-gray-700" : "text-gray-500"
            }`}
          >
            {section.label}
          </span>
        </label>
      </div>
      <div
        className={`px-2 py-0.5 rounded text-xs ${
          isVisible
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-500"
        }`}
        title={
          isVisible
            ? "This section will be visible in your resume"
            : "This section will be hidden in your resume"
        }
      >
        {isVisible ? "Visible" : "Hidden"}
      </div>
    </div>
  );
});

SortableSection.displayName = "SortableSection";

const SectionManager = ({ activeSections = [], onSectionsChange }) => {
  const [sections, setSections] = useState(activeSections);
  const [activeId, setActiveId] = useState(null);

  // Optimized sensors configuration with adjusted activation constraints
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Reduce the distance required to start dragging
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Optimized drop animation for smoother experience
  const dropAnimation = {
    ...defaultDropAnimation,
    dragSourceOpacity: 0.5,
  };

  // Memoized event handlers to prevent unnecessary re-renders
  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      setActiveId(null);

      if (over && active.id !== over.id) {
        setSections((items) => {
          // Find indices directly without using findIndex for better performance
          let oldIndex = -1;
          let newIndex = -1;

          for (let i = 0; i < items.length; i++) {
            if (items[i].id === active.id) oldIndex = i;
            if (items[i].id === over.id) newIndex = i;
            if (oldIndex !== -1 && newIndex !== -1) break;
          }

          if (oldIndex !== -1 && newIndex !== -1) {
            const newOrder = arrayMove(items, oldIndex, newIndex);
            // Debounce the callback to avoid excessive updates
            requestAnimationFrame(() => {
              onSectionsChange(newOrder);
            });
            return newOrder;
          }

          return items;
        });
      }
    },
    [onSectionsChange]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  // Memoized toggle handler
  const handleToggle = useCallback(
    (id) => {
      setSections((prevSections) => {
        const newSections = prevSections.map((section) => {
          if (section.id === id) {
            // Update both active and enabled properties for compatibility
            return {
              ...section,
              active: !section.active,
              enabled: !section.enabled,
            };
          }
          return section;
        });
        onSectionsChange(newSections);
        return newSections;
      });
    },
    [onSectionsChange]
  );

  // Get the active section for drag overlay
  const activeSection = activeId
    ? sections.find((section) => section.id === activeId)
    : null;

  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Customize Resume Sections
      </h3>
      <div className="flex items-center mb-3">
        <p className="text-sm text-gray-600 flex-grow">
          Drag to reorder sections or toggle visibility using the checkboxes
        </p>
        <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          Changes apply immediately to preview
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              onToggle={handleToggle}
            />
          ))}
        </SortableContext>

        <DragOverlay dropAnimation={dropAnimation}>
          {activeId && activeSection ? (
            <div className="p-3 border rounded-md shadow-md bg-blue-50 opacity-90">
              <span className="font-medium">{activeSection.label}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="mt-4 text-sm text-gray-500 flex items-center p-2 bg-yellow-50 border border-yellow-200 rounded">
        <svg
          className="h-5 w-5 text-yellow-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>Unchecked sections won't appear in your resume</p>
      </div>
    </div>
  );
};

export default SectionManager;
