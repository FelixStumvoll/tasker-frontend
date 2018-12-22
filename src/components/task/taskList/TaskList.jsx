import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Task from './TaskListItem';

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const FlexItem = styled.div`
    height: 85px;
    background-color: ${({ theme }) => theme.primaryColor};
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 2px;
    margin: 5px;

    :last-child {
        margin-bottom: 0px;
    }
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
