import { createStore } from "redux";
import { combineReducers } from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension';
import {searchReducer} from '../reducers/searchReducer';
import {addReducer} from '../reducers/addReducer';

export default createStore(
    combineReducers({
        search: searchReducer,
        add: addReducer,
    }),
    devToolsEnhancer()
);