import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TaskTag from '../taskTag/TaskTag';
import DateInput from '../../dateInput/DateInput';

const NewTaskPanel = styled.div`
    width: 500px;
    border: 2px solid black;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
`;

const TitleInput = styled.input`
    height: 30px;
    line-height: 25px;
    border-radius: 5px;
    border: none;
    outline: none;
    padding-left: 5px;
`;

const TagInput = styled.input`
    height: 30px;
    border: none;
    outline: none;
    padding-left: 5px;
`;

const TagArea = styled.div`
    display: flex;
    height: 50px;
    flex-wrap: wrap;
`;

const ActionBar = styled.div`
    height: 30px;
    display: grid;
    grid-template-areas: '. cancel save';
    grid-template-columns: 1fr 75px 75px;
    grid-column-gap: 20px;
`;

const ActionButton = styled.button`
    border-radius: 5px;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    transition: 250ms;
`;

//prettier-ignore
const SaveButton = styled(ActionButton)`
    grid-area: save;
    border: 2px solid ${({ theme }) => theme.positiveColor};
    color: ${({ theme }) => theme.positiveColor};

    :active {
        background-color: ${({ theme }) =>theme.positiveColor};
        color: white;
    }
`;

//prettier-ignore
const CancelButton = styled(ActionButton)`
    grid-area: cancel;
    border: 2px solid ${({ theme }) => theme.negativeColor};
    color: ${({ theme }) => theme.negativeColor};

    :active {
        background-color: ${({ theme }) =>theme.negativeColor};
        color: white;
    }
`;

const TagWrapper = styled.div`
    margin: 2.5px;
`;

export class TaskCreatePanel extends Component {
    constructor(props) {
        super(props);

        this.state = { task: { tags: [] }, tagValue: '' };
    }

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
        this.updateTask(tags, 'tags');
    };

    changeDateCallback = dueDate => {
        console.log('dueDate :', dueDate);
        this.updateTask(dueDate, 'dueDate');
    };

    updateTask = (value, property) => {
        let { task } = this.state;
        task[property] = value;
        this.setState({ task });
    };

    render() {
        let { tagValue, task } = this.state;

        return (
            <NewTaskPanel>
                <TitleInput placeholder="Enter Task Title" />
                <DateInput callback={this.changeDateCallback} />
                <TagInput
                    onKeyDown={this.onTagKeypress}
                    onChange={this.onTagInput}
                    placeholder="Enter Tags"
                    value={tagValue}
                    maxLength="30"
                />

                {task.tags.length !== 0 && (
                    <TagArea>
                        {task.tags.map((tagText, index) => {
                            return (
                                <TagWrapper key={index}>
                                    <TaskTag
                                        callback={() => this.removeTag(tagText)}
                                        value={tagText}
                                    />
                                </TagWrapper>
                            );
                        })}
                    </TagArea>
                )}

                <ActionBar>
                    <CancelButton>Cancel</CancelButton>
                    <SaveButton>Save</SaveButton>
                </ActionBar>
            </NewTaskPanel>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskCreatePanel);
