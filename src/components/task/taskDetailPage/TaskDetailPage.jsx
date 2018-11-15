import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TaskList from '../taskList/TaskList';
import TaskDetailView from './TaskDetailView';

const DetailPage = styled.div`
    padding: 10px;
`;

const DetailGrid = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-basis: auto;
`;

const DetailViewWrapper = styled.div`
    position: sticky;
    top: 80px;
    margin-right: 50px;
`;

const SubTaskHeader = styled.div`
    font-weight: bolder;
    margin-bottom: 20px;
`;

const SubtaskGrid = styled.div`
    width: 95vh;
`;

export class TaskDetailPage extends Component {
    constructor(props) {
        super(props);

        this.state = { task: props.task };
    }

    componentDidUpdate(prevProps) {
        if (this.props.task.id !== prevProps.task.id) {
            this.setState({ task: this.props.task });
        }
    }

    render() {
        let { task } = this.props;

        return (
            <DetailPage>
                {task && ( // note: this is only shown if the id is a valid task
                    <DetailGrid>
                        <DetailViewWrapper>
                            <TaskDetailView taskId={task.id} />
                        </DetailViewWrapper>
                        <SubtaskGrid>
                            <SubTaskHeader>Tasks:</SubTaskHeader>
                            <TaskList taskId={task.id} />
                            {/* <DemonstrationBloc /> */}
                        </SubtaskGrid>
                    </DetailGrid>
                )}
            </DetailPage>
        );
    }
}

const mapStateToProps = ({ tasks }, ownProps) => {
    let taskId = ownProps.match.params.id;
    let task = {};

    if (taskId && tasks.length > 0) {
        task = tasks.find(item => item.id === taskId);
    }

    return { task };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailPage);
