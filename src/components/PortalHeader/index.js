import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from './LogIn';
import { LogOut } from './LogOut';

class PortalHeader extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.appName.toLowerCase()}
          </Link>

          <LogOut currentUser={this.props.currentUser} />

          <LogIn currentUser={this.props.currentUser} />
        </div>
      </nav>
    );
  }
}

export default PortalHeader;
