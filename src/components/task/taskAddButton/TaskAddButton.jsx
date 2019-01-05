import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
`;

export default class TaskAddButton extends Component {
    render() {
        return (
            <AddTaskButton>
                <FontAwesomeIcon icon={faPlus} /> Add Task
            </AddTaskButton>
        );
    }
}
