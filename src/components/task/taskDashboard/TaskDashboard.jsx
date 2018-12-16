import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import TaskList from '../taskList/TaskList';
import { createEmptyTask } from '../taskActions';

const CreateTaskButton = styled.button`
    height: 40px;
    margin-bottom: 30px;
    border: 2px solid ${props => props.theme.positiveColor};
    color: ${props => props.theme.positiveColor};
    outline: none;
    border-radius: 5px;
    background-color: transparent;
    width: 120px;
    cursor: pointer;
    transition: ${({ theme }) => theme.transitionDuration}ms;
    position: sticky;
    top: 70px;

    :active {
        background-color: ${props => props.theme.positiveColor};
        color: white;
    }
`;

const TaskDashboardGrid = styled.div`
    display: grid;
    grid-template-areas: 'TaskSidebar CurrentTask';
    grid-template-columns: 250px 1fr;
    grid-template-rows: 1fr;
    height: 100%;
    width: 100%;
    background-color: royalblue;
`;

const TaskSidebar = styled.aside`
    grid-area: TaskSidebar;
    border-right: 2px solid black;
`;

const TaskListGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 900px 1fr;
    grid-template-areas: '. TaskColumn .';
`;

const TaskColumn = styled.div`
    grid-area: TaskColumn;
    display: flex;
    flex-direction: column;
`;

const Buffer = styled.div`
    margin-bottom: 30px;
`;

class TaskDashboard extends Component {
    createTask = async () => {
        await this.props.createEmptyTask();
    };

    render() {
        return (
            <TaskDashboardGrid>
                <TaskSidebar />
            </TaskDashboardGrid>
            // <TaskListGrid>
            //     <TaskColumn>
            //         {/* <TaskCreatePanel /> */}
            //         <CreateTaskButton onClick={this.createTask}>
            //             <FontAwesomeIcon icon={faPlus} /> Create Task
            //         </CreateTaskButton>
            //         <Buffer />
            //         <TaskList />
            //     </TaskColumn>
            // </TaskListGrid>
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
