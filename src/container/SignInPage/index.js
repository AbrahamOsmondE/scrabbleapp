import React, { useState } from "react";
import Header from "../../components/Header";
import "./index.css";

export default function SignInPage(props) {
  const [username, setUsername] = useState("Jayson Was Here!");
  const [password, setPassword] = useState("");

  return (
    <React.Fragment>
      <Header />
      <div className="root">
        <h1>Please, Sign In!</h1>
        <h4 className="header-input">Username: {username}</h4>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          style={styles.textInput}
        />
        <h4 className="header-input">Password</h4>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.textInput}
        />
        <button
          className="submit-button"
          style={styles.button}
          onClick={() => {
            setPassword("");
            setUsername("");
          }}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
}

const styles = {
  textInput: {
    minWidth: 240,
    padding: 5,
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    transition: "ease-out 0.2s",
    border: "none",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "gray",
  },
};
