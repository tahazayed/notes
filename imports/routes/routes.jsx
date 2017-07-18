/**
 * Created by taha.amin on 7/12/2017.
 */

import {Meteor} from 'meteor/meteor';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import history from '../history'

import Login from '../ui/Login'
import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/NotFound'

window.browserHistory = history;

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = ()=> {
    if (!Meteor.userId()) {
        history.push('/');
    }
};

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
            <Route exact path="/login" component={Login} onEnter={onEnterPublicPage}/>
            <Route path="/signup" component={Signup}  onEnter={onEnterPublicPage}/>
            <Route path="/dashboard" component={Dashboard}  onEnter={onEnterPublicPage}/>
            <Route path="*" component={NotFound}   onEnter={onEnterPublicPage}/>
        </Switch>
    </Router>
);

export const onAuthChange = (isAuthenticated)=> {

    const pathname = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);


    if (isUnauthenticatedPage && isAuthenticated) {
        history.push('/dashboard');
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.push('/');
    }
};



