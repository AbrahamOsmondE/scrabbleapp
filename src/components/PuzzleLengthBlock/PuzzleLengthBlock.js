import React from "react";
import PuzzleTile from "../PuzzleTile/PuzzleTile";
import "./PuzzleLengthBlock.css";
const PuzzleLengthBlock = ({ puzzle, index, length, puzzlePlaceholder }) => {
  return (
    <div key={index} className="PuzzleLengthBlock">
      <div className="PuzzleLengthText">{length} Letter Words</div>
      <div>
        {puzzle.solutions[length].map((word, key) => {
          return (
            <PuzzleTile
              word={word}
              key={key}
              isFound={puzzlePlaceholder?.[length]?.[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleLengthBlock;
