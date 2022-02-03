import "../App.css";
import Header from "../components/Header/Header";
import Analysis from "../components/Analysis/Analysis";
import { isMobile } from "react-device-detect";

function AnalysisPage() {
  return !isMobile ? (
    <div className="body">
      <Header />
      <Analysis />
    </div>
  ) : (
    <div className="body">
      <div className="mobileOnly">Please use the desktop version!</div>
    </div>
  );
}

export default AnalysisPage;
