import React, { useState } from "react";
import StoryButton, { ButtonVariant } from "./StoryButton";

interface StoryInputProps {
  story: string;
  setStory: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (story: string) => void;
}

const StoryInput: React.FC<StoryInputProps> = ({
  story,
  setStory,
  onSubmit,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(story);
  };

  const handleClear = () => {
    setStory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="border border-gray-400 p-2 rounded-md w-full focus:bg-white bg-slate-100"
        placeholder="Enter your story here"
        value={story}
        rows={5}
        onChange={(event) => setStory(event.target.value)}
      />
      <div className="flex justify-between mt-2">
        <StoryButton variant={ButtonVariant.Filled} type="submit">
          Analyze
        </StoryButton>
        <StoryButton
          variant={ButtonVariant.Text}
          type="button"
          onClick={handleClear}
        >
          Clear Story
        </StoryButton>
      </div>
    </form>
  );
};

export default StoryInput;
