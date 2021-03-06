import React, { useRef } from "react";
import "./StaticRack.css";
const StaticRack = ({ rack }) => {
  let rows = [];
  for (var i = 0; i < 7; i++) {
    let tileID = `tile${i}`;
    let tileNum = parseInt(`${i}`);
    rows.push(
      <div key={tileID} className={rack[tileNum] ? "TileRack" : "NormalRack"}>
        <input
          id={tileID}
          type="text"
          maxLength="1"
          value={rack[tileNum]}
        ></input>
      </div>
    );
  }
  return <div className="StaticRack">{rows}</div>;
};
export default StaticRack;
