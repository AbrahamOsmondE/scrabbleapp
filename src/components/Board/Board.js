/* eslint-disable no-loop-func */
//create sidebar
//figure out how to store words, DAWG
//formulate the algorithm
import React, { useRef, useState } from "react";
import "./Board.css";

const Board = ({ board, handleBoardChange }) => {
  const TW = [
    "cell0-0",
    "cell0-7",
    "cell0-14",
    "cell14-14",
    "cell7-0",
    "cell14-7",
    "cell14-0",
    "cell7-14",
  ];
  const DW = [
    "cell1-1",
    "cell2-2",
    "cell3-3",
    "cell4-4",
    "cell1-13",
    "cell2-12",
    "cell3-11",
    "cell4-10",
    "cell13-1",
    "cell12-2",
    "cell11-3",
    "cell10-4",
    "cell13-13",
    "cell12-12",
    "cell11-11",
    "cell10-10",
  ];
  const TL = [
    "cell1-5",
    "cell1-9",
    "cell5-1",
    "cell5-5",
    "cell5-9",
    "cell5-13",
    "cell9-1",
    "cell9-5",
    "cell9-9",
    "cell9-13",
    "cell13-5",
    "cell13-9",
  ];
  const DL = [
    "cell3-0",
    "cell3-14",
    "cell11-0",
    "cell11-14",
    "cell0-3",
    "cell0-11",
    "cell7-3",
    "cell7-11",
    "cell14-3",
    "cell14-11",
    "cell2-6",
    "cell2-8",
    "cell6-2",
    "cell8-2",
    "cell6-6",
    "cell6-8",
    "cell8-6",
    "cell8-8",
    "cell12-6",
    "cell12-8",
    "cell6-12",
    "cell8-12",
    "cell11-7",
    "cell3-7",
  ];

  const refs = useRef([]);
  const [direction, setDirection] = useState([0, 1]); //direction[0] means moves down the row, direction[1] means column
  const changeFocus = (row, col) => {
    refs.current[row * 15 + col].focus();
  };
  const onKeyDown = (event, row, col) => {
    if (event.keyCode === 40) {
      if (direction[1]) {
        setDirection([1, 0]);
      } else if (row !== 14) {
        changeFocus(row + 1, col);
      }
    } else if (event.keyCode === 39) {
      if (direction[0]) {
        setDirection([0, 1]);
      } else if (col !== 14) {
        changeFocus(row, col + 1);
      }
    } else if (event.keyCode === 38) {
      if (row !== 0) {
        changeFocus(row - 1, col);
      }
    } else if (event.keyCode === 37) {
      if (col !== 0) {
        changeFocus(row, col - 1);
      }
    }
  };
  const moveTile = (event, row, col) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z]/gi, "");
    if (value !== "" && direction[0]) {
      changeFocus(row + 1, col);
    } else if ((value !== "") & direction[1]) {
      changeFocus(row, col + 1);
    }
  };
  const onKeyUp = (event, row, col) => {
    if ((event.keyCode === 8) & direction[0] && row !== 0) {
      changeFocus(row - 1, col);
    } else if ((event.keyCode === 8) & direction[1] && col !== 0) {
      changeFocus(row, col - 1);
    }
  };
  let rows = [];
  for (var i = 0; i < 15; i++) {
    let rowID = `row${i}`;
    let cell = [];
    for (var idx = 0; idx < 15; idx++) {
      let cellID = `cell${i}-${idx}`;
      let row = parseInt(`${i}`);
      let col = parseInt(`${idx}`);

      cell.push(
        <td
          key={cellID}
          id={cellID}
          className={direction[0] ? "moveRight" : "moveDown"}
        >
          <div
            className={
              board[row][col] && direction[0]
                ? "tile moveRight"
                : board[row][col] && direction[1]
                ? "tile moveDown"
                : direction[0]
                ? "normalBox moveRight"
                : "normalBox moveDown"
            }
          >
            <input
              ref={(element) => {
                refs.current[row * 15 + col] = element;
              }}
              type="text"
              maxLength="1"
              value={board[row][col]}
              onKeyDown={(e) => onKeyDown(e, row, col)}
              onChange={(e) => {
                handleBoardChange(e, parseInt(row), parseInt(col));
                moveTile(e, row, col);
              }}
              onKeyUp={(e) => onKeyUp(e, row, col)}
              placeholder={
                TW.indexOf(cellID) !== -1
                  ? "TW"
                  : DW.indexOf(cellID) !== -1
                  ? "DW"
                  : TL.indexOf(cellID) !== -1
                  ? "TL"
                  : DL.indexOf(cellID) !== -1
                  ? "DL"
                  : ""
              }
            ></input>
          </div>
        </td>
      );
    }
    rows.push(
      <tr key={i} id={rowID}>
        {cell}
      </tr>
    );
  }

  return (
    <div className="board">
      <table>{rows}</table>
    </div>
  );
};

export default Board;
