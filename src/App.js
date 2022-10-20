import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './layouts/Login';
import Main from './layouts/Main';
import Navbar from './components/Navbar';
import Schedule from './layouts/Sсhedule';
import Stats from './layouts/Stats';
import Workouts from './layouts/Workouts';
import Help from './layouts/Help';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login/:loginType" component={Login} />
                <Route path="/schedule" component={Schedule} />
                <Route path="/workouts" component={Workouts} />
                <Route path="/stats" component={Stats} />
                <Route path="/help" component={Help} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
