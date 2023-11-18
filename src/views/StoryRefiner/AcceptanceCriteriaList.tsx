import React, { useState } from "react";
import { AcceptanceCriteria } from "./AcceptenceCriteriaSelectModal";
import IconDelete from "../Shared/IconDelete";

interface AcceptanceCriteriaListProps {
  criteria: AcceptanceCriteria[];
  setCriteria: React.Dispatch<React.SetStateAction<AcceptanceCriteria[]>>;
}

const AcceptanceCriteriaList: React.FC<AcceptanceCriteriaListProps> = ({
  criteria,
  setCriteria,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const handleItemClick = (criteriaId: string, description: string) => {
    setEditingId(criteriaId);
    setEditingText(description);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(event.target.value);
  };

  const handleInputBlur = () => {
    setCriteria((prevCriteria) =>
      prevCriteria.map((criterion) =>
        criterion.id === editingId
          ? { ...criterion, description: editingText }
          : criterion
      )
    );
    setEditingId(null);
  };
  const handleDeleteClick = (criteriaId: string) => {
    setCriteria((prevCriteria) =>
      prevCriteria.filter((criterion) => criterion.id !== criteriaId)
    );
  };

  if (criteria.length === 0) {
    return null;
  }

  return (
    <>
      {criteria.map((criterion, index) => (
        <div
          key={criterion.id}
          className={`flex items-center h-14 cursor-pointer justify-between ${
            criteria.length !== 0 && index !== criteria.length - 1
              ? "border-b border-gray-200"
              : ""
          }`}
          onClick={() => handleItemClick(criterion.id, criterion.description)}
        >
          {criterion.id === editingId ? (
            <input
              type="text"
              value={editingText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus
              className="ml-2 text-sm"
            />
          ) : (
            <span className="ml-2 text-sm">{criterion.description}</span>
          )}
          <button onClick={() => handleDeleteClick(criterion.id)}>
            <IconDelete />
          </button>
        </div>
      ))}
    </>
  );
};

export default AcceptanceCriteriaList;
