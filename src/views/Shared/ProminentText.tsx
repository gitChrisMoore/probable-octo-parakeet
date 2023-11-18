import React from "react";

interface ProminentTextProps {
  children: React.ReactNode;
}

const ProminentText: React.FC<ProminentTextProps> = ({ children }) => {
  return <p className="text-lg font-semibold text-gray-800 mb-2">{children}</p>;
};

export default ProminentText;
