import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Route, Switch } from 'react-router-dom';

import { createEmptyTask } from '../taskActions';
import TaskList from '../taskList/TaskList';
import TaskMainPage from '../taskMainPage/TaskMainPage';
import TaskEmptyPage from '../taskEmptyPage/TaskEmptyPage';

const TaskSidebar = styled.aside`
    position: fixed;
    grid-area: TaskSidebarArea;
    border-right: 2px solid black;
    height: 100%;
    width: ${({ theme }) => theme.sidebarWidth};
`;

const AddTaskButton = styled.button`
    cursor: pointer;
    border: none;
    font-size: ${({ theme }) => theme.defaultFontSize};
    font-weight: bold;
    background-color: white;
    border-bottom: 2px solid black;
    width: ${({ theme }) => theme.sidebarWidth};
    height: 85px;
    position: fixed;
    top: ${({ theme }) => theme.navHeight};

    :hover {
        background-color: ${({ theme }) => theme.positiveColor};
        color: white;
    }
`;

const ListWrapper = styled.div`
    grid-area: TaskList;
    position: fixed;
    left: 0;
    top: 135px;
    box-sizing: border-box;
    width: ${({ theme }) => theme.sidebarWidth};
    /*todo calc from sidebarwidth and addTaskheight*/
    height: calc(100% - (85px+${({ theme }) => theme.navHeight}));
    overflow: auto;
`;

const ContentWrapper = styled.div`
    margin-left: ${({ theme }) => theme.sidebarWidth};
    height: 100%;
    width: calc(100% - ${({ theme }) => theme.sidebarWidth});
`;

const MainView = styled.div`
    height: 100%;
    width: 100%;
`;

class TaskDashboard extends Component {
    createTask = async () => {
        await this.props.createEmptyTask();
    };

    render() {
        let { match } = this.props;

        return (
            <MainView>
                {/* todo move sidebar to own file */}
                <TaskSidebar>
                    <AddTaskButton>
                        {/* todo change size of Plus Icon */}
                        <FontAwesomeIcon icon={faPlus} /> Add Task
                    </AddTaskButton>
                    <ListWrapper>
                        <TaskList />
                    </ListWrapper>
                </TaskSidebar>
                <ContentWrapper>
                    <Switch>
                        {/* todo remove mainpage */}
                        <Route
                            path={`${match.url}/:id`}
                            component={TaskMainPage} 
                        />
                        <Route path="" component={TaskEmptyPage} />
                    </Switch>
                </ContentWrapper>
            </MainView>
        );
    }
}

const mapDispatchToProps = {
    createEmptyTask
};

export default connect(
    null,
    mapDispatchToProps
)(TaskDashboard);
