import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

const TaskView = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    padding: 5px;
    display: inline-flex;
    flex-direction: column;
    padding: 10px;
    
`;

const TaskTitleInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
    font-size: 25px;
    margin-bottom: 10px;
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
`;

class TaskDetailView extends Component {
    onTaskTitleChange = e => {
        let { task } = this.props;
        task.title = e.target.value;

        this.setState({ task });
    };

    onTaskDescriptionChange = e => {
        let { task } = this.props;
        task.description = e.target.value;

        this.setState({ task });
    };

    render() {
        let { task } = this.props;

        return (
            <TaskView>
                <TaskTitleInput
                    value={task.title}
                    onChange={this.onTaskTitleChange}
                />
                <TaskDescriptionInput
                    value={task.description}
                    onChange={this.onTaskDescriptionChange}
                />
            </TaskView>
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

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailView);
