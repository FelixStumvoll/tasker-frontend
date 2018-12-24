import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TaskEmptyPage from '../taskEmptyPage/TaskEmptyPage';
import TaskPanel from '../taskPanel/TaskPanel';

const MainPanel = styled.main`
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 100%;
`;

class TaskMainPage extends Component {
    render() {
        let { task } = this.props;
        return (
            <MainPanel>
                {task === undefined ? (
                    <TaskEmptyPage />
                ) : (
                    <TaskPanel taskId={task.id} />
                )}
            </MainPanel>
        );
    }
}

const mapStateToProps = ({ tasks }, ownprops) => {
    let task = tasks.find(x => x.id === ownprops.match.params.id);
    return { task };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskMainPage);
