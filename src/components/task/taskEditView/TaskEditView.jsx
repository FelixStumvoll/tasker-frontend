import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Textarea from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import { endEditTask, updateTask } from './../taskActions';

const TaskPlaceholder = `
::placeholder {
    font-style: oblique;
    color: white;
    opacity: 0.5;
}
`;

const TaskArea = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    display: block;
`;

const TaskTitle = styled.input`
    margin-bottom: 10px;
    font-weight: bold;
    border: none;
    outline: none;
    font-weight: bold;
    font-size: 18px;
    padding: 0px;
    background-color: inherit;
    color: inherit;
    ${TaskPlaceholder};
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TaskDescription = styled(Textarea)`
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: block;
    padding: 0px;
    margin: 0px;
    background-color: inherit;
    resize: none;
    font-size: 16px;
    color: inherit;
    overflow: hidden;
    ${TaskPlaceholder};
`;

//#region Badge

//#region Badge Animations
const SavePopupAnimation = keyframes`
0% {
    transform: scale(0);
    opacity: 0;
}

50% {
    transform: scale(1);
    opacity: 1;
}

100% {
    opacity: 1;
}
`;

const SavePopoutAnimation = keyframes`
0% {
    opacity: 1;
}

50% {
    transform: scale(1);
    opacity: 1;
}

100% {
    transform: scale(0);
    opacity: 0;
}
`;

const CancelAppear = keyframes`
0% {
    right: -10px;
    transform: scale(0);
    opacity: 0;
}

50%{
    transform: scale(1);
    right: -10px;
    opacity: 1;
}


100%{
    right: 25px;
    opacity: 1;
}
`;

const CancelDissapear = keyframes`
0% {
    right: 25px;
    opacity: 1;
}

50%{
    transform: scale(1);
    right: -10px;
    opacity: 1;
}

100% {
    right: -10px;
    transform: scale(0);
    opacity: 0;
}
`;

//#endregion

const BadgeWrapper = styled.div`
    position: relative;
`;

const Badge = styled.button`
    border: none;
    outline: none;
    position: absolute;
    border-radius: 25px;
    transition: 250ms;
    width: 30px;
    height: 30px;
    cursor: pointer;
    animation-duration: 500ms;
    opacity: ${({ editing }) => (editing ? 1 : 0)};
`;

const SaveBadge = styled(Badge)`
    bottom: -15px;
    right: -10px;
    background-color: green;
    color: white;
    animation-name: ${({ editing }) =>
        editing ? SavePopupAnimation : SavePopoutAnimation};
`;

const CancelBadge = styled(Badge)`
    bottom: -15px;
    right: 25px;
    background-color: red;
    animation-name: ${({ editing }) =>
        editing ? CancelAppear : CancelDissapear};
`;

const Icon = styled(FontAwesomeIcon)`
    margin: auto;
`;
//#endregion

class TaskEditView extends Component {
    constructor(props) {
        super(props);
        this.state = { editing: true, task: Object.assign({}, props.task) };
    }

    onDescriptionChange = e => {
        let { task } = this.state;
        task.description = e.target.value;
        this.setState({ task });
    };

    onTitleChange = e => {
        let { task } = this.state;
        task.title = e.target.value;
        this.setState({ task });
    };

    updateTask = () => {
        this.setState({ editing: false });

        setTimeout(() => {
            this.props.updateTask(this.state.task);
            this.props.endEditTask(this.props.task.id);
        }, 500);
    };

    cancelChanges = () => {
        this.setState({ editing: false });

        setTimeout(() => {
            this.props.endEditTask(this.props.task.id);
        }, 500);
    };

    render() {
        let { editing, task } = this.state;
        return (
            <div>
                <TaskArea>
                    <TaskTitle
                        type="text"
                        value={task.title}
                        onChange={this.onTitleChange}
                        placeholder={task.title ? '' : 'Enter Title'}
                    />
                    <TextWrapper>
                        <TaskDescription
                            value={task.description}
                            onChange={this.onDescriptionChange}
                            placeholder={
                                task.description ? '' : 'Enter Description'
                            }
                        />
                    </TextWrapper>
                </TaskArea>
                <BadgeWrapper>
                    <SaveBadge editing={editing} onClick={this.updateTask}>
                        <Icon icon={faSave} size="lg" />
                    </SaveBadge>
                    <CancelBadge editing={editing} onClick={this.cancelChanges}>
                        <Icon icon={faTimes} size="lg" />
                    </CancelBadge>
                </BadgeWrapper>
            </div>
        );
    }
}

const mapStateToProps = ({ tasks }, ownProps) => {
    let taskId = ownProps.taskId;
    let task = {};

    if (taskId && tasks.length > 0) {
        task = tasks.find(item => item.id === taskId);
    }

    return { task };
};

const mapDispatchToProps = {
    endEditTask,
    updateTask
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskEditView);
