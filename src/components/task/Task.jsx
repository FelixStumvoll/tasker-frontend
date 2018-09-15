import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
// import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
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
    /* border-top-right-radius: inherit; */
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding-left: 20px;
    background-color: ${({ editing }) => (editing ? 'blue' : '#d30c7b')};
    color: ${({ editing }) => (editing ? 'white' : 'black')};
    transition: 250ms;
    transition-timing-function: ease-in;
`;

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

    render() {
        let { task } = this.props;
        let { editing } = this.state;
        return (
            <TaskArea editing={editing}>
                <CheckedField checked={task.completed} onClick={this.completedClick}>
                    <CheckedIcon checked={task.completed} icon={faCheck} size="2x" />
                </CheckedField>
                <TaskView editing={editing} onClick={this.beginEdit}>
                    {editing ? <TaskEditView task={task} /> : <TaskDetailView task={task} />}
                </TaskView>
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
