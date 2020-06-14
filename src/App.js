import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/LoginPage";
import Register from "./components/SignUpPage";
import UserActions from "./helpers/config";
import PortalHeader from "./components/PortalHeader";
import MyFavorites from "./components/MyFavorites";
import Profile from "./components/Profile";
import ProfileSettings from "./components/ProfileSettings";
import Editor from "./components/Editor";
import Article from "./components/ArticlePage";
import { connect } from "react-redux";
import config from './helpers/config';
import { store } from './helpers/store';
import { push } from "react-router-redux";

import { APP_LOAD, REDIRECT } from "./actions/actionTypes";

class App extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.setToken(token);
    }

    this.props.onLoad(token ? UserActions.currentUser() : null, token);
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
const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
