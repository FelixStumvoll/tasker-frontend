import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TaskEmptyPage from '../taskEmptyPage/TaskEmptyPage';
import { TaskCreatePanel } from '../taskCreatePanel/TaskCreatePanel';

const MainPanel = styled.div`
    height: 100%;
    box-sizing: border-box;
    padding: 5px;
`;

class TaskMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = { task: undefined };
    }
    render() {
        let { task } = this.props;

        if (task === undefined) return <TaskEmptyPage />;

        return <TaskCreatePanel />;
    }
}

const mapStateToProps = ({ tasks }, ownprops) => {
    let task = tasks.find(x => x.id === ownprops.match.params.id);
    return { task: task };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskMainPage);
