import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debounce from 'debounce';

import DateInput from '../../dateInput/DateInput';
import TaskTag from '../taskTag/TaskTag';
import { updateTask } from '../taskActions';
import Editor from '../../editor/Editor';

const MainGrid = styled.article`
    display: grid;
    grid-template-areas:
        'DetailArea'
        'EditorArea';
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
    width: 100%;
    height: 100%;
`;

const DetailGrid = styled.div`
    grid-area: DetailArea;
    display: grid;
    grid-template-areas:
        'Info Tag'
        'Info Tag'
        '.    Tag';
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-template-rows: 50px 50px 50px;
`;

const InfoGrid = styled.div`
    grid-area: Info;
    display: grid;
    grid-template-areas:
        'TitleLabel TitleInput'
        'DateLabel DateInput';
    grid-template-columns: 100px 1fr;
    grid-auto-rows: 1fr 1fr;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
    padding: 5px;
`;

const TagGrid = styled.div`
    grid-area: Tag;
    display: grid;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
    padding: 5px;
    grid-template-areas: 'TagInput' 'TagArea';
    grid-template-rows: 30px 1fr;
    grid-row-gap: 10px;
`;

const DetailLabel = styled.label`
    grid-area: ${props => props.gridArea};
    margin: auto auto auto 0px;
    font-size: 20px;
    font-weight: bold;
`;

const EditorArea = styled.div`
    grid-area: EditorArea;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
    padding: 5px;
    overflow: auto;
    display: flex;
`;

const TitleInput = styled.input`
    grid-area: TitleInput;
    height: 30px;
    font-size: 20px;
    width: 100%;
    box-sizing: border-box;
    margin: auto;
`;

const TagInput = styled.input`
    grid-area: TagInput;
    height: 30px;
    border: none;
    padding-left: 5px;
    width: 100%;
    box-sizing: border-box;
`;

const TagArea = styled.div`
    grid-area: TagArea;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
`;

const DateWrapper = styled.div`
    grid-area: DateInput;
`;

const TagWrapper = styled.div`
    margin: 2.5px;
`;

class TaskPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { task: Object.assign({}, props.task), tagValue: '' };
    }

    componentDidUpdate(prevProps) {
        if (this.props.task.id !== prevProps.task.id) {
            this.setState({
                task: Object.assign({}, this.props.task),
                tagValue: ''
            });
        }
    }
    //#region Methods

    saveTask = () => {
        let { task } = this.state;
        this.props.updateTask(task);
    };

    debouncedSave = debounce(() => {
        this.saveTask();
    }, 500);

    changeDateCallback = dueDate => {
        this.updateTaskState(dueDate, 'dueDate');
    };

    onTagInput = e => {
        this.setState({ tagValue: e.target.value });
    };

    onTagKeypress = e => {
        if (e.key === 'Enter') {
            this.addTaskTag();
        }
    };

    addTaskTag = () => {
        let { tagValue, task } = this.state;
        if (!this.taskTagExists(tagValue) && /\S/.test(tagValue)) {
            task.tags.push(tagValue);
            this.setState({ task, tagValue: '' });
            this.debouncedSave();
        }
    };

    taskTagExists = tagName => {
        return this.state.task.tags.includes(tagName);
    };

    removeTag = tagName => {
        let {
            task: { tags }
        } = this.state;
        tags.splice(tags.indexOf(tagName), 1);
        this.updateTaskState(tags, 'tags');
    };

    updateTaskState = (value, property) => {
        let { task } = this.state;
        task[property] = value;
        this.setState({ task });
        this.debouncedSave();
    };
    //#endregion

    render() {
        let { tagValue, task } = this.state;

        return (
            <MainGrid>
                <DetailGrid>
                    <InfoGrid>
                        <DetailLabel gridArea="TitleLabel" for="title">
                            Title:
                        </DetailLabel>
                        <TitleInput
                            onChange={e => {
                                this.updateTaskState(e.target.value, 'title');
                            }}
                            value={task.title}
                            name="Tasktitle"
                            id="title"
                        />
                        <DetailLabel gridArea="DateLabel" for="duedate">
                            Duedate:
                        </DetailLabel>
                        <DateWrapper>
                            <DateInput callback={this.changeDateCallback} />
                        </DateWrapper>
                    </InfoGrid>
                    <TagGrid>
                        <TagInput
                            onKeyDown={this.onTagKeypress}
                            onChange={this.onTagInput}
                            placeholder="Enter Tags"
                            value={tagValue}
                            maxLength="30"
                        />
                        <TagArea>
                            {task.tags.map((tagText, index) => {
                                return (
                                    <TagWrapper key={index}>
                                        <TaskTag
                                            callback={() =>
                                                this.removeTag(tagText)
                                            }
                                            value={tagText}
                                        />
                                    </TagWrapper>
                                );
                            })}
                        </TagArea>
                    </TagGrid>
                </DetailGrid>
                <EditorArea>
                    <Editor />
                </EditorArea>
            </MainGrid>
        );
    }
}

TaskPanel.propTypes = {
    taskId: PropTypes.string.isRequired
};

const mapStateToProps = ({ tasks }, ownprops) => {
    let task = tasks.find(x => x.id === ownprops.taskId);

    return { task };
};
const mapDispatchToProps = {
    updateTask
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskPanel);
