import React from "react";

interface DonutChartProps {
  score: number;
}

const ScoreDonutChart: React.FC<DonutChartProps> = ({ score }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width="100" height="100" className="mx-auto transform -rotate-90">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#e5e5e5"
        strokeWidth="10"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="#3490dc"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="18px"
        fontWeight="bold"
        transform="rotate(90 50 50)" // Counter-rotate the text
      >
        {score}
      </text>
    </svg>
  );
};

export default ScoreDonutChart;
