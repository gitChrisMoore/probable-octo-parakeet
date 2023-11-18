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
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md shadow-lg p-4 mx-4 w-full md:w-3/4 md:mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default StoryModal;
