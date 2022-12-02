import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../layouts/Login/Login';
import Start from '../layouts/Start';
import Stats from '../layouts/Stats';
import Home from '../layouts/Home';
import Help from '../layouts/Help';
import Logout from '../layouts/Logout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFound from '../layouts/NotFound';
import Workouts from '../layouts/Workouts';
import Schedule from '../layouts/Schedule';

const AppRouter = () => {
    return (
        <Switch>
            <PublicRoute exact path="/" component={Start} />
            <Redirect exact from="/login" to="/login/signIn" />
            <PublicRoute path="/login/signIn" component={Login} />
            <PublicRoute path="/login/signUp" component={Login} />
            <PrivateRoute path="/workouts/:seqNumber?" component={Workouts} />
            <PrivateRoute path="/schedule" component={Schedule} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/stats" component={Stats} />
            <PrivateRoute path="/help" component={Help} />
            <Route path="/logout" component={Logout} />
            <Route path="/not_found" component={NotFound} />
            <Redirect to="/not_found" />
        </Switch>
    );
};

export default AppRouter;
