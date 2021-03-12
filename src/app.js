import ReactDOM from 'react-dom';
import React from 'react';
import HomeScreen from './components/HomeScreen';
import { Provider } from "react-redux";
import store from './store/store'
import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(
    <Provider store = {store}>
        <HomeScreen/>
    </Provider>
,document.getElementById("root")
);