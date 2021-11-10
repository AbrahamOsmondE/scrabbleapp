import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import WordList from "./WordList";
import tempword from "./temp";
const WordSearch = ({ match }) => {
  const [words, setWords] = useState({});
  const [query, setQuery] = useState(null);
  const [input, setInput] = useState("");
  const history = useHistory();

  const handleChange = (event, tileNum) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z_]/gi, "");
    setInput(value);
  };

  const handleClick = () => {
    setQuery(input);
  };

  useEffect(() => {
    if (match?.params?.word) {
      setQuery(match.params.word.toUpperCase());
      const fetchWords = async () => {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/api/words/${match?.params?.word}`
        );
        setWords(data);
      };
      fetchWords();
    }
  }, [query]);

  return (
    <div>
      {query ? <h1>{`Words with ${query}`}</h1> : <h1>Enter a Word</h1>}
      <div>
        <input
          maxLength="10"
          value={input}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <Link to={`/WordSearchPage/${input}`} onClick={handleClick}>
          <span>Find Words</span>
        </Link>
      </div>
      <div>
        {Object.keys(tempword).map((key, index) => {
          return (
            <div key={index}>
              <WordList length={key} words={tempword[key]}></WordList>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordSearch;
