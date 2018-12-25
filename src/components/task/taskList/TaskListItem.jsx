import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { updateTask, startEditTask } from '../taskActions';

const TaskArea = styled(Link)`
    text-decoration: none;
    color: black;
    background-color: inherit;
    cursor: pointer;
    height: 100%;
    display: grid;
    grid-template-areas:
        'TitleArea'
        'DescriptionArea';
    grid-template-rows: 30px 1fr;
    font-family: ${({ theme }) => theme.defaultFont};
`;

const TaskTitle = styled.h1`
    margin: auto;
    max-width: 100%;
    padding-top: 5px;
    grid-area: TitleArea;
    font-size: ${({ theme }) => theme.defaultFontSize};
    text-overflow: ellipsis;
    overflow: hidden;
`;

const TaskText = styled.div`
    max-width: 100%;
    grid-area: DescriptionArea;
    padding: 5px;
    white-space: pre;
    text-overflow: ellipsis;
    overflow: hidden;
`;

class TaskListItem extends Component {
    completedClick = () => {
        let { task } = this.props;
        task.completed = !task.completed;
        this.props.updateTask(task);
    };

    showDetailView = () => {
        this.props.history.push(`/tasks/${this.props.task.id}`);
    };

    render() {
        let { task } = this.props;
        return (
            <TaskArea to={`/tasks/${task.id}`}>
                <TaskTitle>{task.title}</TaskTitle>
                <TaskText>{task.description}</TaskText>
            </TaskArea>
        );
    }
}

TaskListItem.propTypes = {
    id: PropTypes.string.isRequired,
    task: PropTypes.object
};

const mapStateToProps = ({ tasks }, ownProps) => {
    let taskId = ownProps.id;
    let task = {};

    if (taskId && tasks.length > 0) {
        task = tasks.find(item => item.id === taskId);
    }

    return { task };
};

const mapDispatchToProps = { updateTask, startEditTask };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TaskListItem)
);
