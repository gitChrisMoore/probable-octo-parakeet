import React from "react";

interface StoryModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const StoryModal: React.FC<StoryModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    // The backdrop covers the entire screen with a semi-transparent background
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={onClose}
    >
      {/* Modal content is centered on screen */}
      <div
        className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {/* Close button */}
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StoryModal;
