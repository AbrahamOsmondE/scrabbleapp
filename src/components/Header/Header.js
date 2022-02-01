import axios from "axios";
import React, { useCallback, useState } from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const [tokenId, setTokenId] = useState(
    localStorage.getItem("tokenId")
      ? JSON.parse(localStorage.getItem("tokenId"))
      : null
  );

  const validateTokenAndObtainSession = ({ data, idToken }) => {
    const headers = {
      Authorization: idToken,
      "Content-Type": "application/json",
    };
    return axios.post("http://liscrabble.com/users/login", data, { headers });
  };

  const onGoogleLoginSuccess = useCallback((response) => {
    const idToken = response.tokenId;
    const data = {
      email: response.profileObj.email,
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      google_id: response.profileObj.googleId,
    };
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
    localStorage.setItem(
      "tokenId",
      JSON.stringify(response.profileObj.googleId)
    );

    validateTokenAndObtainSession({ data, idToken }).then((res) => {
      console.log(res);
    });
  }, []);

  const onGoogleLogoutSuccess = () => {
    localStorage.removeItem("loginData");
    localStorage.removeItem("tokenId");
    setLoginData(null);
    setTokenId(null);
  };

  const onGoogleLoginFailure = useCallback((response) => {
    console.log("Failure");
  }, []);

  return (
    <header className="header">
      <div className="nav-bar">
        <h1 className="site-title">
          <Link to="/"> Liscrabble</Link>
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
          <section>
            <Link to="/PuzzlePage">
              <span>Puzzle</span>
            </Link>
          </section>
        </nav>
      </div>
      <div className="nav-bar-login">
        {!loginData ? (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // your Google app client ID
            buttonText="Sign in"
            onSuccess={onGoogleLoginSuccess} // perform your user logic here
            onFailure={onGoogleLoginFailure} // handle errors here
            isSignedIn={true}
          />
        ) : (
          <div className="logout">
            <section>
              <Link to="/Profile">
                <span>{loginData.first_name}</span>
              </Link>
            </section>
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={onGoogleLogoutSuccess}
            ></GoogleLogout>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
