import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { createEmptyTask } from '../taskActions';
import TaskList from '../taskList/TaskList';
import TaskDetailPage from '../taskDetailPage/TaskDetailPage';

const TaskDashboardGrid = styled.div`
    display: grid;
    grid-template-areas: 'TaskSidebarArea CurrentTaskArea';
    grid-template-columns: ${({ theme }) => theme.sidebarWidth}px 1fr;
    height: 100%;
`;

const TaskSidebar = styled.div`
    grid-area: TaskSidebarArea;
    display: grid;
    grid-template-areas:
        'AddTaskArea'
        'TaskList';
    grid-template-rows: 85px 1fr;
    border-right: 2px solid black;
    width: ${({ theme }) => theme.sidebarWidth}px;
    height: calc(100% - 50px);
    position: fixed;
    top: ${({ theme }) => theme.navHeight}px;
    left: 0;
    overflow: auto;
`;

const AddTaskButton = styled.button`
    cursor: pointer;
    grid-area: AddTaskArea;
    border: none;
    font-size: 16px;
    background-color: transparent;
    border-bottom: 2px solid black;
    transition: ${({ theme }) => theme.transitionDuration}ms;

    :hover {
        background-color: green;
        color: white;
    }
`;

const CurrentTask = styled.div`
    grid-area: CurrentTaskArea;
`;

const ListWrapper = styled.div`
    grid-area: TaskList;
`;

class TaskDashboard extends Component {
    createTask = async () => {
        await this.props.createEmptyTask();
    };

    render() {
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
                <CurrentTask>ABCD</CurrentTask>
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
