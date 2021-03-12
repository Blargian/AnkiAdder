import { createStore } from "redux";
import { combineReducers } from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension';
import {searchReducer} from '../reducers/searchReducer';

export default createStore(
    combineReducers({
        search: searchReducer,
    }),
    devToolsEnhancer()
);