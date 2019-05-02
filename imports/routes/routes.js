import { Meteor } from "meteor/meteor";
import React from 'react';
import { Router, Route, browserHistory } from "react-router";
import SignUp from "../ui/SignUp";
import Dashboard from '../ui/Dashboard';
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";

const unAuthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
    if( Meteor.userId() ) {
        browserHistory.replace('/dashboard')
    }
};

const onEnterPrivatePage = () => {
    if( !Meteor.userId() ) browserHistory.replace('/')
};

export const onAuthChange = (isAuthenticated) => {
    const pathName = browserHistory.getCurrentLocation().pathname;
    const isUnAuthenticatedPage = unAuthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);

    if( isAuthenticated && isUnAuthenticatedPage ) {
        browserHistory.replace('/dashboard');
    }
    if( !isAuthenticated && isAuthenticatedPage ) {
        browserHistory.replace('/');
    }
};

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
        <Route path="/signup" component={SignUp} onEnter={onEnterPublicPage}/>
        <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
        <Route path="*" component={NotFound}/>
    </Router>
);
