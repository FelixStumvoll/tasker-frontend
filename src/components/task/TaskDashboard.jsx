import React, { Component } from 'react';
import styled from 'styled-components';

import TaskList from './TaskList';

const TaskListGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 900px 1fr;
    grid-template-areas: '. TaskColumn .';
    margin-top: 20px;
`;

const TaskColumn = styled.div`
    grid-area: TaskColumn;
    display: flex;
    flex-direction: column;
`;

class TaskDashboard extends Component {
    render() {
        return (
            <TaskListGrid>
                <TaskColumn>
                    <TaskList size={5} />
                </TaskColumn>
            </TaskListGrid>
        );
    }
}

export default TaskDashboard;
