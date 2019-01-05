import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createEmptyTask } from '../taskActions';
import TaskMainPage from '../taskMainPage/TaskMainPage';
import Sidebar from '../../sidebar/Sidebar';
import TaskEmptyPage from '../taskEmptyPage/TaskEmptyPage';

const MainView = styled.div`
    height: 100%;
    width: 100%;
`;

const ContentWrapper = styled.div`
    margin-left: ${({ theme }) => theme.sidebarWidth};
    height: 100%;
    width: calc(100% - ${({ theme }) => theme.sidebarWidth});
`;

class TaskDashboard extends Component {
    createTask = async () => {
        await this.props.createEmptyTask();
    };

    render() {
        let { match } = this.props;

        return (
            <MainView>
                <Sidebar />
                <ContentWrapper>
                    <Switch>
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
