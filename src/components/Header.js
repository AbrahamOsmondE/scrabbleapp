import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  return (
    <header className="header">
      <div className="nav-bar">
        <h1 className="site-title">
          <Link to="/">Scrabble App</Link>
        </h1>
        <nav>
          <section>
            <Link to="/AnalysisPage">
              <span>Analysis</span>
            </Link>
          </section>
        </nav>
      </div>
      <div className="nav-bar">
        <Link to="/Login">
          <span className="navbar-button">Sign In</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
