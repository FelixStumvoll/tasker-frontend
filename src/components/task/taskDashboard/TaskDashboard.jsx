import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Route } from 'react-router-dom';

import { createEmptyTask } from '../taskActions';
import TaskList from '../taskList/TaskList';
import TaskMainPage from '../taskMainPage/TaskMainPage';

const TaskDashboardGrid = styled.div`
    display: grid;
    grid-template-areas: 'TaskSidebarArea CurrentTaskArea';
    grid-template-columns: ${({ theme }) => theme.sidebarWidth} 1fr;
    height: 100%;
    width: 100%;
`;

const TaskSidebar = styled.aside`
    grid-area: TaskSidebarArea;
    border-right: 2px solid black;
    height: 100%;
    width: ${({ theme }) => theme.sidebarWidth};
`;

//todo move to taskList
const AddTaskButton = styled.button`
    cursor: pointer;
    border: none;
    font-size: 16px;
    background-color: white;
    border-bottom: 2px solid black;
    transition: ${({ theme }) => theme.transitionDuration};
    width: ${({ theme }) => theme.sidebarWidth};
    height: 85px;
    position: fixed;
    top: ${({ theme }) => theme.navHeight};

    :hover {
        background-color: green;
        color: white;
    }
`;

const ListWrapper = styled.div`
    grid-area: TaskList;
    position: fixed;
    left: 0;
    top: 135px;
    box-sizing: border-box;
    width: ${({ theme }) => theme.sidebarWidth};
    height: calc(100% - 135px);
    overflow: auto;
`;

class TaskDashboard extends Component {
    createTask = async () => {
        await this.props.createEmptyTask();
    };

    render() {
        let { match } = this.props;

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
                <Route path={`${match.url}/:id`} component={TaskMainPage} />
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
