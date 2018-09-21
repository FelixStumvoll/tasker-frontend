import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateTask, startEditTask } from './taskActions';
import TaskDetailView from './taskDetailView/TaskDetailView';
import TaskEditView from './taskEditView/TaskEditView';

const TaskAppearAnimation = keyframes`
0%{
    width: 50%;
    top: -50px;
}

100%{
    top: 0px;
    width: 100%;
}
`;

const TaskArea = styled.div`
    display: grid;
    grid-template-columns: 50px 850px;
    position: relative;
    animation-name: ${TaskAppearAnimation};
    animation-duration: 1s;

`;

const CheckedIcon = styled(FontAwesomeIcon)`
    margin: auto;
    color: ${({ checked }) => (checked ? 'white' : 'black')};
`;

const CheckedField = styled.button`
    background-color: ${props => (props.checked ? 'green' : 'red')};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 0;
    outline: none;
    border: none;
    cursor: pointer;
    transition: 250ms;
`;

const TaskView = styled.div`
    padding: 5px 5px 5px 0px;
    padding-left: 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: ${({ editing }) => (editing ? 'blue' : '#d30c7b')};
    color: ${({ editing }) => (editing ? 'white' : 'black')};
    transition: 250ms;
    transition-timing-function: ease-in;
`;

class Task extends Component {
    completedClick = () => {
        let { task } = this.props;
        task.completed = !task.completed;
        this.props.updateTask(task);
    };

    beginEdit = () => {
        let { task } = this.props;
        if (!task.editing) {
            this.props.startEditTask(task.id);
        }
    };

    render() {
        let { task } = this.props;
        return (
            <TaskArea showAnimation={task.showAnimation}>
                <CheckedField
                    checked={task.completed}
                    onClick={this.completedClick}
                >
                    <CheckedIcon
                        checked={task.completed}
                        icon={faCheck}
                        size="2x"
                    />
                </CheckedField>
                <TaskView
                    editing={task.editing}
                    onDoubleClick={this.beginEdit}
                    on
                >
                    {task.editing ? (
                        <TaskEditView taskId={task.id} />
                    ) : (
                        <TaskDetailView task={task} />
                    )}
                </TaskView>
            </TaskArea>
        );
    }
}

const mapStateToProps = ({ tasks }, ownProps) => {
    let taskId = ownProps.id;
    let task = {};

    if (taskId && tasks.length > 0) {
        task = tasks.find(item => item.id === taskId);
    }

    return { task };
};

const mapDispatchToProps = { updateTask, startEditTask };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Task)
);
