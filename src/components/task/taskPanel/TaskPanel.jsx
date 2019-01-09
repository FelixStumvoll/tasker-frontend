import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debounce from 'debounce';
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
    grid-template-rows: auto 1fr 50px;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.defaultFont};
    padding: 10px;
    box-sizing: border-box;

    /* @media screen and (max-width: 900px){
        grid-template-rows: 
    } */
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
    border-radius: 10px;
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
    border-radius: 10px;
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
    border-radius: 10px;
    padding-left: 5px;
    font-family: inherit;
`;

const TagAreaWrapper = styled.div`
    grid-area: Tag;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
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
    border-radius: 10px;
    background-color: ${({ theme }) => theme.negativeColor};
    color: white;
    text-align: center;
    vertical-align: middle;
    padding: 5px;
    font-family: inherit;
    font-weight: bolder;
    font-size: 20px;
    width: 25%;
    margin-left: 75%;
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

    saveTask = () => {
        let { task } = this.state;
        this.props.updateTask(task);
    };

    debouncedSave = debounce(() => {
        this.saveTask();
    }, 100);

    changeDateCallback = dueDate => {
        this.updateTaskState(dueDate, 'dueDate');
    };

    changeTextCallback = text => {
        this.updateTaskState(text, 'text');
    };

    updateTaskState = async (value, property) => {
        let { task } = this.state;
        task[property] = value;
        this.setState({ task });
        await this.debouncedSave();
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
                        <DetailLabel gridArea="TitleLabel" htmlFor="title">
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
                        />
                        <DetailLabel gridArea="DateLabel" htmlFor="duedate">
                            <FontAwesomeIcon icon={faCalendarAlt} /> :
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
                            />
                        </DateWrapper>
                    </InfoGrid>
                    <TagAreaWrapper>
                        <TagArea taskId={task._id} tags={task.tags} />
                    </TagAreaWrapper>
                </DetailGrid>
                <EditorArea>
                    <Editor
                        initialValue={task.text}
                        onChange={this.changeTextCallback}
                    />
                </EditorArea>
                <DeleteButton>Delete</DeleteButton>
            </TaskGrid>
        );
    }
}

TaskPanel.propTypes = {
    taskId: PropTypes.string.isRequired
};

const mapStateToProps = ({ tasks }, ownprops) => {
    let task = tasks.find(task => task._id === ownprops.taskId);

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
