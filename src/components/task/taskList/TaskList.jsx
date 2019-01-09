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
    background-color: ${({ theme, active }) =>
        active ? theme.primaryColorActive : theme.primaryColor};
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
        let { tasks, location } = this.props;
        return (
            <List>
                {tasks &&
                    tasks.map(task => (
                        <FlexItem
                            active={location.pathname.includes(task._id)}
                            key={task._id}
                        >
                            <Task id={task._id} />
                        </FlexItem>
                    ))}
            </List>
        );
    }
}

const mapStateToProps = ({ tasks, router, utility }) => {
    let { searchTerm } = utility;

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

    if (searchTerm && searchTerm !== '') {
        taskList = taskList.filter(task => {
            if (task.title && task.title.includes(searchTerm)) return true;

            if (task.text && JSON.stringify(task.text).includes(searchTerm))
                return true;
            return false;
        });
    }

    return { tasks: taskList, location: router.location };
};

export default connect(mapStateToProps)(TaskList);
