import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faPlus } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-solid-svg-icons/faPlus';

import { updateTask } from './../taskActions';

const TaskDetailGrid = styled.div`
    padding: 5px;
    display: inline-flex;
    flex-direction: column;
`;

const TaskView = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;
    width: 400px;
    box-sizing: border-box;
    background-color: ${({ editing }) => (editing ? '#ABB5B8' : 'transparent')};
    transition: 250ms;
`;

const TaskTitleInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
    font-size: 25px;
    margin-bottom: 10px;
    background-color: transparent;
`;

const TaskDescriptionInput = styled(Textarea)`
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
    resize: none;
    font-size: 16px;
    color: inherit;
    overflow: hidden;
    background-color: transparent;
`;

const ButtonPanel = styled.div`
    display: grid;
    grid-template-columns: 50px 50px 1fr 120px;
    grid-template-areas: 'cancel save . addTask';
    grid-column-gap: 20px;
    margin-top: 20px;
    height: 40px;
`;

//prettier-ignore
const DefaultDetailButton = styled.button`
    border-radius: 5px;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    transition: 250ms;
    border: 2px solid
        ${({ theme, positive }) =>
        positive ? theme.positiveColor : theme.negativeColor};

    color: ${({ theme, positive }) =>
        positive ? theme.positiveColor : theme.negativeColor};

    :active {
        background-color: ${({ theme, positive }) =>
        positive ? theme.positiveColor : theme.negativeColor};
        color: white;
    }
`;

const SaveButton = styled(DefaultDetailButton)`
    grid-area: save;
`;

const CancelButton = styled(DefaultDetailButton)`
    grid-area: cancel;
`;

const AddTaskButton = styled(DefaultDetailButton)`
    grid-area: addTask;
`;

class TaskDetailView extends Component {
    constructor(props) {
        super(props);
        let task = Object.assign({}, props.task);
        this.state = { task, editing: false };
    }

    componentDidUpdate(prevProps) {
        if (this.props.task.id !== prevProps.task.id) {
            this.setState({ task: this.props.task });
        }
    }

    onChange = (e, property) => {
        let { task } = this.state;
        task[property] = e.target.value;

        this.setState({ task, editing: true });
    };

    onCancel = () => {
        let task = Object.assign({}, this.props.task);
        this.setState({ task, editing: false });
    };

    onSave = () => {
        this.props.updateTask(this.state.task);
        this.setState({ editing: false });
    };

    render() {
        let { task, editing } = this.state;

        return (
            <TaskDetailGrid>
                <TaskView editing={editing}>
                    <TaskTitleInput
                        value={task.title}
                        onChange={e => {
                            this.onChange(e, 'title');
                        }}
                    />
                    <TaskDescriptionInput
                        value={task.description}
                        onChange={e => {
                            this.onChange(e, 'description');
                        }}
                    />
                </TaskView>
                <ButtonPanel>
                    <CancelButton positive={false} onClick={this.onCancel}>
                        <FontAwesomeIcon icon={faTimes} />
                    </CancelButton>
                    <SaveButton positive={true} onClick={this.onSave}>
                        <FontAwesomeIcon icon={faSave} />
                    </SaveButton>

                    <AddTaskButton positive={true}>
                        <FontAwesomeIcon icon={faPlus} /> Add Task
                    </AddTaskButton>
                </ButtonPanel>
            </TaskDetailGrid>
        );
    }
}

TaskDetailView.propTypes = {
    taskId: PropTypes.string.isRequired
};

const mapStateToProps = ({ tasks }, ownProps) => {
    let task = {};

    if (tasks.length > 0 && ownProps.taskId) {
        task = tasks.find(item => item.id === ownProps.taskId);
    }

    return { task };
};

const mapDispatchToProps = {
    updateTask
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailView);
