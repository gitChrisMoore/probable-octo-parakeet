import React, { useState, FunctionComponent } from "react";
import { Suggestion } from "../StoryAnalyzer/Suggestion";

interface CardProps {
  score: number;
  title: string;
  suggestions: Suggestion[];
}

const StoryCollapsibleCard: FunctionComponent<CardProps> = ({
  score,
  title,
  suggestions,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="bg-slate-100 rounded-md shadow border border-slate-200 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-sm font-semibold text-gray-900">{score}%</p>
        </div>
        <button
          className="text-sm text-blue-500 hover:text-blue-600 focus:outline-none focus:underline"
          onClick={toggleCollapse}
        >
          {isCollapsed ? "Show Suggestions" : "Hide Suggestions"}
        </button>
        {!isCollapsed && (
          <div className="mt-2">
            <ul className="list-disc pl-5 space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-xs text-gray-700">
                  {suggestion.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryCollapsibleCard;
