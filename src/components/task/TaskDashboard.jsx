import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import TaskList from './TaskList';
import { createEmptyTask } from './taskActions';

const CreateTaskButton = styled.button`
    height: 40px;
    margin-bottom: 30px;
    border: 2px solid #419669;
    color: #419669;
    outline: none;
    border-radius: 5px;
    background-color: #ffff;
    width: 120px;
    cursor: pointer;
    transition: 250ms;
    position: sticky;
    top: 70px;

    :active {
        background-color: #419669;
        color: white;
    }
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

class TaskDashboard extends Component {
    createTask = () => {
        this.props.createEmptyTask();
    };

    render() {
        return (
            <TaskListGrid>
                <TaskColumn>
                    <CreateTaskButton onClick={this.createTask}>
                        <FontAwesomeIcon icon={faPlus} /> Create Task
                    </CreateTaskButton>
                    <TaskList />
                </TaskColumn>
            </TaskListGrid>
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
