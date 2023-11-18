import React, { useEffect, useState } from "react";
import StoryButton, { ButtonVariant } from "./StoryButton";

interface AcceptanceCriteria {
  id: number;
  description: string;
  checked: boolean;
}

interface AcceptanceCriteriaListProps {
  story: string;
  setStory: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

const AcceptanceCriteriaList: React.FC<AcceptanceCriteriaListProps> = ({
  onClose,
}) => {
  const [criteria, setCriteria] = useState<AcceptanceCriteria[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCheckboxChange = (criteriaId: number) => {
    setCriteria((prevCriteria) =>
      prevCriteria.map((criterion) =>
        criterion.id === criteriaId
          ? { ...criterion, checked: !criterion.checked }
          : criterion
      )
    );
  };

  useEffect(() => {
    // Simulate an API call with a 3 second delay
    setTimeout(() => {
      setCriteria([
        { id: 1, description: "Criteria 1", checked: false },
        { id: 2, description: "Criteria 2", checked: false },
        { id: 3, description: "Criteria 3", checked: false },
        { id: 4, description: "Criteria 4", checked: false },
      ]);
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
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
            {criteria.map((criterion) => (
              <div
                key={criterion.id}
                className="flex items-center h-14 border-b border-gray-200 cursor-pointer justify-between"
                onClick={() => handleCheckboxChange(criterion.id)}
              >
                <span className="ml-2 text-sm">{criterion.description}</span>
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
                onClick={onClose}
              >
                Update
              </StoryButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptanceCriteriaList;
