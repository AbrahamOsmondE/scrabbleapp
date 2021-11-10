import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import WordList from "../WordList/WordList";
import { tempword, styles } from "./constant";
import "./WordSearch.css";

const WordSearch = () => {
  const [words, setWords] = useState({});
  const [query, setQuery] = useState(null);
  const [input, setInput] = useState("");

  const handleChange = (event, tileNum) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z_]/gi, "");
    setInput(value);
  };

  const handleClick = () => {
    setQuery(input.toUpperCase());
  };

  useEffect(() => {
    if (query) {
      const fetchWords = async () => {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/words/${query}`
        );
        setWords(data);
      };
      fetchWords();
      setTimeout(1000);
      console.log(words);
    }
  }, [query]);

  return (
    <div className="WordSearch">
      {query ? <h1>{`Words with ${query}`}</h1> : <h1>Enter a Word</h1>}
      <div className="WordSearchInputs">
        <input
          className="WordSearchInput"
          maxLength="10"
          value={input}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
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
  );
};

export default WordSearch;
