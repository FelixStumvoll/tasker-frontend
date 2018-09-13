import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { updateTask } from './taskActions';
import TaskView from './taskView/TaskView';
import TaskEditView from './taskEditView/TaskEditView';

const TaskField = styled.div`
    border-radius: 5px;
    background-color: #d30c7b;
    display: grid;
    grid-template-columns: 50px 830px;
    grid-column-gap: 20px;
`;

// const TaskText = styled(Textarea)`
//     border: none;
//     outline: none;
//     width: auto;
//     box-sizing: border-box;
//     display: block;
//     margin: 5px;
//     padding: 0px;
//     background-color: inherit;
//     resize: none;
//     line-height: 30px;
// `;

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

class Task extends Component {
    constructor() {
        super();
        this.state = { editing: false };
    }

    textAreaChange = e => {
        let areaHeight = e.target.style.height;
        let margin = areaHeight === '30px' ? 0 : 1;
        this.setState({ margin });
    };

    completedClick = () => {
        console.log(this.props.task);
        let { task } = this.props;
        task.completed = !task.completed;
        this.props.updateTask(task);
    };

    editClick = () => {
        this.props.history.push(`/task/${this.props.task.id}`);
    };

    clicked = () => {
        console.log('test');
    };

    beginEdit = () => {
        if (!this.state.editing) {
            console.log('cowboi');
            this.setState({ editing: true });
        }
    };

    render() {
        let { task } = this.props;
        let { editing } = this.state;
        return (
            <TaskField>
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
                <div onClick={this.beginEdit}>
                    {editing ? (
                        <TaskEditView task={task} />
                    ) : (
                        <TaskView task={task} />
                    )}
                </div>
            </TaskField>
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
