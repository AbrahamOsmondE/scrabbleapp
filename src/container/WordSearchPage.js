import React from "react";
import "../App.css";
import Header from "../components/Header/Header";
import WordSearch from "../components/WordSearch/WordSearch";

const WordSearchPage = () => {
  return (
    <div className="body">
      <Header />
      <WordSearch />
    </div>
  );
};

export default WordSearchPage;
