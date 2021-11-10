import "./Analysis.css";
import Board from "../Board/Board";
import Rack from "../Rack";
import { useState } from "react";
import AnalysisSidebar from "../AnalysisSidebar/AnalysisSidebar";
function Analysis() {
  const matrix = [];
  for (let i = 0; i < 15; i++) {
    const row = [];
    for (let j = 0; j < 15; j++) {
      row.push("");
    }
    matrix.push(row);
  }
  const [board, setBoard] = useState(matrix);
  const [rack, setRack] = useState(["", "", "", "", "", "", ""]);

  const handleBoardChange = (event, row, col) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z]/gi, "");
    let copy = [...board];
    copy[row][col] = value;
    setBoard(copy);
  };

  const handleRackChange = (event, tileNum) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z _]/gi, "");
    let copy = [...rack];
    copy[tileNum] = value;
    setRack(copy);
  };

  return (
    <div className="analysis-section">
      <Board board={board} handleBoardChange={handleBoardChange} />
      <AnalysisSidebar board={board} rack={rack} />
      <Rack rack={rack} handleRackChange={handleRackChange} />
    </div>
  );
}

export default Analysis;
