import React from 'react';
import { Link } from 'react-router-dom';

export const LogIn = props => {
    if (props.user) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
            </Link>
                </li>

                <li className="nav-item">
                    <Link to="/editor" className="nav-link">
                        <i className="ion-compose"></i>&nbsp;New Post
            </Link>
                </li>

                <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                        <i className="ion-gear-a"></i>&nbsp;Settings
            </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/@${props.user.username}`}
                        className="nav-link">
                        <img src={props.user.image} className="user-pic" alt={props.user.username} />
                        {props.user.username}
                    </Link>
                </li>

            </ul>
        );
    }

    return null;
};
