import React from 'react';
import styled from 'styled-components';

import Sidebar from '../sidebar/Sidebar';
import TaskRouter from '../task/taskRouter/TaskRouter';

const MainView = styled.div`
    height: 100%;
    width: 100%;
`;

const ContentWrapper = styled.div`
    margin-left: ${({ theme }) => theme.sidebarWidth};
    height: 100%;
    width: calc(100% - ${({ theme }) => theme.sidebarWidth});
`;

export default () => {
    return (
        <MainView>
            <Sidebar />
            <ContentWrapper>
                <TaskRouter />
            </ContentWrapper>
        </MainView>
    );
};
