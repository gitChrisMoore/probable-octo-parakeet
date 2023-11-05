import { useState } from "react";

type APIResponse = {
  updated_story: string;
};

const PROD = "";
const DEV = "http://127.0.0.1:5000/";

const useStoryUpdate = (endpoint: string) => {
  const [updatedUserStory, setUpdatedUserStory] = useState<string>("");
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
        console.log(result.updated_story);

        setUpdatedUserStory(result.updated_story);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { updatedUserStory, error, fetchAnalysis };
};

export default useStoryUpdate;
