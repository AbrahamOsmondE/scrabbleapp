import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header className="header">
      <div className="nav-bar">
        <h1 className="site-title">
          <Link to="/"> Scrabble App</Link>
        </h1>
        <nav className="links">
          <section>
            <Link to="/AnalysisPage">
              <span>Analysis</span>
            </Link>
          </section>
          <section>
            <Link to="/WordSearchPage">
              <span>Word Search</span>
            </Link>
          </section>
        </nav>
      </div>
      <div className="nav-bar">
        <a href="/Login" className="navbar-button">
          Sign In
        </a>
      </div>
    </header>
  );
};
export default Header;
