import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import StaticRack from "../components/StaticRack/StaticRack";

const PuzzlePage = () => {
  const [puzzle, setPuzzle] = useState({ solutions: {} });
  const [rack, setRack] = useState(["", "", "", "", "", "", ""]);
  const [puzzlePlaceholder, setPuzzlePlaceholder] = useState({});
  const [errors, setErrors] = useState(0);

  const getRandomWord = async () => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/puzzle`);

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
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  return (
    <div className="body">
      <Header />

      <StaticRack rack={rack} />
      {Object.keys(puzzle.solutions)
        .sort((a, b) => {
          return parseInt(a) - parseInt(b);
        })
        .reverse()
        .map((length, index) => {
          return <div key={index}>{length}</div>;
        })}
    </div>
  );
};

export default PuzzlePage;
