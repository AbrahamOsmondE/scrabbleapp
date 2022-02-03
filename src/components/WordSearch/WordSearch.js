import axios from "axios";
import React, { useEffect, useState } from "react";
import DefinitionBlock from "../DefinitionBlock/DefinitionBlock";
import Dropdown from "../Dropdown/Dropdown";
import WordList from "../WordList/WordList";
import {
  dropdownValues,
  searchDescription,
  maxLengths,
  queryResponses,
} from "./constant";
import "./WordSearch.css";

const WordSearch = () => {
  const [words, setWords] = useState({});
  const [query, setQuery] = useState(null);
  const [queryResponse, setQueryResponse] = useState("Words made using");
  const [input, setInput] = useState(null);
  const [searchFunction, setSearchFunction] = useState("wordbuilder");
  const [definition, setDefinition] = useState(null);
  const [definitionQuery, setDefinitionQuery] = useState(null);

  const fetchWords = async () => {
    const { data } = await axios.get(
      `http://liscrabble.com/api/${searchFunction}/${query}`
    );
    setWords(data);
  };

  const fetchDefinition = async () => {
    const { data } = await axios.get(
      `http://liscrabble.com/api/definition/${definitionQuery}`
    );
    setDefinition(data);
  };

  const handleChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z]/gi, ""); ///[^A-Za-z*]/
    if (value.split("*").length - 1 > 1) {
      return;
    }
    setInput(value);
  };

  const handleClick = () => {
    if (searchFunction === "wordbuilder" && input?.length > 10) {
      return;
    }
    setQueryResponse(queryResponses?.[searchFunction]);
    setQuery(input.toUpperCase());
  };

  useEffect(() => {
    if (query) {
      fetchWords();
    }
  }, [query]);

  useEffect(() => {
    if (definitionQuery) {
      fetchDefinition(definitionQuery);
    }
  }, [definitionQuery]);

  return (
    <div className="WordSearchContainer">
      <div className="WordSearchApps">
        <Dropdown
          values={dropdownValues}
          setSearchFunction={setSearchFunction}
          setQuery={setQuery}
        />
        <div>{searchDescription?.[searchFunction]}</div>
        <DefinitionBlock
          definition={definition}
          definitionQuery={definitionQuery}
        />
      </div>
      <div className="WordSearch">
        {query ? (
          <h1>{`${queryResponse} ${query}`}</h1>
        ) : (
          <h1>Enter some characters</h1>
        )}
        {/* Wild card is *, currently only supports 1 wild card */}
        <div className="WordSearchInputs">
          <input
            className="WordSearchInput"
            maxLength={maxLengths?.[searchFunction]}
            value={input}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className="WordSearchButton" onClick={handleClick}>
            <span>Find Words</span>
          </div>
        </div>
        <div className="WordLists">
          {Object.keys(words)
            .sort((a, b) => {
              return parseInt(a) - parseInt(b);
            })
            .reverse()
            .map((length, index) => {
              return (
                <div key={index}>
                  <WordList
                    length={length}
                    words={words?.[length]}
                    setDefinitionQuery={setDefinitionQuery}
                  ></WordList>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
