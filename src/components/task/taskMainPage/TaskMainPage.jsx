import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TaskEmptyPage from '../taskEmptyPage/TaskEmptyPage';
import TaskCreatePanel from '../taskCreatePanel/TaskCreatePanel';

const MainPanel = styled.main`
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 100%;
`;

class TaskMainPage extends Component {
    render() {
        let { task } = this.props;
        console.log('undefined', task === undefined);
        return (
            <MainPanel>
                {task === undefined ? <TaskEmptyPage /> : <TaskCreatePanel />}
            </MainPanel>
        );
    }
}

//todo only save task id
const mapStateToProps = ({ tasks }, ownprops) => {
    let task = tasks.find(x => x.id === ownprops.match.params.id);
    console.log('task :', task);
    return { task };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskMainPage);
