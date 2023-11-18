import { useState } from "react";
import { AcceptanceCriteria } from "../StoryRefiner/AcceptenceCriteriaSelectModal";

const PROD = "";
const DEV = "http://127.0.0.1:5000/";

const useAcceptanceCriteria = (endpoint: string) => {
  const isValidAcceptanceCriteria = (
    data: any
  ): data is AcceptanceCriteria[] => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item.id === "string" &&
          typeof item.description === "string" &&
          typeof item.completed === "boolean"
      )
    );
  };

  const fetchCriteria = async (userStory: string) => {
    const response = await fetch(DEV + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_story: userStory }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: AcceptanceCriteria[] = await response.json();

    console.log("Response data:", result);

    return result;
  };
  return { fetchCriteria };
};

export default useAcceptanceCriteria;
