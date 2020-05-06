import React from 'react';
import {
    BrowserRouter, Route, Switch,
} from 'react-router-dom';

import App from '../app-components/index';

import Home from '../components/Home';

import Counter from '../components/Counter';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/counter" exact component={Counter}/>
        </Switch>
    </BrowserRouter>
);

export default Routes
