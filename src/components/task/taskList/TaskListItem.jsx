import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateTask } from '../../../redux/reducers/taskReducer/taskActions';

const TaskArea = styled(Link)`
    text-decoration: none;
    color: black;
    background-color: inherit;
    cursor: pointer;
    height: 100%;
    display: grid;
    grid-template-areas:
        'TitleArea'
        'DueDate';
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

class TaskListItem extends Component {
    render() {
        let { task } = this.props;
        return (
            <TaskArea to={`/task/${task._id}`}>
                <TaskTitle>{task.title}</TaskTitle>
                {/* {task.dueDate && } */}
            </TaskArea>
        );
    }
}

const mapStateToProps = ({ tasks }, ownProps) => {
    let task = tasks.find(item => item._id === ownProps.taskId);
    return { task };
};

const mapDispatchToProps = { updateTask };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListItem);
