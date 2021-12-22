// Use react useEffect and useState isPending to create a loading
// message while the algorithm is calculating for the best
// move
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AnalysisSidebar.css";

const AnalysisSidebar = ({
  board,
  rack,
  setPreviousBoard,
  setPreviousRack,
  setBoard,
  setRack,
  previousBoard,
  previousRack,
}) => {
  const [solutions, setSolutions] = useState([]);
  const [active, setActive] = useState(null);

  const solveBoard = async () => {
    setPreviousBoard(board);
    setPreviousRack(rack);
    let boardString = "";
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] !== "") {
          boardString += `${i}-${j}=${board[i][j].toUpperCase()}&`;
        }
      }
    }
    boardString = boardString.substring(0, boardString.length - 1);

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/solve/${rack
        .map((i) => i.toUpperCase())
        .join("")}/?${boardString}`
    );
    setSolutions(data);

    return;
  };

  const handleResetSearch = () => {
    setBoard(previousBoard);
    setRack(previousRack);
    setSolutions([]);
    setActive(null);
  };

  const handleRackBoardChange = (index) => {
    let temporaryBoard = [];
    for (let row = 0; row < 15; row++) {
      let temporaryRow = [...previousBoard[row]];
      temporaryBoard.push(temporaryRow);
    }
    let temporaryRack = [...previousRack];
    let wordIndex = 0;

    if (solutions[index]?.direction === "across") {
      let nonMovingIndex = solutions[index]?.start[0];
      for (
        let i = solutions[index]?.start[1];
        i <= solutions[index]?.end[1];
        i++
      ) {
        if (temporaryBoard[nonMovingIndex][i] === "") {
          temporaryRack.splice(
            temporaryRack.indexOf(solutions[index]?.word[wordIndex], 1)
          );
          temporaryBoard[nonMovingIndex][i] = solutions[index]?.word[wordIndex];
        }
        wordIndex++;
      }
    } else {
      let nonMovingIndex = solutions[index]?.start[1];
      for (
        let j = solutions[index]?.start[0];
        j <= solutions[index]?.end[0];
        j++
      ) {
        if (temporaryBoard[j][nonMovingIndex] === "") {
          temporaryRack.splice(
            temporaryRack.indexOf(solutions[index]?.word[wordIndex], 1)
          );
          temporaryBoard[j][nonMovingIndex] = solutions[index]?.word[wordIndex];
        }
        wordIndex++;
      }
    }

    while (temporaryRack.length < 7) {
      temporaryRack.push("");
    }
    setRack(temporaryRack);
    setBoard(temporaryBoard);
  };

  useEffect(() => {
    handleRackBoardChange(0);
  }, [solutions]);

  // console.log(solutions);
  console.log(previousBoard, "tempoBoard");
  console.log(previousRack, "tempoRack");
  console.log(rack, "rack");
  console.log(board, "board");
  return (
    <div>
      <div className={"AnalysisSidebar"}>
        <div className={"sidebarhead"}></div>
        <div className={"AnalysisResults"}>
          {solutions.length !== 0 && <h3>Showing top 50 results</h3>}
          {solutions?.map((result, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setActive(index);
                  handleRackBoardChange(index);
                }}
              >
                <div>{result?.word}</div>
                <div>Points : {result?.points} </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <button onClick={solveBoard}>solve</button>
        <button onClick={handleResetSearch}>undo search</button>
      </div>
    </div>
  );
};

export default AnalysisSidebar;
