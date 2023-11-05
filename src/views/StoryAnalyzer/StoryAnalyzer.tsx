// DataAnalysisComponent.tsx

import React from "react";
import ScoreDonutChart from "./ScoreDonut";
import { Suggestion } from "./Suggestion";

interface StoryAnalyzerTemplateProps {
  score: number;
  suggestions: Suggestion[];
}

const StoryAnalyzerTemplate: React.FC<StoryAnalyzerTemplateProps> = ({
  score,
  suggestions,
}) => {
  return (
    <>
      <ScoreDonutChart score={score} />
      <ul className="list-none">
        {suggestions.map((item: Suggestion) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  );
};

export default StoryAnalyzerTemplate;
