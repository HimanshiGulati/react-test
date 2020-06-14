import login from './login';
import article from './articles';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    login,
    article,
    router: routerReducer
});

export default rootReducer;
