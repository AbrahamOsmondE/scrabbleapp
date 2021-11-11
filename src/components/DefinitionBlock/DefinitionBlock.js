import React from "react";
import { partOfSpeeches } from "./constant";
import "./DefinitionBlock.css";

const DefinitionBlock = ({ definition, definitionQuery }) => {
  return (
    <div className="DefinitionBlock">
      <div className="DefinitionBlockHead">
        Definition {definitionQuery && `of ${definitionQuery}`}
      </div>
      <div className="DefinitionBlockBody">
        {definition && (
          <>
            {/* <span>{`Part of Speech: ${
              partOfSpeeches?.[definition?.partOfSpeech]
            }`}</span>
            <br />
            <br />
            <span>{"Definition: "}</span>
            <br /> */}
            <span>{`${definition?.definition}`}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DefinitionBlock;
