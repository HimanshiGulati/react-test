import agent from "../agent";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/HomePage";
import Login from "./components/LoginPage";
import Register from "./components/SignUpPage";

class App extends React.Component {

  componentWillMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      );
    }
    return (
      <div>
        Hello World
      </div>
    );
  }
}

export default App;
