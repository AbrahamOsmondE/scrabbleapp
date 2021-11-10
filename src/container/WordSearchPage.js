import React from "react";
import "../App.css";
import Header from "../components/Header/Header";
import WordSearch from "../components/WordSearch";

const WordSearchPage = ({ match }) => {
  return (
    <div className="body">
      <Header />
      <WordSearch match={match} />
    </div>
  );
};

export default WordSearchPage;
