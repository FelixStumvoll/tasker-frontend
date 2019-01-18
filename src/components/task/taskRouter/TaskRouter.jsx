import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TaskPanel from '../taskPanel/TaskPanel';
import styled from 'styled-components';

import TaskEmptyPage from '../taskEmptyPage/TaskEmptyPage';
import PropTypes from 'prop-types';

const Main = styled.main`
    height: 100%;
    width: 100%;
    @media screen and (min-width: ${({ theme }) => theme.maxWidth}) {
        width: calc(
            ${({ theme }) => theme.maxWidth} -
                ${({ theme }) => theme.sidebarWidth}
        );
        /* height: calc(100% - 20%); */
        margin: 0px auto 0px auto;
    }
`;

class TaskRouter extends Component {
    render() {
        let { tasks, match } = this.props;

        return (
            <Main>
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
            </Main>
        );
    }
}

TaskRouter.propTypes = {
    tasks: PropTypes.array.isRequired
};

const mapStateToProps = ({ tasks }) => ({
    tasks: tasks.taskList
});

export default withRouter(connect(mapStateToProps)(TaskRouter));
