import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./container/HomePage";
import AnalysisPage from "./container/AnalysisPage";
import SignInPage from "./container/SignInPage";

import "./index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/AnalysisPage" component={AnalysisPage} />
      <Route path="/Login" component={SignInPage} />
    </Switch>
  </BrowserRouter>,
  rootElement
);
