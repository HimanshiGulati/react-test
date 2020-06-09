import React from "react";
import { Link } from "react-router-dom";

export class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            {this.props.appTitle}
          </Link>
        </div>
      </nav>
    );
  }
}
