import React, { Component } from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

const TaskView = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    display: block;
    padding: 5px 5px 5px 0px;
`;

const TitleText = styled.input`
    margin-bottom: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    border: none;
    outline: none;
    background-color: inherit;
    font-weight: bold;
    font-size: 18px;
    padding: none;
`;

const TaskText = styled(Textarea)`
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
`;

class TaskEditView extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props.task };
    }

    onTaskTextChange = e => {
        this.setState({ description: e.target.value });
    };

    onTitleChange = e => {
        this.setState({});
    }

    render() {
        let { description, title } = this.state;
        return (
            <TaskView>
                <TitleText type="text" value={title} />
                <TaskText
                    value={description}
                    onChange={this.onTaskTextChange}
                />
            </TaskView>
        );
    }
}

export default TaskEditView;
