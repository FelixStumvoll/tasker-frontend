import React from 'react';
import styled from 'styled-components';
import TaskList from '../task/taskList/TaskList';
import TaskAddButton from '../task/taskAddButton/TaskAddButton';

const MobileView = styled.div`
    height: 100%;
    width: 100%;
`;

const ListPosition = styled.div`
    position: fixed;
    left: 0px;
    top: ${({ theme }) => theme.navHeight};
    width: 100%;
    height: calc(100% - (${({ theme }) => theme.navHeight} + 60px));
    overflow: auto;
    box-sizing: border-box;
`;

const ButtonPosition = styled.div`
    position: fixed;
    bottom: 5px;
    left: 0px;
    height: 50px;
    margin: 5px 5px 0px 5px;
    width: calc(100% - 10px);
    transition: ${({ theme }) => theme.transitionDuration};
`;

export default () => {
    return (
        <MobileView>
            <ListPosition>
                <TaskList />
            </ListPosition>
            <ButtonPosition>
                <TaskAddButton />
            </ButtonPosition>
        </MobileView>
    );
};
