import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TaskPanel from '../taskPanel/TaskPanel';

import TaskEmptyPage from '../taskEmptyPage/TaskEmptyPage';
// import LoadingScreen from '../../loadingScreen/LoadingScreen';

class TaskRouter extends Component {
    render() {
        let { tasks, match } = this.props;

        return (
            <Switch>
                <Route
                    path={`${match.url}/:id`}
                    render={props => {
                        let task = tasks.find(
                            task => task._id === props.match.params.id
                        );

                        return task ? (
                            <TaskPanel taskId={task._id} />
                        ) : (
                            <TaskEmptyPage />
                        );
                    }}
                />
                <Route path="" component={TaskEmptyPage} />
            </Switch>
        );
    }
}

const mapStateToProps = ({ tasks }) => ({
    tasks: tasks.taskList
});

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(TaskRouter)
);
