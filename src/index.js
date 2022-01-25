import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./container/HomePage";
import AnalysisPage from "./container/AnalysisPage";
import WordSearchPage from "./container/WordSearchPage";
import PuzzlePage from "./container/PuzzlePage";
import ProfilePage from "./container/ProfilePage";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AnalysisPage} />
      <Route path="/AnalysisPage" component={AnalysisPage} />
      <Route exact path="/WordSearchPage/" component={WordSearchPage} />
      <Route exact path="/PuzzlePage/" component={PuzzlePage} />
      <Route exact path="/Profile/" component={ProfilePage} />
    </Switch>
  </BrowserRouter>,
  rootElement
);
