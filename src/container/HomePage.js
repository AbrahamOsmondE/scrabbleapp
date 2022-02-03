import { isMobile } from "react-device-detect";
import "../App.css";
import Header from "../components/Header/Header";

function HomePage() {
  return !isMobile ? (
    <div className="body">
      <Header />
      <h1>Home Page</h1>
    </div>
  ) : (
    <div className="body">
      <div className="mobileOnly">Please use the desktop version!</div>
    </div>
  );
}

export default HomePage;
