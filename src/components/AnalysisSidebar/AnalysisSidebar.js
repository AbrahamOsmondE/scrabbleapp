// Use react useEffect and useState isPending to create a loading
// message while the algorithm is calculating for the best
// move
import React from "react";
import "./AnalysisSidebar.css";

const AnalysisSidebar = ({ board, rack }) => {
  return (
    <div className={"AnalysisSidebar"}>
      <div className={"sidebarhead"}></div>
      <div className={"AnalysisResults"}>
        {board.map((row, i) => (
          <div key={i}>
            {row.map((col, j) => (
              <span key={j}>{col}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisSidebar;
