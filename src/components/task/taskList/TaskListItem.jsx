import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import { updateTask } from '../../../redux/reducers/taskReducer/taskActions';
import routes from '../../../common/routes';

const TaskArea = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.textColor};
    background-color: inherit;
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: ${({ theme }) => theme.defaultFont};
    box-sizing: border-box;
`;

const TaskTitle = styled.h1`
    margin: auto;
    max-width: 100%;
    grid-area: TitleArea;
    font-size: ${({ theme }) => theme.defaultFontSize};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

const TaskDate = styled.span`
    margin: auto;
    max-width: 100%;
    grid-area: DueDate;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: ${({ theme }) => theme.defaultFontSize};
`;

class TaskListItem extends Component {
    render() {
        let { task } = this.props;

        return (
            <TaskArea to={`${routes.task}/${task._id}`}>
                {task.title && <TaskTitle>{task.title}</TaskTitle>}
                {task.dueDate && (
                    <TaskDate gridArea="DueDate">
                        <FontAwesomeIcon icon={faCalendarAlt} />{' '}
                        {format(task.dueDate, 'dd.MM.yyyy')}
                    </TaskDate>
                )}
            </TaskArea>
        );
    }
}

TaskListItem.propTypes = {
    taskId: PropTypes.string.isRequired,
    task: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired
};

const mapStateToProps = ({ tasks }, ownProps) => {
    let task = tasks.taskList.find(item => item._id === ownProps.taskId);
    return { task };
};

const mapDispatchToProps = { updateTask };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListItem);
