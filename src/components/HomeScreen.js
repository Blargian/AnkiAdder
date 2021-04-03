import React, {useState} from 'react';
import SearchBar from './SearchBar';
import Selector from './Selector';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

const HomeScreen = (props) => {

    const onLoad = window.addEventListener('DOMContentLoaded',(e)=>{
        console.log('DOM loaded')
    })

    return (
        <Router>
            <Switch >
                <Route exact path="/">
                    <div className="Homescreen">
                        <SearchBar/>
                    </div>
                </Route>
                <Route exact path="/add">
                    <Selector/>
                </Route>
            </Switch>
        </Router>
    );
}

export default HomeScreen;