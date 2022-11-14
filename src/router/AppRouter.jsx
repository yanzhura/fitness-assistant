import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../layouts/Login';
import Home from '../layouts/Home';
import Schedule from '../layouts/Sсhedule';
import Stats from '../layouts/Stats';
import Dashboard from '../layouts/Dashboard';
import Help from '../layouts/Help';
import Logout from '../layouts/Logout';
import PrivateRoute from './PrivateRoute';
import NotFound from '../layouts/NotFound';

const AppRouter = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Redirect exact from="/login" to="/login/signIn" />
            <Route path="/login/signIn" component={Login} />
            <Route path="/login/signUp" component={Login} />
            <PrivateRoute path="/schedule" component={Schedule} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/stats" component={Stats} />
            <PrivateRoute path="/help" component={Help} />
            <Route path="/logout" component={Logout} />
            <Route path="/not_found" component={NotFound} />
            <Redirect to="/not_found" />
        </Switch>
    );
};

export default AppRouter;
