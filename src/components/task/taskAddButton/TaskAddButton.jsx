import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createTask } from '../../../redux/reducers/taskReducer/taskActions';

const AddTaskButton = styled.button`
    cursor: pointer;
    border: none;
    font-size: ${({ theme }) => theme.defaultFontSize};
    width: 100%;
    height: 100%;
    font-weight: bold;
    background-color: ${({ theme }) => theme.positiveColor};
    color: white;
    border-radius: 10px;
    transition: ${({ theme }) => theme.transitionDuration};
    font-family: ${({ theme }) => theme.defaultFont};
`;

class TaskAddButton extends Component {
    onTaskCreate = () => {
        let { createTask } = this.props;
        createTask();
    };

    render() {
        return (
            <AddTaskButton onClick={this.onTaskCreate}>
                <FontAwesomeIcon icon={faPlus} /> Add Task
            </AddTaskButton>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    createTask
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TaskAddButton)
);
