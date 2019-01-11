import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Task from './TaskListItem';
import { dateSortFunction, searchFilterFunction } from '../../../common/common';

const List = styled.div`
    display: flex;
    flex-direction: column;
`;

const FlexItem = styled.div`
    height: 50px;
    background-color: ${({ theme, active }) =>
        active ? theme.primaryColor : theme.listItemColor};
    border: none;
    border-radius: 10px;
    padding: 5px;
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
                            <Task taskId={task._id} />
                        </FlexItem>
                    ))}
            </List>
        );
    }
}

const mapStateToProps = ({ tasks, router, utility }) => {
    let taskList = tasks.filter(task => !task.parentTask);

    taskList.sort(dateSortFunction);

    let { searchTerm } = utility;

    if (searchTerm && searchTerm !== '') {
        taskList = taskList.filter(task =>
            searchFilterFunction(task, searchTerm)
        );
    }

    return { tasks: taskList, location: router.location };
};

export default connect(mapStateToProps)(TaskList);
