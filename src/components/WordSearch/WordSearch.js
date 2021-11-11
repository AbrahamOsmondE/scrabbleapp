import axios from "axios";
import React, { useEffect, useState } from "react";
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

  const handleChange = (event, tileNum) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z*]/gi, "");
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
      const fetchWords = async () => {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/${searchFunction}/${query}`
        );
        setWords(data);
      };
      fetchWords();
      setTimeout(1000);
      console.log(words);
    }
  }, [query]);

  return (
    <div className="WordSearchContainer">
      <div className="WordSearchApps">
        <Dropdown
          values={dropdownValues}
          setSearchFunction={setSearchFunction}
        />
        {searchDescription?.[searchFunction]}
      </div>
      <div className="WordSearch">
        {query ? (
          <h1>{`${queryResponse} ${query}`}</h1>
        ) : (
          <h1>Enter some Letters</h1>
        )}
        Wild card is *, currently only supports 1 wild card
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
            .reverse()
            .map((key, index) => {
              return (
                <div key={index}>
                  <WordList length={key} words={words?.[key]}></WordList>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
