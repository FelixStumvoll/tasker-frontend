import React, { Component } from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

const TaskArea = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    display: block;
    padding: 5px 5px 5px 0px;
`;

const TaskTitle = styled.input`
    margin-bottom: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    border: none;
    outline: none;
    background-color: inherit;
    font-weight: bold;
    font-size: 18px;
    padding: 0px;
    color: inherit;
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
`;

//#region Badge
/*
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
    background-color: #ddca7d;
`;

const EditIcon = styled(FontAwesomeIcon)`
    margin: auto;
`;
*/

//#endregion

class TaskEditView extends Component {
    constructor(props) {
        super(props);
        this.state = { task: this.props.task };
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

    render() {
        let { description, title } = this.state.task;
        return (
            <TaskArea>
                <TaskTitle type="text" value={title} onChange={this.onTitleChange} />
                <TaskDescription value={description} onChange={this.onDescriptionChange} />
            </TaskArea>
        );
    }
}

export default TaskEditView;
