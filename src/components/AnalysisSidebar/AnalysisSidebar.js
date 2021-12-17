// Use react useEffect and useState isPending to create a loading
// message while the algorithm is calculating for the best
// move
import axios from "axios";
import React, { useState } from "react";
import "./AnalysisSidebar.css";

const AnalysisSidebar = ({ board, rack }) => {
  const [solutions, setSolutions] = useState([]);
  const solveBoard = async () => {
    let boardString = "";
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] !== "") {
          boardString += `${i}-${j}=${board[i][j].toUpperCase()}&`;
        }
      }
    }
    boardString = boardString.substring(0, boardString.length - 1);

    // console.log(
    //   `http://127.0.0.1:8000/api/solve/${rack
    //     .map((i) => i.toUpperCase())
    //     .join("")}/?${boardString}`
    // );

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/solve/${rack
        .map((i) => i.toUpperCase())
        .join("")}/?${boardString}`
    );
    console.log(data);
    setSolutions(data);
    return;
  };
  return (
    <div>
      <div className={"AnalysisSidebar"}>
        <div className={"sidebarhead"}></div>
        <div className={"AnalysisResults"}>
          {solutions?.map((result, index) => {
            console.log(result);
            return (
              <div key={index}>
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
      </div>
    </div>
  );
};

export default AnalysisSidebar;
