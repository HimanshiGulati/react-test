import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import Login from "./components/LoginPage";
import Register from "./components/SignUpPage";
import UserService from "./helpers/config";
import PortalHeader from "./components/PortalHeader";
import MyFavorites from "./components/MyFavorites";
import Profile from "./components/Profile";
import ProfileSettings from "./components/ProfileSettings";
import Editor from "./components/Editor";
import Article from "./components/ArticlePage";

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
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={ProfileSettings} />
            <Route path="/@:username/favorites" component={MyFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </div>
      );
    }
    return (
      <div>
        <PortalHeader
          appName={this.props.appName}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

export default App;
