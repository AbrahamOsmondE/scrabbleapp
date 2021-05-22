import React from 'react';
import '../App.css';
const Header = () => {
    return <header className="header">
        <div className="nav-bar">
            <h1 className="site-title"><a href="/">Scrabble App</a></h1>
            <nav>
                <section>
                    <a href="/AnalysisPage">
                        <span>
                            Analysis
                        </span></a>
                </section>
            </nav>
        </div>
        <div className="nav-bar">
            <a href="/Login" className="navbar-button">Sign In</a>
        </div>
    </header>
}
export default Header;