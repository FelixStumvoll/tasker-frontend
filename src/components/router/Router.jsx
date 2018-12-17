import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TaskDashboard from '../task/taskDashboard/TaskDashboard';
import TaskCreatePage from '../task/taskCreatePage/TaskCreatePage';

export default class Router extends Component {
    render() {
        return (
            <main style={{ height: '100%' }}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/tasks" />
                    </Route>
                </Switch>

                <Route
                    path="/(.+)"
                    render={() => (
                        <Switch>
                            <Route
                                path="/tasks/create"
                                component={TaskCreatePage}
                            />
                            <Route
                                path="/tasks/:id"
                                component={TaskCreatePage}
                            />
                            <Route path="/tasks" component={TaskDashboard} />
                        </Switch>
                    )}
                />
            </main>
        );
    }
}
