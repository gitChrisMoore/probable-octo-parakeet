import { useState } from "react";

type APIResponse = {
  score: number;
  suggestions: string[];
};

type Suggestion = {
  id: number;
  text: string;
};

const PROD = "";
const DEV = "http://127.0.0.1:5000/";

const useStoryAnalysis = (endpoint: string) => {
  const [score, setScore] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = (userStory: string) => {
    fetch(DEV + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_story: userStory }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result: APIResponse) => {
        console.log("result");

        console.log(result);
        console.log("result");
        setScore(result.score);
        const processedSuggestions = result.suggestions.map(
          (suggestion, index) => ({
            id: index,
            text: suggestion,
          })
        );
        setSuggestions(processedSuggestions);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { score, suggestions, error, fetchAnalysis };
};

export default useStoryAnalysis;
