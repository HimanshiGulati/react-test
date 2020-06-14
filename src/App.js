import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import Login from "./components/LoginPage";
import Register from "./components/SignUpPage";
import UserService from "./helpers/config";

class App extends React.Component {

  componentWillMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      UserService.setToken(token);
    }

    this.props.onLoad(token ? UserService.currentUser() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Switch>
            <Route exact path="/" component={HomePage} />
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
