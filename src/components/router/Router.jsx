import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TaskDashboard from '../task/taskDashboard/TaskDashboard';

export default class Router extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/tasks" />
                    </Route>
                </Switch>

                <Route
                    path="/(.+)"
                    render={() => (
                        <Route path="/tasks" component={TaskDashboard} />
                    )}
                />
            </div>
        );
    }
}
