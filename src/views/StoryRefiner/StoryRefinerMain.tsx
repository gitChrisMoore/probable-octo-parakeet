import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StoryInput from "./StoryInput";
import useStoryAnalysis from "../StoryAnalyzer/useStoryAnalysis";

import StoryCollapsibleCard from "./StoryCollapsibleCard";

import useStoryUpdate from "../StoryUpdate/useStoryUpdate";
import StoryButton, { ButtonVariant } from "./StoryButton";
import AcceptenceCriteriaSelectModal, {
  AcceptanceCriteria,
} from "./AcceptenceCriteriaSelectModal";
import AcceptanceCriteriaList from "./AcceptanceCriteriaList";
import ProminentText from "../Shared/ProminentText";

const StoryRefinerMain: React.FC = () => {
  const [story, setStory] = useState<string>("");
  const [enrichedStory, setEnrichedStory] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const dataAnalysis = useStoryAnalysis("api/story/data-analysis");
  const uiAnalysis = useStoryAnalysis("api/story/ui-analysis");
  const dataUpdate = useStoryUpdate("api/story/data-reccomendation");
  const [criteria, setCriteria] = useState<AcceptanceCriteria[]>([]);
  const [tempCriteria, setTempCriteria] = useState<AcceptanceCriteria[]>([]);

  const enrichStory = (story: string, criteria: AcceptanceCriteria[]) => {
    if (criteria.length === 0) {
      return story;
    }

    const enrichedStory = story + "\n\nAcceptance Criteria:\n";
    const enrichedStoryWithCriteria = criteria.reduce(
      (acc, criterion) => acc + "- " + criterion.description + "\n",
      enrichedStory
    );
    return enrichedStoryWithCriteria;
  };

  const handleStoryInputSubmit = (story: string) => {
    console.log(enrichStory(story, criteria));
    dataAnalysis.fetchAnalysis(enrichStory(story, criteria));
    uiAnalysis.fetchAnalysis(enrichStory(story, criteria));
  };

  const setStoryBasicCoveredMember = () => {
    setStory(
      "As a Covered Member, I want to submit a short term disability claim."
    );
  };
  // shhould use dataUpdate d
  const handleStortyUpdate = async () => {
    try {
      // const response = await dataUpdate.fetchAnalysis(story);
      // console.log("handle story update");

      // console.log(response);
      // console.log("handle story update");
      // setApiResponse(response);
      setModalVisible(true);
    } catch (error) {
      console.error("Error calling the API", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    const enrichedStory = enrichStory(story, criteria);
    setEnrichedStory(enrichedStory);
  }, [story, criteria]);

  // Accept the API response and update the story
  const handleAccept = () => {
    setStory(dataUpdate.updatedUserStory);
    setModalVisible(false);
  };

  const handleAddNewCriterion = () => {
    setCriteria([
      ...criteria,
      {
        id: uuidv4(),
        description: "",
        checked: false,
      },
    ]);
  };

  // onAddCriteriaClick should add the tempCriteria to the main criteria
  const handleAddCriteria = () => {
    const checkedCriteria = tempCriteria.filter(
      (criterion) => criterion.checked
    );
    const checkedCriteriaWithUniqueKeys = checkedCriteria.map((criterion) => ({
      ...criterion,
      id: uuidv4(), // Generate a unique identifier for each criterion
    }));
    setCriteria([...criteria, ...checkedCriteriaWithUniqueKeys]);
    setTempCriteria([]);
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
          {/* LEFT PANE */}

          <ProminentText>User Story:</ProminentText>

          <div className="bg-slate-100 p-4 my-2 rounded-md shadow border border-slate-200 flex flex-col">
            <StoryInput
              story={story}
              setStory={setStory}
              onSubmit={() => handleStoryInputSubmit(story)}
            />
          </div>
          {/*  */}
          {/* Acceptance Criteria */}
          {/*  */}
          <div className="mt-8 mb-4 flex justify-between items-center">
            <ProminentText>Acceptance Criteria:</ProminentText>
            <StoryButton
              variant={ButtonVariant.Elevated}
              onClick={handleAddNewCriterion}
            >
              Add New
            </StoryButton>
          </div>

          <div className="bg-slate-100 px-4 my-2 rounded-md shadow  flex flex-col">
            <AcceptanceCriteriaList
              criteria={criteria}
              setCriteria={setCriteria}
            />
          </div>
          <div>
            <StoryButton
              variant={ButtonVariant.Elevated}
              type="submit"
              onClick={handleStortyUpdate}
            >
              Suggest Data Acceptance Criteria
            </StoryButton>
          </div>
        </div>
        <div className=" py-4 w-full md:w-[360px] md:ml-3 rounded-lg">
          {/* RIGHT PANE */}

          <ProminentText>Completeness Score:</ProminentText>
          <div className="space-y-2 my-2">
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

      <div className="mt-16">
        <p> Admin Panel</p>
        <StoryButton
          variant={ButtonVariant.Elevated}
          type="submit"
          onClick={setStoryBasicCoveredMember}
        >
          Set Basic Story
        </StoryButton>
      </div>
      {/* Modals */}
      <AcceptenceCriteriaSelectModal
        story={enrichedStory}
        visible={modalVisible}
        criteria={tempCriteria}
        setCriteria={setTempCriteria}
        onClose={handleDismiss}
        onAddCriteriaClick={handleAddCriteria}
      />

      {/* <StoryModal show={modalVisible} onClose={handleDismiss}></StoryModal> */}
    </>
  );
};

export default StoryRefinerMain;
