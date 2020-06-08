import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { SignUpPage } from "./components/SignUpPage";
import { LoginPage } from "./components/LoginPage";
import { ArticlePage } from "./components/ArticlePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/article" component={ArticlePage} />
      </Switch>
    </div>
  );
}

export default App;
