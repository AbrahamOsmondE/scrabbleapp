import React from "react";

const WordList = ({ length, words }) => {
  return (
    <div>
      <div>{`${length} Letter Word${words.length > 1 ? `s` : ""}`}</div>
      <div>
        {words?.map((word, index) => {
          return <div>{word}</div>;
        })}
      </div>
    </div>
  );
};

export default WordList;
