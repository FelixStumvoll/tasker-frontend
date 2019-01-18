import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import DateInput from '../../dateInput/DateInput';
import {
    updateTask,
    removeTask
} from '../../../redux/reducers/taskReducer/taskActions';
import Editor from '../../editor/Editor';
import TagArea from '../taskTag/tagArea/TagArea';

const TaskGrid = styled.article`
    display: grid;
    grid-template-areas:
        'Detail'
        'Editor'
        'Delete';
    grid-template-rows: min-content min-content 1fr;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.defaultFont};
    color: ${({ theme }) => theme.textColor};
    padding: 10px;
    box-sizing: border-box;
`;

const DetailGrid = styled.div`
    grid-area: Detail;
    display: grid;
    grid-template-areas:
        'Info Tag'
        'Info Tag'
        '.    Tag';
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    grid-template-rows: 50px 50px 50px;
    width: 100%;

    @media screen and (max-width: 900px) {
        display: grid;
        grid-template-areas: 'Info' 'Tag';
        grid-template-rows: 100px 150px;
        grid-template-columns: 1fr;
        grid-row-gap: 10px;
    }
`;

const InfoGrid = styled.div`
    grid-area: Info;
    display: grid;
    grid-template-areas:
        'TitleLabel TitleInput'
        'DateLabel DateInput';
    grid-template-columns: 70px 1fr;
    grid-auto-rows: 1fr 1fr;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 5px;
`;

const DetailLabel = styled.label`
    grid-area: ${props => props.gridArea};
    margin: auto;
    font-size: 16px;
    font-weight: bold;
`;

const EditorArea = styled.div`
    grid-area: Editor;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    height: fit-content;
    display: flex;
    padding: 5px;
`;

const TitleInput = styled.input`
    grid-area: TitleInput;
    height: 30px;
    margin: auto 0px auto 0px;
    box-sizing: border-box;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    padding-left: 5px;
    font-family: inherit;
`;

const TagAreaWrapper = styled.div`
    grid-area: Tag;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 5px;
    max-height: 100%;
`;

const DateWrapper = styled.div`
    grid-area: DateInput;
    margin: auto 0px auto 0px;
`;

const DeleteButton = styled.button`
    grid-area: Delete;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.negativeColor};
    color: white;
    text-align: center;
    vertical-align: middle;
    padding: 5px;
    font-family: inherit;
    font-weight: bolder;
    font-size: 20px;
    width: 120px;
    margin-left: auto;
    height: 50px;
    cursor: pointer;
`;

class TaskPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { task: Object.assign({}, props.task) };
        this.TitleInput = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.task._id !== prevProps.task._id) {
            this.setState({
                task: Object.assign({}, this.props.task)
            });
            this.TitleInput.focus();
        }
    }
    //#region Methods

    changeDateCallback = dueDate => {
        this.updateTaskState(dueDate, 'dueDate', true);
    };

    updateTaskState = async (value, property, immediate = false) => {
        let { task } = this.state;
        task[property] = value;
        this.setState({ task });
        this.props.updateTask(task, immediate);
    };

    onTaskRemove = () => {
        this.props.removeTask(this.props.task);
    };
    //#endregion

    render() {
        let { task } = this.state;
        return (
            <TaskGrid>
                <DetailGrid>
                    <InfoGrid>
                        <DetailLabel
                            gridArea="TitleLabel"
                            htmlFor="title"
                            id="titleLabel"
                        >
                            Title:
                        </DetailLabel>
                        <TitleInput
                            innerRef={comp => (this.TitleInput = comp)}
                            onChange={e => {
                                this.updateTaskState(e.target.value, 'title');
                            }}
                            value={task.title ? task.title : ''}
                            name="Tasktitle"
                            id="title"
                            placeholder="Task Title"
                            aria-describedby="titleLabel"
                        />
                        <DetailLabel
                            gridArea="DateLabel"
                            htmlFor="duedate"
                            id="dateLabel"
                        >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                        </DetailLabel>
                        <DateWrapper>
                            <DateInput
                                selectedDate={
                                    task.dueDate
                                        ? new Date(task.dueDate)
                                        : undefined
                                }
                                callback={this.changeDateCallback}
                                id="duedate"
                                aria-describedby="dateLabel"
                            />
                        </DateWrapper>
                    </InfoGrid>
                    <TagAreaWrapper>
                        <TagArea taskId={task._id} />
                    </TagAreaWrapper>
                </DetailGrid>
                <EditorArea>
                    <Editor initialValue={task.text} taskId={task._id} />
                </EditorArea>
                <DeleteButton onClick={this.onTaskRemove}>Delete</DeleteButton>
            </TaskGrid>
        );
    }
}

TaskPanel.propTypes = {
    taskId: PropTypes.string.isRequired,
    task: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired
};

const mapStateToProps = ({ tasks }, ownProps) => {
    let task = tasks.taskList.find(task => task._id === ownProps.taskId);

    return { task };
};
const mapDispatchToProps = {
    updateTask,
    removeTask
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskPanel);
