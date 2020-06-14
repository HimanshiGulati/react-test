import { Profile, mapStateToProps } from './Profile';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    PROFILE_PAGE_LOADED,
    PROFILE_PAGE_UNLOADED
} from '../actions/actionTypes';
import config from '../helpers/config';

class MyFavorites extends Profile {
    componentWillMount() {
        this.props.onLoad(page => config.Articles.favoritedBy(this.props.match.params.username, page), Promise.all([
            config.Profile.get(this.props.match.params.username),
            config.Articles.favoritedBy(this.props.match.params.username)
        ]));
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    renderTabs() {
        return (
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        to={`/@${this.props.profile.username}`}>
                        My Articles
          </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link active"
                        to={`/@${this.props.profile.username}/favorites`}>
                        Favorited Articles
          </Link>
                </li>
            </ul>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onLoad: (pager, payload) =>
        dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
    onUnload: () =>
        dispatch({ type: PROFILE_PAGE_UNLOADED })
});


export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites);
