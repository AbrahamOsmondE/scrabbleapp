import React from "react";
import "./PuzzleTile.css";
const PuzzleTile = ({ word, key, isFound }) => {
  const wordLetters = word.split("");
  const renderFoundWord = () => {
    return wordLetters.map((letter, index) => {
      return (
        <div key={index} className="PuzzleTileLetter">
          {letter}
        </div>
      );
    });
  };

  const renderNotFoundWord = () => {
    return wordLetters.map((letter, index) => {
      return <div key={index} className="PuzzleTileEmpty"></div>;
    });
  };

  return (
    <div key={key} className="PuzzleTiles">
      {isFound ? renderFoundWord() : renderNotFoundWord()}
    </div>
  );
};

export default PuzzleTile;
