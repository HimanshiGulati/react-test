import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../../actions/actionTypes';
import UserActions from '../../helpers/config';

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmitForm(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { email, password, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form onSubmit={this.submitForm(email, password)}>

          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={email}
              onChange={this.changeEmail} />
          </div>

          <div className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.changePassword} />
          </div>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={this.props.inProgress}>
            Sign in
                  </button>

        </form>
        <Link to="/register" className="btn btn-link">Register</Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: UserActions.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
