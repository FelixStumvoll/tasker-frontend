import React from 'react';
import styled from 'styled-components';

import TaskList from '../task/taskList/TaskList';
import TaskAddButton from '../task/taskAddButton/TaskAddButton';

const TaskSidebar = styled.aside`
    position: fixed;
    grid-area: TaskSidebarArea;
    border-right: 2px solid black;
    height: 100%;
    width: ${({ theme }) => theme.sidebarWidth};
`;

const AddArea = styled.div`
    width: ${({ theme }) => theme.sidebarWidth};
    height: 85px;
    position: fixed;
    top: ${({ theme }) => theme.navHeight};
    padding: 5px;
    box-sizing: border-box;
    border-bottom: 2px solid black;
`;

const ListWrapper = styled.div`
    grid-area: TaskList;
    position: fixed;
    left: 0;
    top: 135px;
    box-sizing: border-box;
    width: ${({ theme }) => theme.sidebarWidth};
    height: calc(100% - (85px + ${({ theme }) => theme.navHeight}));
    padding-bottom: 5px;
    overflow: auto;
`;

export default () => {
    return (
        <TaskSidebar>
            <AddArea>
                <TaskAddButton />
            </AddArea>
            <ListWrapper>
                <TaskList />
            </ListWrapper>
        </TaskSidebar>
    );
};
