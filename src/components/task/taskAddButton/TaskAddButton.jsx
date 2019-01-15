import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    padding: 5px;
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

TaskAddButton.propTypes = {
    createTask: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    createTask
};

export default connect(
    null,
    mapDispatchToProps
)(TaskAddButton);
