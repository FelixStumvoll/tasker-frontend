import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { createEmptyTask } from '../taskActions';
import TaskList from '../taskList/TaskList';

const TaskDashboardGrid = styled.div`
    display: grid;
    grid-template-areas: 'TaskSidebarArea CurrentTaskArea';
    grid-template-columns: 250px 1fr;
    height: 100%;
`;

const TaskSidebar = styled.aside`
    grid-area: TaskSidebarArea;
    display: grid;
    grid-template-areas:
        'AddTaskArea'
        'TaskList';
    grid-template-rows: 80px 1fr;
    border-right: 2px solid black;
    width: 100%;
`;

const AddTaskButton = styled.button`
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
                    <div style={{ gridArea: 'TaskList' }}>
                        <TaskList />
                    </div>
                </TaskSidebar>
                <CurrentTask />
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
