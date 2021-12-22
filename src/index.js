import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./container/HomePage";
import AnalysisPage from "./container/AnalysisPage";
import WordSearchPage from "./container/WordSearchPage";
import PuzzlePage from "./container/PuzzlePage";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/AnalysisPage" component={AnalysisPage} />
      <Route exact path="/WordSearchPage/" component={WordSearchPage} />
      <Route exact path="/PuzzlePage/" component={PuzzlePage} />
    </Switch>
  </BrowserRouter>,
  rootElement
);
