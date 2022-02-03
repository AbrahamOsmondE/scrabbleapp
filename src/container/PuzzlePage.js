import React from "react";
import { isMobile } from "react-device-detect";
import Header from "../components/Header/Header";
import PuzzleSection from "../components/PuzzleSection/PuzzleSection";

const PuzzlePage = () => {
  return !isMobile ? (
    <div className="body">
      <Header />
      <PuzzleSection />
    </div>
  ) : (
    <div className="body">
      <div className="mobileOnly">Please use the desktop version!</div>
    </div>
  );
};

export default PuzzlePage;
