import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Task from './TaskListItem';

const List = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const FlexItem = styled.div`
    height: 85px;
    border-bottom: 1px solid black;
    overflow: auto;
`;

class TaskList extends Component {
    render() {
        let { tasks } = this.props;
        return (
            <List>
                {tasks &&
                    tasks.map(task => (
                        <FlexItem key={task.id}>
                            <Task id={task.id} />
                        </FlexItem>
                    ))}
            </List>
        );
    }
}

const mapStateToProps = ({ tasks }, ownProps) => {
    let taskList;

    if (ownProps.taskId) {
        if (tasks.length > 0) {
            taskList = tasks.filter(
                task => task.parentTask === ownProps.taskId
            );
        } else {
            taskList = [];
        }
    } else {
        taskList = tasks.filter(task => !task.parentTask);
    }

    return { tasks: taskList };
};

export default connect(mapStateToProps)(TaskList);
