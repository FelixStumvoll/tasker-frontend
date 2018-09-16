import React from 'react';
import styled from 'styled-components';

const TaskArea = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    display: block;
    transition: 250ms;
    transition-timing-function: ease-in;
`;

const TaskHeader = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
`;

const TaskText = styled.span`
    white-space: pre-line;
`;

export default ({ task }) => {
    return (
        <TaskArea>
            <TaskHeader> {task.title} </TaskHeader>
            <TaskText>{task.description}</TaskText>
        </TaskArea>
    );
};
