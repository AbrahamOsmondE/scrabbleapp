import React from "react";
import { isMobile } from "react-device-detect";
import "../App.css";
import Header from "../components/Header/Header";
import WordSearch from "../components/WordSearch/WordSearch";

const WordSearchPage = () => {
  return !isMobile ? (
    <div className="body">
      <Header />
      <WordSearch />
    </div>
  ) : (
    <div className="body">
      <div className="mobileOnly">Please use the desktop version!</div>
    </div>
  );
};

export default WordSearchPage;
