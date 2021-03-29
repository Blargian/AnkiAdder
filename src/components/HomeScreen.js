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
            <Switch>
                <div className="Homescreen">
                    <Route exact path="/">
                        <SearchBar/>
                    </Route>
                    <Route exact path="/add">
                        <Selector/>
                    </Route>
                </div>
            </Switch>
        </Router>
    );
}

export default HomeScreen;