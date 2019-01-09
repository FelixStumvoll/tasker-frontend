import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';

import DesktopView from '../responsiveView/DesktopView';
import MobileView from '../responsiveView/MobileView';
import TaskRouter from '../task/taskRouter/TaskRouter';
import LoginPage from '../loginPage/LoginPage';
import { fetchTasks } from '../../redux/reducers/taskReducer/taskActions';
import store from '../../redux/store';
class Router extends Component {
    componentDidMount() {
        let { authenticated, tasksLoaded } = this.props;

        if (authenticated && !tasksLoaded) {
            store.dispatch(fetchTasks());
        }
    }

    render() {
        let { authenticated, fetchState } = this.props;
        return (
            <>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/task" />
                    </Route>

                    <Route
                        path="/task"
                        render={() => {
                            if (!authenticated) return <Redirect to="/login" />;

                            return (
                                <MediaQuery maxWidth={600}>
                                    {matches => {
                                        return matches ? (
                                            <Switch>
                                                <Route
                                                    exact
                                                    path="/task"
                                                    component={MobileView}
                                                />
                                                <Route
                                                    path="/task"
                                                    component={TaskRouter}
                                                />
                                            </Switch>
                                        ) : (
                                            <Switch>
                                                <Route
                                                    path="/task"
                                                    component={DesktopView}
                                                />
                                            </Switch>
                                        );
                                    }}
                                </MediaQuery>
                            );
                        }}
                    />

                    <Route
                        path="/login"
                        render={() => {
                            if (authenticated) return <Redirect to="/task" />;

                            return <LoginPage />;
                        }}
                    />
                </Switch>
            </>
        );
    }
}

const mapStateToProps = ({ auth, utility, fetch }) => ({
    authenticated: auth.authenticated,
    tasksLoaded: utility.tasksLoaded,
    fetchState: fetch
});

const mapDispatchToProps = {
    fetchTasks
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Router)
);
