import login from './login';
import article from './articles';
import articleList from './articleList';
import common from './common';
import editor from './editor';
import home from './home';
import profile from './profile';
import settings from './settings';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    article,
    articleList,
    login,
    common,
    editor,
    home,
    profile,
    settings,
    router: routerReducer
});

export default rootReducer;
