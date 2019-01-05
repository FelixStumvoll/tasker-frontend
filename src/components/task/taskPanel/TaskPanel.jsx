import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debounce from 'debounce';

import DateInput from '../../dateInput/DateInput';

import { updateTask } from '../taskActions';
import Editor from '../../editor/Editor';
import TagArea from '../taskTag/tagArea/TagArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const MainGrid = styled.article`
    display: grid;
    grid-template-areas:
        'DetailArea'
        'EditorArea';
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.defaultFont};
`;

const DetailGrid = styled.div`
    grid-area: DetailArea;
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
    grid-area: EditorArea;
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 10px;
    padding: 5px;
    overflow: auto;
    display: flex;
    height: fit-content;
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

class TaskPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { task: Object.assign({}, props.task) };
    }

    componentDidUpdate(prevProps) {
        if (this.props.task.id !== prevProps.task.id) {
            this.setState({
                task: Object.assign({}, this.props.task)
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
    }, 250);

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
    //#endregion

    render() {
        let { task } = this.state;
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
                            placeholder="Task Title"
                        />
                        <DetailLabel gridArea="DateLabel" for="duedate">
                            <FontAwesomeIcon icon={faCalendarAlt} /> :
                        </DetailLabel>
                        <DateWrapper>
                            <DateInput
                                selectedDate={task.dueDate}
                                callback={this.changeDateCallback}
                                id="duedate"
                            />
                        </DateWrapper>
                    </InfoGrid>
                    <TagAreaWrapper>
                        <TagArea taskId={task.id} />
                    </TagAreaWrapper>
                </DetailGrid>
                <EditorArea>
                    <Editor
                        initialValue={task.text}
                        onChange={this.changeTextCallback}
                    />
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
