import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import TaskDashboard from '../task/taskDashboard/TaskDashboard';
import TaskMainPage from '../task/taskMainPage/TaskMainPage';
import MobileSidebar from '../sidebar/MobileSidebar';

export default class Router extends Component {
    render() {
        // let { match } = this.props;
        // console.log('match :', match);

        return (
            <div style={{ height: '100%', width: '100%' }}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/task" />
                    </Route>
                </Switch>

                <MediaQuery maxWidth={600}>
                    {matches => {
                        return matches ? (
                            <Switch>
                                <Route
                                    path="/task/:id"
                                    component={TaskMainPage}
                                />
                                <Route
                                    exact
                                    path="/task"
                                    component={MobileSidebar}
                                />
                            </Switch>
                        ) : (
                            <Switch>
                                <Route path="/task" component={TaskDashboard} />
                            </Switch>
                        );
                    }}
                </MediaQuery>
            </div>
        );
    }
}
