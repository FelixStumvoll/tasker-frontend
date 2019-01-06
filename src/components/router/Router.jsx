import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import DesktopView from '../responsiveView/DesktopView';
import MobileView from '../responsiveView/MobileView';
import TaskRouter from '../task/taskRouter/TaskRouter';

class Router extends Component {
    render() {
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
                                    exact
                                    path="/task"
                                    component={MobileView}
                                />
                                <Route path={`/task`} component={TaskRouter} />
                            </Switch>
                        ) : (
                            <Switch>
                                <Route path="/task" component={DesktopView} />
                            </Switch>
                        );
                    }}
                </MediaQuery>
            </div>
        );
    }
}

export default withRouter(Router);
