import axios from "axios";
import React, { useEffect, useState } from "react";
import PuzzleLengthBlock from "../PuzzleLengthBlock/PuzzleLengthBlock";
import StaticRack from "../StaticRack/StaticRack";
import "./PuzzleSection.css";

const PuzzleSection = () => {
  const [puzzle, setPuzzle] = useState({ solutions: {} });
  const [rack, setRack] = useState(["", "", "", "", "", "", ""]);
  const [puzzlePlaceholder, setPuzzlePlaceholder] = useState({});
  const [errors, setErrors] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [input, setInput] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const getRandomWord = async () => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/puzzle`);
    setCorrects(0);
    setErrors(0);
    if (!hasSubmitted) {
      submitPuzzleScore().then((res) => {});
    }
    let temporaryPuzzlePlaceholder = {};
    Object.keys(data.solutions).map((length) => {
      temporaryPuzzlePlaceholder[length] = [...data.solutions[length]].map(
        () => 0
      );
    });

    setPuzzlePlaceholder(temporaryPuzzlePlaceholder);

    await setPuzzle(data);
    let temporaryRack = [];
    for (let i = 0; i < 8; i++) {
      temporaryRack.push(data.word[i]);
    }

    setRack(temporaryRack);
    setHasSubmitted(false);
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  const reversedWordLengths = Object.keys(puzzle.solutions)
    .sort((a, b) => {
      return parseInt(a) - parseInt(b);
    })
    .reverse();

  const handleChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z]/gi, "");
    setInput(value);
  };

  const handleSubmit = () => {
    if (!input || input.length < 2 || input.length > 7) {
      setInput("");
      setErrors(errors + 1);
      return;
    }
    const length = input.length;
    const newInput = input.toUpperCase();
    const index = puzzle.solutions[length].indexOf(newInput);
    let newPlaceholder = {};

    reversedWordLengths.map((wordLength) => {
      newPlaceholder[wordLength] = [...puzzlePlaceholder[wordLength]];
    });

    if (index === -1) {
      setErrors(errors + 1);
      setInput("");
      return;
    } else {
      if (!newPlaceholder[length][index]) {
        setCorrects(corrects + 1);
      }
      newPlaceholder[length][index] = 1;
    }

    setPuzzlePlaceholder(newPlaceholder);
    setInput("");
    return;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
    return;
  };

  const handleSurrender = () => {
    let temporaryPuzzlePlaceholder = {};
    Object.keys(puzzle.solutions).map((length) => {
      temporaryPuzzlePlaceholder[length] = [...puzzle.solutions?.[length]].map(
        () => 1
      );
    });

    setPuzzlePlaceholder(temporaryPuzzlePlaceholder);
    if (!hasSubmitted) {
      submitPuzzleScore().then((res) => {});
    }
  };

  const submitPuzzleScore = async () => {
    if (!localStorage.getItem("tokenId")) {
      return;
    }
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      user: localStorage.getItem("tokenId")?.slice(1, -1),
      letters: rack.join(""),
      errors: errors,
      correct_answers: corrects,
      possible_answers: puzzle?.count,
    };
    setHasSubmitted(true);
    return axios.post("http://127.0.0.1:8000/puzzle/submit", data, { headers });
  };
  return (
    <div className="PuzzleSection">
      <div className="PuzzleSectionInfos">
        <StaticRack rack={rack} />
        <div>
          <div className="PuzzleSectionTitle">Solved</div>
          <div className="PuzzleSectionQuantity">
            {corrects}/{puzzle?.count}
          </div>
        </div>
        <div>
          <div className="PuzzleSectionTitle">Errors</div>
          <div className="PuzzleSectionQuantity">{errors}</div>
        </div>
      </div>
      <div className="PuzzleSectionInputs">
        <input
          className="PuzzleSectionInput"
          value={input}
          onChange={(e) => {
            handleChange(e);
          }}
          onKeyPress={(e) => {
            handleKeyPress(e);
          }}
        />
        <div className="PuzzleSectionButton" onClick={handleSubmit}>
          <span>Answer</span>
        </div>
        <div className="PuzzleSectionButton" onClick={handleSurrender}>
          <span>Give up</span>
        </div>
        <div className="PuzzleSectionButton" onClick={getRandomWord}>
          <span>New Puzzle</span>
        </div>
      </div>
      <div className="PuzzlePageSection">
        {reversedWordLengths.map((length, index) => {
          return (
            <PuzzleLengthBlock
              length={length}
              puzzle={puzzle}
              index={index}
              puzzlePlaceholder={puzzlePlaceholder}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleSection;
