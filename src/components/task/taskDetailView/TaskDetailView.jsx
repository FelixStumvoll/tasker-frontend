import React from 'react';
import styled from 'styled-components';

const TaskArea = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

const TaskHeader = styled.div`
    margin-bottom: ${({ descriptionVisible }) =>
        descriptionVisible ? 10 : 0}px;
    font-weight: bold;
    font-size: 18px;
`;

const TaskText = styled.div`
    white-space: pre-line;
    word-wrap: break-word;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${({ largeView }) => (largeView ? '' : 'min-height: 40px;')};
`;

export default ({ task }) => {
    return (
        <TaskArea>
            <TextWrapper largeView={task.title && task.description}>
                {task.title && (
                    <TaskHeader
                        descriptionVisible={
                            task.description && !!task.description
                        }
                    >
                        {task.title}
                    </TaskHeader>
                )}

                {task.description && <TaskText>{task.description}</TaskText>}
            </TextWrapper>
        </TaskArea>
    );
};
