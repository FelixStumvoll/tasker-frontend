import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Route } from 'react-router-dom';

import { createEmptyTask } from '../taskActions';
import TaskList from '../taskList/TaskList';
import { TaskMainPage } from '../taskMainPage/TaskMainPage';

const TaskDashboardGrid = styled.div`
    display: grid;
    grid-template-areas: 'TaskSidebarArea CurrentTaskArea';
    grid-template-columns: ${({ theme }) => theme.sidebarWidth} 1fr;
    height: 100%;
    width: 100%;
`;

const TaskSidebar = styled.div`
    grid-area: TaskSidebarArea;
    display: grid;
    grid-template-areas:
        'AddTaskArea'
        'TaskList';
    grid-template-rows: 85px 1fr;
    border-right: 2px solid black;
    width: ${({ theme }) => theme.sidebarWidth};
    height: calc(100% - ${({ theme }) => theme.navHeight});
    position: fixed;
    top: ${({ theme }) => theme.navHeight};
    left: 0;
    overflow: auto;
`;

//todo move to taskList
const AddTaskButton = styled.button`
    cursor: pointer;
    grid-area: AddTaskArea;
    border: none;
    font-size: 16px;
    background-color: white;
    border-bottom: 2px solid black;
    transition: ${({ theme }) => theme.transitionDuration};
    position: sticky;
    top: 0;

    :hover {
        background-color: green;
        color: white;
    }
`;

const CurrentTask = styled.div`
    grid-area: CurrentTaskArea;
    height: 100%;
`;

const ListWrapper = styled.div`
    grid-area: TaskList;
    height: 100%;
`;

class TaskDashboard extends Component {
    createTask = async () => {
        await this.props.createEmptyTask();
    };

    render() {
        let { match } = this.props;

        // console.log('match.url :', match.url);

        return (
            <TaskDashboardGrid>
                <TaskSidebar>
                    <AddTaskButton>
                        <FontAwesomeIcon icon={faPlus} /> Add Task
                    </AddTaskButton>
                    <ListWrapper>
                        <TaskList />
                    </ListWrapper>
                </TaskSidebar>
                <CurrentTask>
                    <Route path={`${match.url}/:id`} component={TaskMainPage} />
                </CurrentTask>
            </TaskDashboardGrid>
        );
    }
}

const mapDispatchToProps = {
    createEmptyTask
};

export default connect(
    null,
    mapDispatchToProps
)(TaskDashboard);
