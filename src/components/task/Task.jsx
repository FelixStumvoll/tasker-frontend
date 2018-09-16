import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSave } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateTask } from './taskActions';
import TaskDetailView from './taskDetailView/TaskDetailView';
import TaskEditView from './taskEditView/TaskEditView';

const TaskArea = styled.div`
    display: grid;
    grid-template-columns: 50px 830px;
`;

const CheckedIcon = styled(FontAwesomeIcon)`
    margin: auto;
    color: ${({ checked }) => (checked ? 'white' : 'black')};
    transition: 250ms;
`;

const CheckedField = styled.button`
    background-color: ${props => (props.checked ? 'green' : 'red')};
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 0;
    outline: none;
    border: none;
    padding-top: 4px;
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

//#region Badge
const SavePopupAnimation = keyframes`
from {
    transform: scale(0);
    }
to {
    transform: scale(1);
}
`;

const SavePopoutAnimation = keyframes`
from {
    transform: scale(1);
    }
to {
    transform: scale(0);
}
`;

const BadgeWrapper = styled.div`
    position: relative;
`;

const Badge = styled.button`
    border: none;
    outline: none;
    position: absolute;
    bottom: -15px;
    right: -15px;
    border-radius: 25px;
    width: 30px;
    height: 30px;
    opacity: ${({ editing }) => (editing ? 1 : 0)};
    transition: 250ms;
    background-color: #ddca7d;
    animation-name: ${({ editing }) =>
        editing ? SavePopupAnimation : SavePopoutAnimation};
    animation-duration: 250ms;
`;

const SaveIcon = styled(FontAwesomeIcon)`
    margin: auto;
`;
//#endregion

class Task extends Component {
    constructor() {
        super();
        this.state = { editing: false };
    }

    completedClick = () => {
        console.log(this.props.task);
        let { task } = this.props;
        task.completed = !task.completed;
        this.props.updateTask(task);
    };

    editClick = () => {
        this.props.history.push(`/task/${this.props.task.id}`);
    };

    beginEdit = () => {
        if (!this.state.editing) {
            this.setState({ editing: true });
        }
    };

    endEdit = () => {
        this.setState({ editing: false });
    };

    render() {
        let { task } = this.props;
        let { editing } = this.state;
        return (
            <TaskArea editing={editing}>
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
                <div>
                    <TaskView editing={editing} onClick={this.beginEdit}>
                        {editing ? (
                            <TaskEditView task={task} />
                        ) : (
                            <TaskDetailView task={task} />
                        )}
                    </TaskView>
                    <BadgeWrapper>
                        <Badge editing={editing} onClick={this.endEdit}>
                            <SaveIcon icon={faSave} />
                        </Badge>
                    </BadgeWrapper>
                </div>
            </TaskArea>
        );
    }
}

const mapStateToProps = ({ tasks }, ownProps) => {
    let taskId = ownProps.id;
    let task = {};

    if (taskId && tasks.length > 0) {
        task = tasks.filter(item => item.id === taskId)[0];
    }

    return { task };
};

const mapDispatchToProps = { updateTask };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Task)
);
