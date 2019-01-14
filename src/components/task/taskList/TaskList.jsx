import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Task from './TaskListItem';
import dateSortFunction from './dateSortFunction';
import searchFilterFunction from './searchFilterFunction';
import PropTypes from 'prop-types';

const List = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
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

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired
};

const mapStateToProps = ({ tasks, router, searchterm }) => {
    let taskList = tasks.taskList.filter(task => !task.parentTask);

    taskList.sort(dateSortFunction);

    let { searchValue } = searchterm;

    if (searchValue && searchValue !== '') {
        taskList = taskList.filter(task =>
            searchFilterFunction(task, searchValue)
        );
    }

    return { tasks: taskList, location: router.location };
};

export default connect(mapStateToProps)(TaskList);
