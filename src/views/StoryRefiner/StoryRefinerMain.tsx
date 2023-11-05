import React, { useState } from "react";
import StoryInput from "./StoryInput";
import useStoryAnalysis from "../StoryAnalyzer/useStoryAnalysis";

import StoryCollapsibleCard from "./StoryCollapsibleCard";
import StoryModal from "./StoryModal";
import useStoryUpdate from "../StoryUpdate/useStoryUpdate";
import StoryButton, { ButtonVariant } from "./StoryButton";

const StoryRefinerMain: React.FC = () => {
  const [story, setStory] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const dataAnalysis = useStoryAnalysis("api/story/data-analysis");
  const uiAnalysis = useStoryAnalysis("api/story/ui-analysis");
  const dataUpdate = useStoryUpdate("api/story/data-reccomendation");

  const handleStoryInputSubmit = (story: string) => {
    console.log(story);
    dataAnalysis.fetchAnalysis(story);
    uiAnalysis.fetchAnalysis(story);
  };

  const setStoryBasicCoveredMember = () => {
    setStory(
      "As a Covered Member, I want to submit a short term disability claim."
    );
  };
  // shhould use dataUpdate
  const handleStortyUpdate = async () => {
    try {
      const response = await dataUpdate.fetchAnalysis(story);
      console.log("handle story update");

      console.log(response);
      console.log("handle story update");
      setApiResponse(response);
      setModalVisible(true);
    } catch (error) {
      console.error("Error calling the API", error);
      // Handle error as needed
    }
  };

  // Accept the API response and update the story
  const handleAccept = () => {
    setStory(dataUpdate.updatedUserStory);
    setModalVisible(false);
  };

  // Dismiss the modal and do not update the story
  const handleDismiss = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div className="flex flex-col md:mx-4 md:flex-row ">
        <div className="flex-1 py-4 md:mr-3 rounded-lg">
          Left Pane
          <div className="bg-slate-100 p-4 my-2 rounded-md shadow border border-slate-200 flex flex-col">
            <StoryInput
              story={story}
              setStory={setStory}
              onSubmit={() => handleStoryInputSubmit(story)}
            />
            <div>
              <StoryButton
                variant={ButtonVariant.Elevated}
                type="submit"
                onClick={handleStortyUpdate}
              >
                Suggest Data Update
              </StoryButton>
            </div>
          </div>
        </div>
        <div className=" py-4 w-full md:w-[360px] md:ml-3 rounded-lg">
          Right Pane
          <div className="space-y-2">
            <StoryCollapsibleCard
              title="Data Analysis"
              score={dataAnalysis.score}
              suggestions={dataAnalysis.suggestions}
            />
            <StoryCollapsibleCard
              title="UI Analysis"
              score={uiAnalysis.score}
              suggestions={uiAnalysis.suggestions}
            />
          </div>
        </div>
      </div>
      <div className="flex">Admin Panel</div>
      <div>
        <StoryButton
          variant={ButtonVariant.Elevated}
          type="submit"
          onClick={setStoryBasicCoveredMember}
        >
          Set Basic Story
        </StoryButton>
      </div>
      {/* Modals */}
      <StoryModal show={modalVisible} onClose={handleDismiss}>
        <div>
          {dataUpdate.updatedUserStory && (
            <div>
              <p>{dataUpdate.updatedUserStory}</p>
              <button onClick={handleAccept}>Accept</button>
              <button onClick={handleDismiss}>Dismiss</button>
            </div>
          )}
        </div>
      </StoryModal>
    </>
  );
};

export default StoryRefinerMain;
