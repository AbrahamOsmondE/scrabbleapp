import React from "react";
import "./WordList.css";
const WordList = ({ length, words }) => {
  return (
    <div className="WordList">
      <div className="WordListHead">{`${length} Letter Word${
        words?.length > 1 ? `s` : ""
      }`}</div>
      <div className="WordListBody">
        {words?.map((word, index) => {
          return <div className="Word">{word}</div>;
        })}
      </div>
    </div>
  );
};

export default WordList;
