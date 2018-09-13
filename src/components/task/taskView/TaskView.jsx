import React from 'react';
import styled from 'styled-components';

const TaskView = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    display: block;
    padding: 5px 5px 5px 0px;
`;

const TaskHeader = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
`;

const TaskText = styled.span`
    white-space: pre-line;
`;

/*
const BadgeWrapper = styled.div`
    position: relative;
`;

const Badge = styled.button`
    border: none;
    outline: none;
    position: absolute;
    bottom: -15px;
    right: -15px;
    border-radius: 25px;
    width: 30px;
    height: 30px;
    background-color: #ddca7d;
`;

const EditIcon = styled(FontAwesomeIcon)`
    margin: auto;
`;
*/

export default ({ task }) => {
    return (
        <TaskView>
            <TaskHeader> {task.title} </TaskHeader>
            <TaskText>{task.description}</TaskText>
            {/* <BadgeWrapper>
                        <Badge onClick={this.editClick}>
                            <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                        </Badge>
                    </BadgeWrapper> */}
        </TaskView>
    );
};
