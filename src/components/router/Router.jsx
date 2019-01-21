import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DesktopView from '../responsiveView/DesktopView';
import MobileView from '../responsiveView/MobileView';
import TaskRouter from '../task/taskRouter/TaskRouter';
import LoginPage from '../loginPage/LoginPage';
import { fetchTasks } from '../../redux/reducers/taskReducer/taskActions';
import store from '../../redux/store';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import routes from '../../common/routes';
import RegisterPage from '../registerPage/RegisterPage';
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
                        <Redirect to={routes.task} />
                    </Route>

                    <Route
                        path={routes.task}
                        render={() => {
                            if (!authenticated)
                                return <Redirect to={routes.login} />;
                            if (fetchState.loading && !fetchState.success)
                                return <LoadingScreen />;
                            return (
                                <MediaQuery maxWidth={600}>
                                    {matches => {
                                        return matches ? (
                                            <Switch>
                                                <Route
                                                    exact
                                                    path={routes.task}
                                                    component={MobileView}
                                                />
                                                <Route
                                                    path={routes.task}
                                                    component={TaskRouter}
                                                />
                                            </Switch>
                                        ) : (
                                            <Switch>
                                                <Route
                                                    path={routes.task}
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
                        path={routes.login}
                        render={() => {
                            if (authenticated)
                                return <Redirect to={routes.task} />;

                            return <LoginPage />;
                        }}
                    />

                    <Route path={routes.register} component={RegisterPage} />

                    <Route path="/(.*)">
                        <Redirect
                            to={authenticated ? routes.task : routes.login}
                        />
                    </Route>
                </Switch>
            </>
        );
    }
}

Router.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    tasksLoaded: PropTypes.bool.isRequired,
    fetchState: PropTypes.object.isRequired,
    fetchTasks: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, tasks, fetch }) => ({
    authenticated: auth.authenticated,
    tasksLoaded: tasks.tasksLoaded,
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
