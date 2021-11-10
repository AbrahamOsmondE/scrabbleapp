import React, { useRef } from "react";
import "./Rack.css";
const Rack = ({ rack, handleRackChange }) => {
  const refs = useRef([]);
  const changeFocus = (num) => {
    refs.current[num].focus();
  };
  const onKeyDown = (event, num) => {
    if (event.keyCode === 39 && num !== 6) {
      changeFocus(num + 1);
    } else if (event.keyCode === 37 && num !== 0) {
      changeFocus(num - 1);
    }
  };
  const moveTile = (event, num) => {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z _]/gi, "");
    if (value !== "" && num !== 6) {
      changeFocus(num + 1);
    }
  };
  const onKeyUp = (event, num) => {
    if ((event.keyCode === 8) & (num !== 0)) {
      changeFocus(num - 1);
    }
  };
  let rows = [];
  for (var i = 0; i < 7; i++) {
    let tileID = `tile${i}`;
    let tileNum = parseInt(`${i}`);
    rows.push(
      <div key={tileID} className={rack[tileNum] ? "tileRack" : "normalRack"}>
        <input
          ref={(element) => {
            refs.current[tileNum] = element;
          }}
          id={tileID}
          type="text"
          maxLength="1"
          value={rack[tileNum]}
          onChange={(e) => {
            handleRackChange(e, tileNum);
            moveTile(e, tileNum);
          }}
          onKeyDown={(e) => {
            onKeyDown(e, tileNum);
          }}
          onKeyUp={(e) => {
            onKeyUp(e, tileNum);
          }}
        ></input>
      </div>
    );
  }
  return <div className="rack">{rows}</div>;
};
export default Rack;
