import React from "react";
import "./Dropdown.css";
const Dropdown = ({ values, setSearchFunction, setQuery }) => {
  const handleSelect = (e) => {
    setSearchFunction(e.target.value);
    setQuery(null);
  };
  return (
    <div className="Dropdown">
      <select
        className="DropdownSelect"
        onChange={(e) => {
          handleSelect(e);
        }}
      >
        {values.map((search, index) => {
          return (
            <option
              value={search.value}
              key={index}
              {...(index === 0 ? "selected" : "")}
            >
              {search.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
