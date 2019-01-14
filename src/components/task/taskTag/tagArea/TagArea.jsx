import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { updateTaskTags } from '../../../../redux/reducers/taskReducer/taskActions';
import TaskTag from '../TaskTag';

const TagAreaGrid = styled.div`
    display: grid;
    grid-template-areas: 'TagInput' 'Tags';
    grid-template-rows: 30px auto;
    grid-row-gap: 5px;
    width: 100%;
    height: 100%;
`;

const TagLabel = styled.label`
    display: none;
`;

const TagInput = styled.input`
    grid-area: TagInput;
    height: 30px;
    border: none;
    padding: 0px 0px 0px 5px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    font-family: ${({ theme }) => theme.defaultFont};
`;

const Tags = styled.div`
    display: flex;
    overflow: auto;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
`;

const TagWrapper = styled.div`
    margin: 2.5px;
    height: 30px;
`;

class TagArea extends Component {
    constructor(props) {
        super(props);
        this.state = { tags: this.props.tags, tagValue: '' };
    }

    componentDidUpdate(prevProps) {
        if (this.props.tags !== prevProps.tags) {
            this.setState({
                tags: this.props.tags,
                tagValue: ''
            });
        }
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
        let { tagValue, tags } = this.state;
        if (!this.taskTagExists(tagValue) && /\S/.test(tagValue)) {
            tags.unshift(tagValue);
            this.setState({ tags, tagValue: '' });
            this.props.updateTaskTags(this.props.taskId, tags);
        }
    };

    taskTagExists = tagName => {
        return this.state.tags.includes(tagName);
    };

    removeTag = tagName => {
        let { tags } = this.state;
        tags.splice(tags.indexOf(tagName), 1);
        this.setState({ tags });
        this.props.updateTaskTags(this.props.taskId, tags);
    };

    render() {
        let { tags, tagValue } = this.state;

        return (
            <TagAreaGrid>
                <TagLabel htmlFor="TagInput">Tag Input</TagLabel>
                <TagInput
                    onKeyDown={this.onTagKeypress}
                    onChange={this.onTagInput}
                    placeholder="Enter Tags (Confirm with Enter)"
                    value={tagValue}
                    id="TagInput"
                    maxLength="30"
                />
                <Tags>
                    {tags.map((tagText, index) => {
                        return (
                            <TagWrapper key={index}>
                                <TaskTag
                                    callback={() => this.removeTag(tagText)}
                                    value={tagText}
                                />
                            </TagWrapper>
                        );
                    })}
                </Tags>
            </TagAreaGrid>
        );
    }
}

TagArea.propTypes = {
    taskId: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    updateTaskTags: PropTypes.func.isRequired
};

const mapStateToProps = ({ tasks }, ownProps) => {
    let { tags } = tasks.taskList.find(task => task._id === ownProps.taskId);

    return { tags };
};

TagArea.propTypes = {
    taskId: PropTypes.string.isRequired
};

const mapDispatchToProps = {
    updateTaskTags
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagArea);
