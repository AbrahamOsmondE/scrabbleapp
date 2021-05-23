import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

import HomePage from "./container/HomePage";
import AnalysisPage from "./container/AnalysisPage";

 const rootElement = document.getElementById("root");
 ReactDOM.render(
   <HashRouter>
    <Switch>
     <Route exact path="/" component={HomePage} />
     <Route path="/AnalysisPage" component={AnalysisPage} />
   </Switch>
   </HashRouter>,
   rootElement
 );
