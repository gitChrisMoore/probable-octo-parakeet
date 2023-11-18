import React, { useEffect, useState } from "react";
import StoryButton, { ButtonVariant } from "./StoryButton";
import useAcceptanceCriteria from "../Hooks/useAcceptanceCriteria";
import StoryModal from "./StoryModal";

export interface AcceptanceCriteria {
  id: string;
  description: string;
  checked: boolean;
}

interface AcceptanceCriteriaListProps {
  story: string;
  visible: boolean;
  onClose: () => void;
  onAddCriteriaClick: () => void;
  criteria: AcceptanceCriteria[];
  setCriteria: React.Dispatch<React.SetStateAction<AcceptanceCriteria[]>>;
}

const AcceptenceCriteriaSelectModal: React.FC<AcceptanceCriteriaListProps> = ({
  story,
  visible,
  onClose,
  onAddCriteriaClick,
  criteria,
  setCriteria,
}) => {
  const acceptanceCriteria = useAcceptanceCriteria(
    "api/story/data-acceptance-criteria"
  );
  const [loading, setLoading] = useState(true);

  const handleCheckboxChange = (criteriaId: string) => {
    setCriteria((prevCriteria) =>
      prevCriteria.map((criterion) =>
        criterion.id === criteriaId
          ? { ...criterion, checked: !criterion.checked }
          : criterion
      )
    );
  };

  const handleFetchCriteria = async () => {
    setLoading(true);
    try {
      const fetchedCriteria = await acceptanceCriteria.fetchCriteria(story);
      setCriteria(fetchedCriteria);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      handleFetchCriteria();
    }
  }, [visible]);

  return (
    <div>
      <StoryModal show={visible} onClose={onClose}>
        <div>
          {loading ? (
            <>
              <div>Generating some suggestions...</div>
              <div className="animated-background mb-2"></div>
              <div className="animated-background mb-2"></div>
              <div className="animated-background mb-2"></div>
            </>
          ) : (
            <>
              <div className="mb-4 text-sm">
                Here are some acceptance criteria you should consider adding:
              </div>
              {criteria &&
                criteria.map((criterion) => (
                  <div
                    key={criterion.id}
                    className="flex items-center h-14 border-b border-gray-200 cursor-pointer justify-between"
                    onClick={() => handleCheckboxChange(criterion.id)}
                  >
                    <span className="ml-2 text-sm">
                      {criterion.description}
                    </span>
                    <input
                      type="checkbox"
                      checked={criterion.checked}
                      readOnly
                      className="mr-4"
                    />
                  </div>
                ))}
              <div className="flex justify-between mt-4">
                <StoryButton
                  variant={ButtonVariant.Text}
                  type="submit"
                  onClick={onClose}
                >
                  Close
                </StoryButton>

                <StoryButton
                  variant={ButtonVariant.Filled}
                  type="submit"
                  onClick={onAddCriteriaClick}
                >
                  Update
                </StoryButton>
              </div>
            </>
          )}
        </div>
      </StoryModal>
    </div>
  );
};

export default AcceptenceCriteriaSelectModal;
