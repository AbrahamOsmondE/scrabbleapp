import "./Analysis.css";
import Board from "../Board/Board";
import Rack from "../Rack/Rack";
import { useRef, useState } from "react";
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
  const [previousBoard, setPreviousBoard] = useState(matrix);
  const [previousRack, setPreviousRack] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [rack, setRack] = useState(["", "", "", "", "", "", ""]);
  const [solutions, setSolutions] = useState([]);

  const rackRef = useRef(null);
  const handleBoardChange = (event, row, col) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z]/gi, "");
    let copy = [...board];
    copy[row][col] = value;
    setBoard(copy);
    setSolutions([]);
  };

  const handleRackChange = (event, tileNum) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z]/gi, "");
    let copy = [...rack];
    copy[tileNum] = value;
    setRack(copy);
    setSolutions([]);
  };

  const handleEmptyRack = () =>
    rackRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="analysis-section">
      <div className="board-section">
        <Board board={board} handleBoardChange={handleBoardChange} />
        <Rack
          rackRef={rackRef}
          rack={rack}
          handleRackChange={handleRackChange}
        />
      </div>
      <div>
        <AnalysisSidebar
          setPreviousBoard={setPreviousBoard}
          setPreviousRack={setPreviousRack}
          setBoard={setBoard}
          setRack={setRack}
          previousBoard={previousBoard}
          previousRack={previousRack}
          board={board}
          rack={rack}
          solutions={solutions}
          setSolutions={setSolutions}
          handleEmptyRack={handleEmptyRack}
        />
      </div>
    </div>
  );
}

export default Analysis;
