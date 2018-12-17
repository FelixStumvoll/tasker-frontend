import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Task from './TaskListItem';

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const FlexItem = styled.div`
    height: 80px;
    border-bottom: 2px solid black;
`;

class TaskList extends Component {
    render() {
        let { tasks } = this.props;
        return (
            <div>
                <List>
                    {tasks &&
                        tasks.map(task => (
                            <FlexItem key={task.id}>
                                <Task id={task.id} />
                            </FlexItem>
                        ))}
                </List>
            </div>
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
