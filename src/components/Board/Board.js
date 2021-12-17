import React, { useRef, useState } from "react";
import "./Board.css";
import { DW, TW, DL, TL } from "./constant";
const Board = ({ board, handleBoardChange }) => {
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
