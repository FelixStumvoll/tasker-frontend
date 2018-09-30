import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Task from './Task';

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const FlexItem = styled.div`
    margin-bottom: 20px;
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
    let taskList = tasks;

    if (ownProps.taskId) {
        let parentTask = tasks.find(item => item.id === ownProps.taskId);
        if (parentTask && parentTask.subtasks) {
            taskList = parentTask.subtasks;
        } else {
            taskList = [];
        }
    }

    return { tasks: taskList };
};

export default connect(mapStateToProps)(TaskList);
