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
                        <FlexItem key={task._id}>
                            <Task id={task._id} />
                        </FlexItem>
                    ))}
            </List>
        );
    }
}

const mapStateToProps = ({ tasks }, ownProps) => {
    let taskList = tasks.filter(task => !task.parentTask);

    taskList.sort((lhs, rhs) => {
        if (!lhs.dueDate) {
            return 1;
        }

        if (!rhs.dueDate) {
            return -1;
        }

        return new Date(lhs.dueDate) - new Date(rhs.dueDate);
    });

    return { tasks: taskList };
};

export default connect(mapStateToProps)(TaskList);
