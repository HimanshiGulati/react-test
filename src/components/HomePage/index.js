import React from 'react';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../actions/actionTypes';
import Home from './Home';
import TagList from './TagList';
import config from '../../helpers/config';
import HomeContainer from './HomeContainer';

const Promise = global.Promise;

class HomePage extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ?
      config.Articles.feed :
      config.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([config.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">

        <HomeContainer token={this.props.token} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <Home />

            <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <TagList
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED })
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
